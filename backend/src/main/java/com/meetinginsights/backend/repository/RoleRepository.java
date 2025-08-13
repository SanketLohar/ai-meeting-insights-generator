package com.meetinginsights.backend.repository;

import com.meetinginsights.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(String name);

    Optional<Role> findByName(String name); // ✅ Added this so other classes compile
}
