package com.meetinginsights.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    /**
     * Retrieves the signing key from the secret key string using UTF-8 encoding.
     * This method is adopted from your previous JwtUtil class.
     *
     * @return The signing key.
     */
    private Key signingKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Generates a JWT token for the given username and roles.
     * It flexibly accepts a Set of Role objects or String role names, converting them to String names.
     *
     * @param username The principal (e.g., email) for the token.
     * @param roles    The set of roles associated with the user. Can be Set<String> or Set<Role>.
     * @return The generated JWT token string.
     */
    public String generateToken(String username, Set<?> roles) {
        Set<String> roleNames = roles.stream()
                .map(role -> {
                    if (role instanceof String) {
                        return (String) role;
                    } else {
                        try {
                            // Assumes Role objects have a getName() method, which your Role entity does.
                            return (String) role.getClass().getMethod("getName").invoke(role);
                        } catch (Exception e) {
                            throw new RuntimeException("Role must be String or have getName() method", e);
                        }
                    }
                })
                .collect(Collectors.toSet());

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roleNames); // Add roles as a custom claim in the token.

        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs); // Set token expiration based on configured value.

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username) // Set the principal (username/email) as the token subject.
                .setIssuedAt(now) // Set the token issuance time.
                .setExpiration(exp) // Set the token expiration time.
                .signWith(signingKey(), SignatureAlgorithm.HS256) // Sign the token using the secret key and HS256 algorithm.
                .compact(); // Build and serialize the JWT to a compact, URL-safe string.
    }

    /**
     * Parses and validates the JWT token's signature. This method is used internally.
     *
     * @param token The JWT token string.
     * @return The Jws object containing header, claims, and signature.
     */
    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey()) // Use the secret key for parsing.
                .build()
                .parseClaimsJws(token); // Parse the signed JWT.
    }

    /**
     * Extracts the username (subject) from the JWT token's claims.
     *
     * @param token The JWT token string.
     * @return The username (email) from the token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from the JWT token using a claims resolver function.
     *
     * @param token          The JWT token string.
     * @param claimsResolver The function to resolve the desired claim (e.g., Claims::getSubject, Claims::getExpiration).
     * @param <T>            The type of the claim.
     * @return The extracted claim.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims (payload) from the JWT token.
     *
     * @param token The JWT token string.
     * @return The Claims object containing all token claims.
     */
    private Claims extractAllClaims(String token) {
        return parseToken(token).getBody(); // Get the claims body after parsing.
    }

    /**
     * Extracts the roles from the JWT token's claims.
     * The roles are expected to be stored under the "roles" claim as a collection of strings.
     *
     * @param token The JWT token string.
     * @return A Set of role names (Strings). Returns an empty set if the "roles" claim is not found or is not a collection.
     */
    @SuppressWarnings("unchecked")
    public Set<String> extractRoles(String token) {
        Object r = parseToken(token).getBody().get("roles");
        if (r instanceof Collection<?>) {
            return ((Collection<?>) r).stream()
                    .map(Object::toString)
                    .collect(Collectors.toSet());
        }
        return Collections.emptySet();
    }

    /**
     * Checks if the JWT token is valid for the given UserDetails.
     * This includes validating the username and ensuring the token is not expired.
     *
     * @param token      The JWT token string.
     * @param userDetails The UserDetails object for comparison.
     * @return True if the token is valid, false otherwise.
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Checks if the JWT token has expired.
     *
     * @param token The JWT token string.
     * @return True if the token is expired, false otherwise.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the expiration date from the JWT token's claims.
     *
     * @param token The JWT token string.
     * @return The expiration date.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Checks if the JWT token is syntactically valid (can be parsed and its signature verified).
     * This method does *not* validate expiration or against a UserDetails object.
     *
     * @param token The JWT token string.
     * @return True if the token is valid, false otherwise.
     */
    public boolean isTokenSyntacticallyValid(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}