package com.meetinginsights.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component; // Import @Component
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // This annotation is crucial for Spring to manage it as a bean
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService; // Assuming you have a JwtService to handle JWT operations

    @Autowired
    private UserDetailsService userDetailsService; // This will now correctly resolve to UserDetailsServiceImpl

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null; // In our case, this is the email
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extract token after "Bearer "
            username = jwtService.extractUsername(jwt); // Extract username (email) from token
        }

        // If username is extracted and no authentication is currently set in the context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username); // Load user details

            // Validate the token against the loaded user details
            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken); // Set authentication in context
            }
        }
        filterChain.doFilter(request, response); // Continue the filter chain
    }
}
