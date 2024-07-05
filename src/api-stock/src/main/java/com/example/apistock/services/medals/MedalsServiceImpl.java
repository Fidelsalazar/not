package com.example.apistock.services.medals;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.dto.MedalDTO;
import com.example.apistock.models.entities.Employee;
import com.example.apistock.models.entities.EmployeeMedal;
import com.example.apistock.models.entities.EmployeeMedalId;
import com.example.apistock.models.entities.Medal;
import com.example.apistock.repositories.EmployeeMedalRepository;
import com.example.apistock.repositories.EmployeeRepository;
import com.example.apistock.repositories.MedalRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class MedalsServiceImpl implements MedalsService {

  private final MedalRepository medalRepository;
  private final EmployeeMedalRepository employeeMedalRepository;

  public MedalsServiceImpl(MedalRepository medalRepository, EmployeeRepository employeeRepository, EmployeeMedalRepository employeeMedalRepository) {
    this.medalRepository = medalRepository;
    this.employeeMedalRepository = employeeMedalRepository;
  }

  @Override
  public List<EmployeeDTO> getbymedal(
    String medalget
  ){
    try {
      log.info(medalRepository.findByName( medalget ).toString());

      List<EmployeeDTO> employeeDTOs = new ArrayList<>();

      for (
        Employee employee : medalRepository.findByName(medalget).getEmployees()
      ) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        BeanUtils.copyProperties(employee, employeeDTO);

        List<MedalDTO> medalDTOs = new ArrayList<>();
        for (EmployeeMedal employeeMedal : employee.getEmployeeMedals()) {
          Hibernate.initialize(employeeMedal);
          MedalDTO medalDTO = new MedalDTO();
          if(
            employeeMedal.getStatus().equals("PROPUESTA")
          ) {
            medalDTO.setId(employeeMedal.getId().getMedalId());
            medalDTO.setName(employeeMedal.getMedal().getName());
            medalDTO.setStatus(employeeMedal.getStatus());
            medalDTO.setFechaEntrega(employeeMedal.getFechaEntrega());
            medalDTO.setFechaSolicitud(employeeMedal.getFechaSolicitud());
          }
          medalDTOs.add(medalDTO);
        }

        employeeDTO.setMedals(medalDTOs);
        employeeDTOs.add(employeeDTO);
      }

      return employeeDTOs;
    }catch (Exception e) {
      log.error(String.valueOf(e));
    }
    return null;

  }

  @Override
  public Boolean changeStatus(
    EmployeeMedalId id,
    String change
  ){
    try {

      Optional<EmployeeMedal> medal = employeeMedalRepository.findById(id);

      if(medal.isPresent()){
        EmployeeMedal medal1 = medal.get();

        medal1.setStatus(change);

        employeeMedalRepository.save(medal1);
      }

      return true;
    }catch (Exception e) {
      log.error(String.valueOf(e));
    }
    return null;
  }
}
