package com.project.pet.controller;

import com.project.pet.dto.UserProfileDTO;
import com.project.pet.models.User;
import com.project.pet.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/auth")
@RestController
@SecurityRequirement(name = "bearerAuth")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/me")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<User> authenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    User currentUser = (User) authentication.getPrincipal();

    return ResponseEntity.ok(currentUser);
  }

  @GetMapping("/user")
  @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
  public ResponseEntity<List<User>> allUsers() {
    List <User> users = userService.allUser();

    return ResponseEntity.ok(users);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<UserProfileDTO> getUserWithPostsById(@PathVariable Long userId) {
    UserProfileDTO userWithPostsDTO = userService.getUserProfile(userId);
    return ResponseEntity.ok(userWithPostsDTO);
  }
}
