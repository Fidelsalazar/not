package com.example.apistock.models.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
@Builder
public class Users {
  @Id
  @Column(
    name = "id",
    updatable = false,
    nullable = false
  )
  private UUID id;

  @PrePersist
  public void generateId() {
    if (id == null) {
      id = UUID.randomUUID();
    }
  }

  @Column
  private String username;
  @Column
  private String name;
  @Column
  private String password;
  @Column
  private String role;
}
