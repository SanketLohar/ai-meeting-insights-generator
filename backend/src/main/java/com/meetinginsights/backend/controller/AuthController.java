package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.dto.LoginRequest;
import com.meetinginsights.backend.dto.AuthResponse;
import com.meetinginsights.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) {
        var resp = authService.register(req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        var resp = authService.login(req);
        return ResponseEntity.ok(resp);
    }
}
