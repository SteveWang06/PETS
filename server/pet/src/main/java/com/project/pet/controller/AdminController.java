package com.project.pet.controller;

import com.project.pet.dto.SignupDTO;
import com.project.pet.models.User;
import com.project.pet.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/auth")
@RestController
public class AdminController {
  private final UserService userService;

  public AdminController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/admins")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public ResponseEntity<User> createAdministrator(@RequestBody SignupDTO registerUserDto) {
    User createdAdmin = userService.createAdministrator(registerUserDto);
    return ResponseEntity.ok(createdAdmin);
  }
}
