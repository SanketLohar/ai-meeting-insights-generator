package com.meetinginsights.backend.dto;

import java.util.List;

public class AuthResponse {
    private String token;
    private Long id;
    private String email;
    private String message;
    private List<String> roles;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String email, String message, List<String> roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.message = message;
        this.roles = roles;
    }

    // Getters & Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
