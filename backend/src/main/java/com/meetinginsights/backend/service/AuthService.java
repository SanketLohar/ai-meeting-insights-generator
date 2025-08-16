package com.meetinginsights.backend.service;

import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.dto.LoginRequest;
import com.meetinginsights.backend.dto.AuthResponse;
import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.entity.User;
import com.meetinginsights.backend.repository.RoleRepository;
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.security.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        User user = new User();
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRoles(Collections.singleton(userRole));
        userRepository.save(user);

        Set<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        String token = jwtUtil.generateToken(user.getEmail(), roleNames);

        return new AuthResponse("Registered", token, user.getUsername(), user.getEmail(), roleNames);
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        Set<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        String token = jwtUtil.generateToken(user.getEmail(), roleNames);
        return new AuthResponse("Authenticated", token, user.getUsername(), user.getEmail(), roleNames);
    }
}
