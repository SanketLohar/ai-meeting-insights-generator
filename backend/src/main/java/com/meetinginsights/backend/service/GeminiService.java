package com.meetinginsights.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    private static final String GEMINI_MODEL = "gemini-2.5-pro"; // Using a stable model

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient(); // Reuse HttpClient

    /**
     * Processes an audio file to generate meeting insights directly using Gemini's multimodal capabilities.
     * This method combines transcription and insight generation in one API call to Gemini.
     *
     * @param audioFile The MultipartFile containing the meeting audio.
     * @return A String containing the generated meeting insights.
     * @throws IOException If there's an error reading the audio file or processing JSON.
     * @throws InterruptedException If the HTTP request is interrupted.
     */
    public String processMeetingAudio(MultipartFile audioFile) throws IOException, InterruptedException {
        if (audioFile.isEmpty()) {
            throw new IllegalArgumentException("Audio file cannot be empty.");
        }

        byte[] audioBytes = audioFile.getBytes();
        String base64Audio = Base64.getEncoder().encodeToString(audioBytes);
        String mimeType = audioFile.getContentType();

        if (mimeType == null || !mimeType.startsWith("audio/")) {
            mimeType = "audio/mpeg";
            System.err.println("Warning: Audio file MIME type is unknown or not audio. Defaulting to " + mimeType);
        }

        String insightsPrompt = """
        You are an AI meeting assistant.
        Your job is to analyze the provided audio and extract meeting insights.
        If no discernible speech is found, state that no speech was detected.
        
        Tasks:
        1. Summarize the meeting in 5 concise bullet points.
        2. Extract all action items with responsible persons and deadlines (if mentioned).
        3. Identify decisions taken.
        4. Highlight key discussion points.
        5. Suggest possible follow-up actions.
        
        Analyze the provided audio.
        """;

        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode contentsArray = objectMapper.createArrayNode();
        ObjectNode userContent = objectMapper.createObjectNode();
        userContent.put("role", "user");
        ArrayNode partsArray = objectMapper.createArrayNode();

        ObjectNode textPart = objectMapper.createObjectNode();
        textPart.put("text", insightsPrompt);
        partsArray.add(textPart);

        ObjectNode audioInlineData = objectMapper.createObjectNode();
        audioInlineData.put("mimeType", mimeType);
        audioInlineData.put("data", base64Audio);

        ObjectNode audioPart = objectMapper.createObjectNode();
        audioPart.set("inlineData", audioInlineData);
        partsArray.add(audioPart);

        userContent.set("parts", partsArray);
        contentsArray.add(userContent);
        rootNode.set("contents", contentsArray);

        String payload = objectMapper.writeValueAsString(rootNode);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent?key=" + geminiApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();

        if (response.statusCode() != 200) {
            String errorMessage = "Gemini API call failed with status " + response.statusCode() + ": " + responseBody;
            System.err.println(errorMessage);
            try {
                JsonNode errorNode = objectMapper.readTree(responseBody);
                String apiError = errorNode.path("error").path("message").asText(errorMessage);
                throw new IOException("Failed to get insights from Gemini API: " + apiError);
            } catch (Exception e) {
                throw new IOException("Failed to get insights from Gemini API: " + errorMessage);
            }
        }

        JsonNode root = objectMapper.readTree(responseBody);

        JsonNode promptFeedback = root.path("promptFeedback");
        if (promptFeedback.isObject() && !promptFeedback.isEmpty()) {
            JsonNode safetyRatings = promptFeedback.path("safetyRatings");
            StringBuilder feedbackMessage = new StringBuilder("Gemini API returned prompt feedback:\n");
            if (safetyRatings.isArray()) {
                for (JsonNode rating : safetyRatings) {
                    feedbackMessage.append("  Category: ").append(rating.path("category").asText())
                            .append(", Probability: ").append(rating.path("probability").asText())
                            .append("\n");
                }
            } else {
                feedbackMessage.append("  ").append(promptFeedback.toString()).append("\n");
            }
            System.err.println(feedbackMessage.toString());
            return "Failed to generate insights: Content was blocked due to safety concerns or other prompt feedback.";
        }


        JsonNode candidates = root.path("candidates");

        if (candidates.isArray() && !candidates.isEmpty()) {
            JsonNode firstCandidate = candidates.get(0);
            if (firstCandidate != null) {
                JsonNode content = firstCandidate.path("content");
                if (content != null) {
                    JsonNode parts = content.path("parts");
                    if (parts.isArray() && !parts.isEmpty()) {
                        JsonNode firstPart = parts.get(0);
                        if (firstPart != null) {
                            JsonNode textNode = firstPart.path("text");
                            if (textNode != null && textNode.isTextual()) {
                                return textNode.asText("");
                            }
                        }
                    }
                }
            }
        }

        System.err.println("Gemini API response did not contain expected textual content in candidates: " + responseBody);
        return "Failed to generate insights: AI model did not produce textual content. This might be due to insufficient speech in the audio, or the model deciding no relevant insights could be extracted. Check logs for full response.";
    }
}
