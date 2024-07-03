package com.example.apistock.services.medals;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.entities.Medal;

import java.util.List;

public interface MedalsService {
  List<EmployeeDTO> getbymedal(String medalget);
}
