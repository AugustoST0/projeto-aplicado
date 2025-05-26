package com.example.pa.resources;

import com.example.pa.infra.security.TokenService;
import com.example.pa.model.user.AuthenticationDTO;
import com.example.pa.model.user.LoginResponseDTO;
import com.example.pa.model.user.RegisterDTO;
import com.example.pa.model.user.User;
import com.example.pa.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        var usernamePassword = new UsernamePasswordAuthenticationToken(obj.email(), obj.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok().body(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO obj) {
        if (repository.findByEmail(obj.email()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(obj.password());
        User newUser = new User(obj.name(), obj.email(), encryptedPassword, obj.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
