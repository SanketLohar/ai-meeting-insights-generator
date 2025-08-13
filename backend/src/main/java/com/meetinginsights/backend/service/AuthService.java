package com.meetinginsights.backend.service;

import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.entity.User;
import com.meetinginsights.backend.repository.RoleRepository;
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; // make sure you’ve defined a bean in SecurityConfig
    private final JwtUtil jwtUtil;

    public Map<String, Object> register(String username, String email, String rawPassword) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalStateException("ROLE_USER not seeded"));
        user.getRoles().add(userRole);

        userRepository.save(user);

        List<String> roleNames = user.getRoles().stream().map(Role::getName).toList();
        String token = jwtUtil.generateToken(user.getUsername(), roleNames);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("token", token);
        resp.put("username", user.getUsername());
        resp.put("email", user.getEmail());
        resp.put("roles", roleNames);
        return resp;
    }

    public Map<String, Object> login(String usernameOrEmail, String rawPassword) {
        User user = userRepository.findByUsername(usernameOrEmail)
                .orElseGet(() -> userRepository.findByEmail(usernameOrEmail)
                        .orElseThrow(() -> new IllegalArgumentException("Bad credentials")));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException("Bad credentials");
        }

        List<String> roleNames = user.getRoles().stream().map(Role::getName).toList();
        String token = jwtUtil.generateToken(user.getUsername(), roleNames);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("token", token);
        resp.put("username", user.getUsername());
        resp.put("email", user.getEmail());
        resp.put("roles", roleNames);
        return resp;
    }
}
