package com.meetinginsights.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/dashboard")
    public String adminDashboard() {
        return "Welcome to Admin Dashboard!";
    }
}

@RestController
@RequestMapping("/user")
class UserController {
    @GetMapping("/profile")
    public String userProfile() {
        return "Welcome to User Profile!";
    }
}
