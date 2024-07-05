package com.example.apistock.services.employee;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.entities.Employee;

import java.util.List;

public interface EmployeeService {
  Employee save( EmployeeDTO employeeDTO );

  List<EmployeeDTO> getAll( String role, String user, String pass, String name);

  String delete(Long id) throws Exception;
}
