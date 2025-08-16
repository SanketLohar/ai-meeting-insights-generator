package com.meetinginsights.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String userProfile() { return "Welcome to User Profile!"; }
}
