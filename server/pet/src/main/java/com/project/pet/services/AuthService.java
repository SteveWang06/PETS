package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.Role;
import com.project.pet.models.User;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

public interface AuthService {
  void sendOtp(String username, String email, String password) throws IOException;
  User createUser(String email, String otp) throws IOException;
  User authenticate(LoginDto input);
  User updateUser(Long id, String username, String email, MultipartFile images, LocalDate birthday, String address) throws IOException;
  String deleteUser(Long userId);
  User saveUserIfNotExists(String name, String email, Role optionalRole);
//  User findOrCreateUser(String email, String name) throws IOException;
}
