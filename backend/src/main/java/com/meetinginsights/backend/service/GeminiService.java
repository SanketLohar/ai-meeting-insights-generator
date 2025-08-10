package com.backend.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // 🔹 Step 1: Convert audio file to text using Gemini Speech-to-Text
    public String transcribeAudio(MultipartFile audioFile) throws IOException, InterruptedException {
        byte[] audioBytes = audioFile.getBytes();
        String base64Audio = Base64.getEncoder().encodeToString(audioBytes);

        String transcriptionPayload = """
        {
            "config": {
                "encoding": "LINEAR16",
                "languageCode": "en-US"
            },
            "audio": {
                "content": "%s"
            }
        }
        """.formatted(base64Audio);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://speech.googleapis.com/v1/speech:recognize?key=" + geminiApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(transcriptionPayload))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        JsonNode root = objectMapper.readTree(response.body());

        return root.path("results").get(0).path("alternatives").get(0).path("transcript").asText("");
    }

    // 🔹 Step 2: Generate Insights from Transcription
    public String generateInsights(String transcript) throws IOException, InterruptedException {
        String advancedPrompt = """
        You are an AI meeting assistant.
        Your job:
        1. Summarize the meeting in 5 concise bullet points.
        2. Extract all action items with responsible persons and deadlines (if mentioned).
        3. Identify decisions taken.
        4. Highlight key discussion points.
        5. Suggest possible follow-up actions.

        Meeting Transcript:
        %s
        """.formatted(transcript);

        String payload = """
        {
            "contents": [{
                "role": "user",
                "parts": [{"text": "%s"}]
            }]
        }
        """.formatted(advancedPrompt.replace("\"", "\\\""));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + geminiApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        JsonNode root = objectMapper.readTree(response.body());
        return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText("");
    }

    // 🔹 Step 3: Full Process (Audio → Text → Insights)
    public String processMeetingAudio(MultipartFile file) throws IOException, InterruptedException {
        String transcript = transcribeAudio(file);
        if (transcript.isEmpty()) {
            return "Transcription failed. Please check the audio quality.";
        }
        return generateInsights(transcript);
    }
}
