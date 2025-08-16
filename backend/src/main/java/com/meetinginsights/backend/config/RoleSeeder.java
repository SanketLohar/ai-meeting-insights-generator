package com.meetinginsights.backend.config;

import com.meetinginsights.backend.entity.Role;
import com.meetinginsights.backend.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder {

    private final RoleRepository roleRepository;
    public RoleSeeder(RoleRepository roleRepository) { this.roleRepository = roleRepository; }

    @PostConstruct
    public void seed() {
        if (!roleRepository.existsByName("ROLE_USER")) {
            Role r = new Role();
            r.setName("ROLE_USER");
            roleRepository.save(r);
        }
        if (!roleRepository.existsByName("ROLE_ADMIN")) {
            Role r = new Role();
            r.setName("ROLE_ADMIN");
            roleRepository.save(r);
        }
        System.out.println("✅ Default roles ensured.");
    }
}
