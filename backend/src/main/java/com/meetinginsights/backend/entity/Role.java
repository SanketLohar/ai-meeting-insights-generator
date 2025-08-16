package com.meetinginsights.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // store strings like "ROLE_USER", "ROLE_ADMIN"
    @Column(nullable = false, unique = true)
    private String name;

    // Getters & setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
