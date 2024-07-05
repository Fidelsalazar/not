package com.example.apistock.repositories;

import com.example.apistock.models.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository <Employee, Long> {

  Optional<Employee> findByApellido2(String name);

}
