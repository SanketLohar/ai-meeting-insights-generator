package com.meetinginsights.backend.dto;

import java.util.Set;

public class AuthResponse {
    private String status;
    private String token;
    private String username;
    private String email;
    private Set<String> roles;

    public AuthResponse() {}

    public AuthResponse(String status, String token, String username, String email, Set<String> roles) {
        this.status = status;
        this.token = token;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    // getters / setters
    public String getStatus() { return status; }
    public void setStatus(String s) { this.status = s; }
    public String getToken() { return token; }
    public void setToken(String t) { this.token = t; }
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getEmail() { return email; }
    public void setEmail(String e) { this.email = e; }
    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> r) { this.roles = r; }
}
