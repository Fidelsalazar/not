package com.example.apistock.models.entities;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class EmployeeMedalId implements Serializable {

  private Long employeeId;
  private Long medalId;

  // Getters y setters
  public Long getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(Long employeeId) {
    this.employeeId = employeeId;
  }

  public Long getMedalId() {
    return medalId;
  }

  public void setMedalId(Long medalId) {
    this.medalId = medalId;
  }

  public EmployeeMedalId(Long employeeId, Long medalId) {
    this.employeeId = employeeId;
    this.medalId = medalId;
  }

  public EmployeeMedalId() {
  }
}
