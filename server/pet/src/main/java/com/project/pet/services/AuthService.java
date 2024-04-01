package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.User;

public interface AuthService {
  User createUser(SignupDTO signupDTO);
  User authenticate(LoginDto input);
}
