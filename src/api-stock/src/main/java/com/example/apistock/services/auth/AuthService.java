package com.example.apistock.services.auth;

import com.example.apistock.models.dto.UsersDTO;

public interface AuthService {
  boolean registerUser (UsersDTO user);

  boolean loginUser(UsersDTO user);
}
