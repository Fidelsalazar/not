package com.example.apistock.services.auth;

import com.example.apistock.models.dto.UsersDTO;
import com.example.apistock.models.entities.Users;
import com.example.apistock.repositories.AuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

  @Autowired
  private final AuthRepository authRepository;

  public AuthServiceImpl(AuthRepository authRepository) {
    this.authRepository = authRepository;
  }

  @Override
  public boolean registerUser(UsersDTO user) {
    if (authRepository.findByUsername(user.getUsername()).isPresent()) {
      return false;
    }

    Users x = Users.builder()
      .username(user.getUsername())
      .password(user.getPassword())
      .role(user.getRole())
      .build();

    authRepository.save(x);
    return true;
  }

  @Override
  public UsersDTO loginUser(UsersDTO user) {
    return authRepository.findByUsernameAndPassword(
      user.getUsername(),
      user.getPassword()
    ).map(userEntity -> {
      log.info(userEntity.toString());
      UsersDTO dto = new UsersDTO(userEntity);

      dto.setUsername(userEntity.getUsername());
      dto.setPassword(userEntity.getPassword());
      dto.setRole(userEntity.getRole());
      dto.setName(userEntity.getName());

      return dto;
    }).orElse(null);
  }
}
