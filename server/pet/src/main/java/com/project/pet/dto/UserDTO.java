package com.project.pet.dto;

import com.project.pet.models.Role;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserDTO {

  private Long id;

  private String username;

  private String email;


}
