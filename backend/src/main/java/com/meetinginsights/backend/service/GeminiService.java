package com.meetinginsights.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    public String extractInsightsFromAudio(MultipartFile file) throws Exception {
        // Convert file to Base64
        byte[] fileBytes = file.getBytes();
        String base64Audio = Base64.getEncoder().encodeToString(fileBytes);

        String prompt = """
        You are a highly intelligent meeting assistant. Below is the base64-encoded audio from a business meeting. 
        Assume it is a decoded speech-to-text transcript in natural conversation format. Do not attempt to decode base64.

        Please analyze the content and extract insights in the following format:

        1. 🔍 **Summary**: A concise overview of the meeting in 3-5 bullet points.
        2. ✅ **Decisions Made**: Clearly mention all finalized decisions.
        3. 📌 **Action Items**: List tasks assigned to specific people, with deadlines if mentioned.
        4. 🔄 **Discussion Points**: Capture key conversation points or conflicting ideas.
        5. 🚀 **Next Steps**: What should be done next based on this meeting?

        Here is the base64 audio (assume it’s a transcript):

        %s
        """.formatted(base64Audio.replace("\"", "\\\""));

        String jsonRequest = """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """.formatted(prompt.replace("\"", "\\\""));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(GEMINI_URL + "?key=" + geminiApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonRequest))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(response.body());
        JsonNode parts = root.path("candidates").get(0).path("content").path("parts").get(0);
        return parts.path("text").asText();
    }
}
