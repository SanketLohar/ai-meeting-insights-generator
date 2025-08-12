package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "*")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/upload-audio")
    public ResponseEntity<?> uploadAudio(@RequestParam("file") MultipartFile file) {
        try {
            String insights = geminiService.processMeetingAudio(file);
            return ResponseEntity.ok().body(insights);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing audio: " + e.getMessage());
        }
    }
}
