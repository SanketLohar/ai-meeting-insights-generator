package com.meetinginsights.backend.controller;

import com.meetinginsights.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin("*")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody Map<String, String> requestBody) {
        String prompt = requestBody.get("prompt");
        String response = geminiService.generateResponse(prompt);
        return ResponseEntity.ok(response);
    }
}
