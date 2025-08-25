package com.meetinginsights.backend.dto;

public class AuthResponse {
    private String token;
    private String type = "Bearer"; // Default type for JWT tokens

    public AuthResponse() {
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
