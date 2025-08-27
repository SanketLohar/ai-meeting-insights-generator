package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.dto.AuthResponse;
import com.meetinginsights.backend.dto.LoginRequest;
import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from any origin for development
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Handles user registration requests.
     *
     * @param request The RegisterRequest DTO containing user registration details.
     * @return An AuthResponse containing a JWT token and user details upon successful registration.
     */
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    /**
     * Handles user login requests.
     *
     * @param request The LoginRequest DTO containing user login credentials.
     * @return An AuthResponse containing a JWT token and user details upon successful login.
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
