package com.meetinginsights.backend.service;

import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.entity.User; // ✅ Correct
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.security.JwtUtil;
import com.meetinginsights.backend.exception.EmailAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRoles("USER");

        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail(), List.of("USER"), false);
    }
}
