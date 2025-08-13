package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.getOrDefault("username", "").trim();
        String email = body.getOrDefault("email", "").trim();
        String password = body.getOrDefault("password", "").trim();

        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "username, email, and password are required"));
        }

        return ResponseEntity.ok(authService.register(username, email, password));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String usernameOrEmail = body.getOrDefault("usernameOrEmail", "").trim();
        String password = body.getOrDefault("password", "").trim();

        if (usernameOrEmail.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "usernameOrEmail and password are required"));
        }

        return ResponseEntity.ok(authService.login(usernameOrEmail, password));
    }
}
