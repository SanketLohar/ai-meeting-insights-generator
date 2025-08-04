package com.meetinginsights.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    // Getters and Setters
    // ...
}
