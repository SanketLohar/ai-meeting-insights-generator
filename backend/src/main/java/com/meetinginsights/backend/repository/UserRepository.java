package com.meetinginsights.backend.repository;

import com.meetinginsights.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Needed for login
    boolean existsByEmail(String email);      // Check duplicate during register
}
