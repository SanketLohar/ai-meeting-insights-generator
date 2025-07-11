package com.meetinginsights.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // Table name in MySQL
@Data // From Lombok: includes getters/setters/toString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment ID
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // Stored as BCrypt hash

    @Enumerated(EnumType.STRING)
    private Role role; // USER / ADMIN
}
