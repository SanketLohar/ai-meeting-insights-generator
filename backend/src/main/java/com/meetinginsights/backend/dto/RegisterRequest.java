package com.meetinginsights.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "First name is required") // Added
    private String firstName;                  // Added

    @NotBlank(message = "Last name is required")  // Added
    private String lastName;                   // Added

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters and Setters
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() { return firstName; } // Added getter
    public void setFirstName(String firstName) { this.firstName = firstName; } // Added setter

    public String getLastName() { return lastName; } // Added getter
    public void setLastName(String lastName) { this.lastName = lastName; } // Added setter

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
