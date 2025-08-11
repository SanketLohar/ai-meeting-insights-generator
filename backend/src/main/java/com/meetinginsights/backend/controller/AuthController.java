package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.AuthService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest request) {
        return authService.register(request.getUsername(), request.getPassword());
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        return authService.login(request.getUsername(), request.getPassword());
    }

    @Data
    public static class AuthRequest {
        private String username;
        private String password;
    }
}
