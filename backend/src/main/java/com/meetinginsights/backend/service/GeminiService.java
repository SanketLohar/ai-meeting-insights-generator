package com.meetinginsights.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    public String generateResponse(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> message = new HashMap<>();
        message.put("parts", List.of(Map.of("text", prompt)));
        message.put("role", "user");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(message));

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        String url = GEMINI_API_URL + "?key=" + geminiApiKey;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestEntity, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                Map body = response.getBody();
                if (body != null && body.containsKey("candidates")) {
                    List candidates = (List) body.get("candidates");
                    if (!candidates.isEmpty()) {
                        Map firstCandidate = (Map) candidates.get(0);
                        Map content = (Map) firstCandidate.get("content");
                        List parts = (List) content.get("parts");
                        if (!parts.isEmpty()) {
                            Map part = (Map) parts.get(0);
                            return part.get("text").toString();
                        }
                    }
                }
                return "Empty or malformed response from Gemini API.";
            } else {
                return "Request failed with status: " + response.getStatusCode();
            }

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
