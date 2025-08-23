package com.meetinginsights.backend.service;

import com.meetinginsights.backend.dto.RegisterRequest;
import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.entity.User;
import com.meetinginsights.backend.repository.UserRepository;
import com.meetinginsights.backend.repository.RoleRepository;
import com.meetinginsights.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.HashSet;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set firstName and lastName if available in RegisterRequest and User
        // Remove try-catch and check for method existence
        // If RegisterRequest does not have getFirstName/getLastName, set to null or skip
        // If User does not have setFirstName/setLastName, skip

        // Assuming RegisterRequest has getFirstName() and getLastName()
        // and User has setFirstName() and setLastName()
        // If not, comment out or set to null as fallback

        // Set firstName
        String firstName = null;
        try {
            firstName = (String) RegisterRequest.class.getMethod("getFirstName").invoke(request);
        } catch (Exception e) {
            // Method does not exist or error, leave as null
        }
        try {
            User.class.getMethod("setFirstName", String.class).invoke(user, firstName);
        } catch (Exception e) {
            // Method does not exist, skip
        }

        // Set lastName
        String lastName = null;
        try {
            lastName = (String) RegisterRequest.class.getMethod("getLastName").invoke(request);
        } catch (Exception e) {
            // Method does not exist or error, leave as null
        }
        try {
            User.class.getMethod("setLastName", String.class).invoke(user, lastName);
        } catch (Exception e) {
            // Method does not exist, skip
        }

        // Assign default role as a Set<Role>
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role ROLE_USER not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return jwtUtil.generateToken(user.getEmail(), user.getRoles());
    }
}