package com.project.pet.controller;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.User;
import com.project.pet.payload.response.LoginResponse;
import com.project.pet.services.AuthService;
import com.project.pet.services.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final JwtService jwtService;

  private final AuthService authService;

  @Autowired
  public AuthController(JwtService jwtService, AuthService authService) {
    this.jwtService = jwtService;
    this.authService = authService;
  }

  @Operation(summary = "User registration", description = "Register a new user")
  @ApiResponse(responseCode = "200", description = "User registered successfully")
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestParam("username") String username,
                                    @RequestParam("email") String email,
                                    @RequestParam("password") String password) throws IOException {
    User registerUser = authService.createUser(username, email, password);
    if (registerUser == null) {
      return ResponseEntity.badRequest().body("Failed to register user.");
    }
    return ResponseEntity.ok(registerUser);
  }

  @Operation(summary = "User authentication", description = "Authenticate user credentials")
  @ApiResponse(responseCode = "200", description = "User authenticated successfully")
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginDto) {
    User authenticatedUser = authService.authenticate(loginDto);
    String jwtToken = jwtService.generateToken(authenticatedUser);
    String username = authenticatedUser.getUserName();
    Long userId = authenticatedUser.getId();
    LoginResponse loginResponse = new LoginResponse()
        .setToken(jwtToken)
        .setExpiresIn(jwtService.getExpirationTime())
        .setUserName(username)
        .setUserId(userId);
    return ResponseEntity.ok(loginResponse);
  }

  @Operation(summary = "Update user", description = "Update user information")
  @ApiResponse(responseCode = "200", description = "User updated successfully")
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id,
                                         @RequestParam("username") String username,
                                         @RequestParam("email") String email,
                                         @RequestParam("password") String password,
                                         @RequestParam("image") MultipartFile images,
                                         @RequestParam("birthday") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate birthday) throws IOException {
    User updatedUser = authService.updateUser(id, username, email, password, images, birthday);
    return ResponseEntity.ok(updatedUser);
  }

  @Operation(summary = "Delete user", description = "Delete user by user ID")
  @ApiResponse(responseCode = "200", description = "User deleted successfully")
  @DeleteMapping("/{userId}")
  public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
    authService.deleteUser(userId);
    return ResponseEntity.ok("User deleted successfully");
  }
}
