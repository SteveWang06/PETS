package com.project.pet.controller;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.models.Image;
import com.project.pet.models.User;
import com.project.pet.payload.response.LoginResponse;
//import com.project.pet.services.RefreshTokenService;
//import com.project.pet.services.UserDetailsImpl;
import com.project.pet.services.AuthService;
import com.project.pet.services.JwtService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final JwtService jwtService;

  @Autowired
  private final AuthService authService;




  public AuthController(JwtService jwtService, AuthService authService) {
    this.jwtService = jwtService;
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestParam("username") String username,
                                       @RequestParam("email") String email,
                                       @RequestParam("password") String password,
                                       @RequestParam("image") MultipartFile images) throws IOException {



    User registerUser = authService.createUser(username, email, password, images);
    if (registerUser == null) {
      return ResponseEntity.badRequest().body("Failed to register user."); // Handle the case where user creation fails
    }
    return ResponseEntity.ok(registerUser);


  }



  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginDto) {
    User authenticatedUser = authService.authenticate(loginDto);

    String jwtToken = jwtService.generateToken(authenticatedUser);

    String username = authenticatedUser.getUserName();
    Long userId = authenticatedUser.getId();
    Image avatar = authenticatedUser.getAvatar();

    LoginResponse loginResponse = new LoginResponse()
        .setToken(jwtToken)
        .setExpiresIn(jwtService.getExpirationTime())
        .setUserName(username)
        .setUserId(userId)
        .setAvatar(avatar);

    return ResponseEntity.ok(loginResponse);
  }
  
}





























