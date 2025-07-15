package com.meetinginsights.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // ✅ Maps to the DB table
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // Make sure Role.java exists in the same package
}
