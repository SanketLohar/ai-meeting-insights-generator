package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/analyze")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> analyzeAudio(@RequestParam("file") MultipartFile file) {
        try {
            String insights = geminiService.extractInsightsFromAudio(file);
            return ResponseEntity.ok(insights);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error generating insights: " + e.getMessage());
        }
    }

}
