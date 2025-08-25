package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.dto.AuthResponse;
import com.meetinginsights.backend.dto.LoginRequest;
import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.service.AuthService;
import com.meetinginsights.backend.service.GeminiService; // Import GeminiService
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Import HttpStatus
import org.springframework.http.ResponseEntity; // Import ResponseEntity
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Import MultipartFile

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from any origin for development
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private GeminiService geminiService; // Autowire GeminiService

    /**
     * Handles user registration requests.
     *
     * @param request The RegisterRequest DTO containing user registration details.
     * @return An AuthResponse containing a JWT token upon successful registration.
     */
    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        String token = authService.register(request);
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        return response;
    }

    /**
     * Handles user login requests.
     *
     * @param request The LoginRequest DTO containing user login credentials.
     * @return An AuthResponse containing a JWT token upon successful login.
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        return response;
    }

    /**
     * Handles the upload of a meeting audio file and generates insights using Gemini.
     *
     * @param audioFile The MultipartFile containing the meeting audio.
     * @return A ResponseEntity with the generated insights or an error message.
     */
    @PostMapping("/generate-insights") // New endpoint for audio processing
    public ResponseEntity<String> generateMeetingInsights(@RequestParam("audioFile") MultipartFile audioFile) {
        try {
            String insights = geminiService.processMeetingAudio(audioFile);
            return ResponseEntity.ok(insights);
        } catch (IllegalArgumentException e) {
            // Handle cases where the audio file is empty
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException | InterruptedException e) {
            // Handle IO or Interruption exceptions during audio processing
            System.err.println("Error processing audio for insights: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process audio: " + e.getMessage());
        } catch (Exception e) {
            // Catch any other unexpected exceptions
            System.err.println("An unexpected error occurred during insight generation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
