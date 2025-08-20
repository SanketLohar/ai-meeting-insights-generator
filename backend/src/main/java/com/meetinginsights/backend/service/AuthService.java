package com.meetinginsights.backend.service;

import com.meetinginsights.backend.dto.AuthResponse;
import com.meetinginsights.backend.dto.LoginRequest;
import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.entity.User;
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Assign default role "USER"
        Role defaultRole = new Role();
        defaultRole.setName("USER");
        user.setRoles(List.of(defaultRole));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList()));

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(token, user.getId(), user.getEmail(),
                "User registered successfully", roleNames);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList()));

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return new AuthResponse(token, user.getId(), user.getEmail(),
                "Login successful", roleNames);
    }
}
