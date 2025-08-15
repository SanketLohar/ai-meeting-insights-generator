package com.meetinginsights.backend.service;

import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.entity.User;
import com.meetinginsights.backend.repository.RoleRepository;
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Registers the user with default ROLE_USER and returns a JWT containing roles.
     */
    public String register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        // encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // ensure default role
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found. Seed roles first."));
        user.setRoles(Set.of(userRole));

        userRepository.save(user);

        List<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        return jwtUtil.generateToken(user.getEmail(), roles);
    }

    /**
     * Authenticates and returns a JWT containing roles.
     */
    public String login(String email, String password) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        return jwtUtil.generateToken(email, roles);
    }

    public List<String> rolesFromToken(String token) {
        return jwtUtil.extractRoles(token);
    }

    public String usernameByEmail(String email) {
        return userRepository.findByEmail(email).map(User::getUsername).orElse(email);
    }
}
