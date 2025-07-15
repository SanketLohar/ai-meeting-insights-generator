package com.meetinginsights.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.nio.charset.StandardCharsets;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "SanketMeetingInsightsSecretKey2025@Jwt!";
    // 🔐 Keep this safe
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // ✅ Generate JWT using subject (e.g., email)
    public String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)

                .compact();
    }

    // ✅ Extract username (email) from token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ Check if token is valid (not expired)
    public boolean isTokenValid(String token, String userEmail) {
        final String username = extractUsername(token);
        return (username.equals(userEmail) && !isTokenExpired(token));
    }

    // ======================
    // 🔽 PRIVATE HELPERS 🔽
    // ======================

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    private Key getSignKey() {
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }


}
