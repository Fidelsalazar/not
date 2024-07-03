package com.example.apistock.services.employee;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.dto.MedalDTO;
import com.example.apistock.models.entities.Employee;
import com.example.apistock.models.entities.EmployeeMedal;
import com.example.apistock.repositories.EmployeeRepository;
import com.example.apistock.repositories.MedalRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final MedalRepository medalRepository;

  public EmployeeServiceImpl(EmployeeRepository employeeRepository, MedalRepository medalRepository) {
    this.employeeRepository = employeeRepository;
    this.medalRepository = medalRepository;
  }

  @Override
  public Employee save(
    EmployeeDTO employeeDTO
  ){
    try {
      Employee employee = Employee
        .builder()
        .idEmpleado(employeeDTO.getIdEmpleado())
        .noCI(employeeDTO.getNoCI())
        .nombre(employeeDTO.getNombre())
        .apellido1(employeeDTO.getApellido1())
        .apellido2(employeeDTO.getApellido2())
        .cuadro(employeeDTO.getCuadro())
        .fechaEntrada(employeeDTO.getFechaEntrada())
        .fechaEntradaCNEA(employeeDTO.getFechaEntradaCNEA())
        .fechaEntradEdu(employeeDTO.getFechaEntradEdu())
        .build();

      /*if (
        employeeDTO.getMedals() != null
          && !employeeDTO.getMedals().isEmpty()
      ) {
        List<Medal> medals = medalRepository.findAllById(employeeDTO.getMedalsIds());


        employeeDTO.getMedals().forEach(
          (i) -> {
            try {
              EmployeeMedal employeeMedal = new EmployeeMedal();
              Medal medal = new Medal();

              BeanUtils.copyProperties(medal, i);

              employeeMedal.setEmployee(employee);
              employeeMedal.setMedal(medal);
              employeeMedal.setStatus(i.getStatus());
            } catch (Exception e){
              log.error(e.toString());
            }
          }
        );

        employee.setMedals(medals);

      }*/
      return employeeRepository.save(employee);
    }catch (Exception e) {
        log.error(String.valueOf(e));
    }
    return null;
  }

  @Override
  public List<EmployeeDTO> getAll() {
    List<Employee> employees = employeeRepository.findAll();
    List<EmployeeDTO> employeeDTOs = new ArrayList<>();

    for (Employee employee : employees) {
      EmployeeDTO employeeDTO = new EmployeeDTO();
      BeanUtils.copyProperties(employee, employeeDTO);

      List<MedalDTO> medalDTOs = new ArrayList<>();
      for (EmployeeMedal employeeMedal : employee.getEmployeeMedals()) {
        Hibernate.initialize(employeeMedal);

        MedalDTO medalDTO = new MedalDTO();
        medalDTO.setId(employeeMedal.getId().getMedalId());
        medalDTO.setName(employeeMedal.getMedal().getName());
        medalDTO.setStatus(employeeMedal.getStatus());
        medalDTO.setFechaEntrega(employeeMedal.getFechaEntrega());
        medalDTO.setFechaSolicitud(employeeMedal.getFechaSolicitud());

        medalDTOs.add(medalDTO);
      }

      employeeDTO.setMedals(medalDTOs);
      employeeDTOs.add(employeeDTO);
    }
    return employeeDTOs;
  }


  @Override
  public String delete(Long id) throws Exception {
    try {
      employeeRepository.deleteById(id);
      return null;
    }catch (Exception e) {
      log.error(e.getMessage());
      throw new Exception();
    }
  }

}
