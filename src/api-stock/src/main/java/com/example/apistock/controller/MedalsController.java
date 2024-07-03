package com.example.apistock.controller;

import com.example.apistock.models.dto.EmployeeDTO;
import com.example.apistock.models.entities.Medal;
import com.example.apistock.services.medals.MedalsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("v1/api/medals")
public class MedalsController {

  private final MedalsService medalsService;

  public MedalsController(MedalsService medalsService) {
    this.medalsService = medalsService;
  }

  @GetMapping("/getbyname/{medalget}")
  public ResponseEntity <List<EmployeeDTO>> getbymedal(
    @PathVariable String medalget
  )throws Exception{
    return  new ResponseEntity <>(
      medalsService.getbymedal(medalget),
      HttpStatus.OK
    );
  }
}
