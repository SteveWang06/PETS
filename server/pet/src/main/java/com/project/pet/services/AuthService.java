package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthService {
  User createUser(String username, String email, String password, MultipartFile images) throws IOException;
  User authenticate(LoginDto input);
}
