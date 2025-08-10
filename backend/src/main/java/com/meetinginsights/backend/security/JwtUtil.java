package com.meetinginsights.backend.security;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String jwtSecret;
    private final long jwtExpirationMs;
    private final Key key;

    public JwtUtil() {
        Dotenv dotenv = Dotenv.load();
        this.jwtSecret = dotenv.get("JWT_SECRET_KEY");
        this.jwtExpirationMs = Long.parseLong(dotenv.get("JWT_EXPIRATION_MS", "3600000")); // default 1 hour
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
