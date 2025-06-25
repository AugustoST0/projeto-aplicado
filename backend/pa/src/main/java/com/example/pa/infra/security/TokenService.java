package com.example.pa.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.pa.model.user.User;
import com.example.pa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private UserRepository userRepository;

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secret);
    }

    public String generateAccessToken(User user) {
        try {
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getEmail())
                    .withClaim("role", user.getRole().name())
                    .withClaim("name", user.getName())
                    .withClaim("email", user.getEmail())
                    .withClaim("type", "access")
                    .withExpiresAt(Date.from(genAccessExpirationDate()))
                    .sign(getAlgorithm());
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar o access token", e);
        }
    }

    public String generateRefreshToken(User user) {
        try {
            return JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(user.getEmail())
                    .withClaim("type", "refresh")
                    .withExpiresAt(Date.from(genRefreshExpirationDate()))
                    .sign(getAlgorithm());
        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar o refresh token", e);
        }
    }

    public String validateToken(String token) {
        try {
            return JWT.require(getAlgorithm())
                    .withIssuer("auth-api")
                    .withClaim("type", "access")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

    public String refreshAccessToken(String refreshToken) {
        try {
            var verifier = JWT.require(getAlgorithm())
                    .withIssuer("auth-api")
                    .withClaim("type", "refresh")
                    .acceptExpiresAt(0)
                    .build();

            var decodedJWT = verifier.verify(refreshToken);
            String email = decodedJWT.getSubject();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado para o refresh"));

            return generateAccessToken(user);

        } catch (JWTVerificationException e) {
            throw new RuntimeException("Refresh token inválido ou expirado", e);
        }
    }

    private Instant genAccessExpirationDate() {
        return LocalDateTime.now().plusMinutes(30).toInstant(ZoneOffset.of("-03:00"));
    }

    private Instant genRefreshExpirationDate() {
        return LocalDateTime.now().plusDays(7).toInstant(ZoneOffset.of("-03:00"));
    }
}
