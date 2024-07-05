package com.example.apistock.models.dto;

import com.example.apistock.models.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsersDTO {

  private String username;
  private String password;
  private String name;
  private String role;

  public UsersDTO(Users userEntity) {
  }

  @Override
  public String toString() {
    return "UsersDTO{" +
      "username='" + username + '\'' +
      ", password='" + password + '\'' +
      ", role='" + role + '\'' +
      '}';
  }
}
