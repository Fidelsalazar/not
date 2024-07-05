package com.example.apistock.controller;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.entities.Employee;
import com.example.apistock.services.employee.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("v1/api/employee")
public class EmployeeController {

  private final EmployeeService employeeService;

  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @PostMapping
  public ResponseEntity <Employee> create (
    @RequestBody EmployeeDTO employeeDTO
  ) {
    log.info(employeeDTO.toString());
    return new ResponseEntity<>(
      employeeService.save(employeeDTO),
      HttpStatus.CREATED
    );
  }

  @GetMapping("/{role}/all")
  public ResponseEntity<List<EmployeeDTO>> getAllAireVentana(
    @PathVariable String role,
    @RequestParam String username,
    @RequestParam String password,
    @RequestParam String name
  ) throws  Exception {
    log.info(username, password, name, role);
    return new ResponseEntity<>(
      employeeService.getAll(role, username, password, name),
      HttpStatus.OK
    );
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<String> delete(
    @PathVariable Long id
  )throws Exception{
    return  new ResponseEntity<>(
      employeeService.delete(id),
      HttpStatus.OK
    );
  }
}
