package com.example.pa.resources;

import com.example.pa.infra.security.TokenService;
import com.example.pa.model.user.*;
import com.example.pa.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationResource {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository repository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO obj) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(obj.email(), obj.password())
        );

        var user = (User) authentication.getPrincipal();

        String accessToken = tokenService.generateAccessToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);

        return ResponseEntity.ok().body(new LoginResponseDTO(accessToken, refreshToken));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO obj) {
        if (repository.findByEmail(obj.email()).isPresent()) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(obj.password());
        User newUser = new User(obj.name(), obj.email(), encryptedPassword, obj.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseDTO> refresh(@RequestHeader("Authorization") String authHeader) {
        String refreshToken = authHeader.replace("Bearer ", "");
        String newAccessToken = tokenService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok().body(new TokenResponseDTO(newAccessToken));
    }
}
