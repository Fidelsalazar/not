package com.example.apistock.models.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id"
)
public class Employee {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Long idEmpleado;
  @Column
  private String noCI;
  @Column
  private String nombre;
  @Column
  private String apellido1;
  @Column
  private String apellido2;
  @Column
  private String cuadro;
  @Column
  private String sexo;
  @Column
  private Date fechaEntrada;
  @Column
  private Date fechaEntradEdu;
  @Column
  private Date fechaEntradaCNEA;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "employee_medal", // Nombre de la tabla de unión
    joinColumns = @JoinColumn(name = "employee_id"), // Columna de esta entidad (Employee)
    inverseJoinColumns = @JoinColumn(name = "medal_id") // Columna de la entidad asociada (Medal)
  )
  private List<Medal> medals;

  @OneToMany(mappedBy = "employee", fetch = FetchType.EAGER)
  private List<EmployeeMedal> employeeMedals;

  @Override
  public String toString() {
    return "Employee{" +
      "id=" + id +
      ", nombre='" + nombre + '\'' +
      ", apellido1='" + apellido1 + '\'' +
      // ... otros campos ...
      ", medals=" + (medals != null ? "Loaded Medals" : "No Medals") +
      '}';
  }
}
