package com.meetinginsights.backend.security;

import com.meetinginsights.backend.entity.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    // ✅ For Spring Security-based token generation
    public String generateToken(UserDetails userDetails) {
        return generateToken(userDetails.getUsername(), extractRoles(userDetails), false);
    }

    // ✅ Custom version with roles and refresh token flag
    public String generateToken(String email, Set<Role> roles, boolean isRefreshToken) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles.stream().map(Enum::name).collect(Collectors.toList()));
        claims.put("type", isRefreshToken ? "refresh" : "access");

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (isRefreshToken ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60))) // 1hr or 7 days
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public List<String> extractRoles(String token) {
        Object roles = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().get("roles");

        if (roles instanceof List<?>) {
            return ((List<?>) roles).stream().map(String::valueOf).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    private Set<Role> extractRoles(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .map(auth -> Role.valueOf(auth.getAuthority()))
                .collect(Collectors.toSet());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}
