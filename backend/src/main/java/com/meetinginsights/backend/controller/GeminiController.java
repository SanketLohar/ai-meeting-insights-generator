package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:5173") // ⭐ CORRECTED: Specify the exact origin of your frontend ⭐
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    /**
     * Handles the upload of a meeting audio file and generates insights using Gemini.
     * This endpoint is secured and requires a valid JWT token.
     *
     * @param file The MultipartFile containing the meeting audio.
     * @return A ResponseEntity with the generated insights or an error message.
     */
    @PostMapping("/upload-audio")
    public ResponseEntity<String> uploadAudio(@RequestParam("file") MultipartFile file) {
        try {
            String insights = geminiService.processMeetingAudio(file);
            return ResponseEntity.ok().body(insights);
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
