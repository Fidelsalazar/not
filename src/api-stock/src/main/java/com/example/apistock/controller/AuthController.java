package com.example.apistock.controller;

import com.example.apistock.models.dto.UsersDTO;
import com.example.apistock.models.entities.Users;
import com.example.apistock.services.auth.AuthService;
import com.example.apistock.services.auth.AuthServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("v1/api/auth")
public class AuthController {

  private final AuthService authService ;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(
    @RequestBody UsersDTO user
  ) {
    log.info(user.toString());
    boolean isRegistered = authService.registerUser(user);
    if (isRegistered) {
      log.info("ok");
      return ResponseEntity.ok(HttpStatus.OK);
    } else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en el registro");
    }
  }


  @PostMapping("/login")
  public ResponseEntity<?> loginUser(
    @RequestBody UsersDTO user
  ) {
    UsersDTO isLogged = authService.loginUser(user);
    if (isLogged != null) {
      log.info(isLogged.toString());
      return new ResponseEntity<>(isLogged, HttpStatus.OK);
    }else {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error en el registro");
    }
  }
}

