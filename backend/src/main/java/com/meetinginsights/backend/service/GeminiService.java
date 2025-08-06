package com.meetinginsights.backend.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class GeminiService {

    private final WebClient webClient;
    private final String geminiApiKey;

    public GeminiService() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        this.geminiApiKey = dotenv.get("GEMINI_API_KEY");

        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent")
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String generateInsights(String transcript) {
        String prompt = "You are an AI meeting insights generator. Give actionable, structured insights from this meeting transcript:\n\n" + transcript;

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{Map.of("text", prompt)})
                }
        );

        try {
            Map<String, Object> response = webClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", geminiApiKey).build())
                    .body(Mono.just(requestBody), Map.class)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("candidates")) {
                var candidates = (java.util.List<?>) response.get("candidates");
                if (!candidates.isEmpty()) {
                    var firstCandidate = (Map<?, ?>) candidates.get(0);
                    var content = (Map<?, ?>) firstCandidate.get("content");
                    var parts = (java.util.List<?>) content.get("parts");
                    if (!parts.isEmpty()) {
                        var firstPart = (Map<?, ?>) parts.get(0);
                        return (String) firstPart.get("text");
                    }
                }
            }

            return "No insights could be generated from the response.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating insights: " + e.getMessage();
        }
    }
}
