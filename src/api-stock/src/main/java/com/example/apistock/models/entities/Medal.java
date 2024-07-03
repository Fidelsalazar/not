package com.example.apistock.models.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
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
public class Medal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;
  @Column
  private Integer timeWork;


  @ManyToMany
  @JoinTable(
    name = "employee_medal",
    joinColumns = @JoinColumn(name = "medal_id"),
    inverseJoinColumns = @JoinColumn(name = "employee_id")
  )
  private List<Employee> employees;

  @ManyToOne
  private Institucion institucion;
}
