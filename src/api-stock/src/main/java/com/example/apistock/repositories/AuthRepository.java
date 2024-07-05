package com.example.apistock.repositories;

import com.example.apistock.models.entities.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthRepository extends JpaRepository<Users, UUID> {

  Optional<?> findByUsername(String username);
  Optional<?> findByPassword(String password);
  Optional<?> findByRole(String rol);
  Optional<Users> findByUsernameAndPassword(String username, String password);

}
