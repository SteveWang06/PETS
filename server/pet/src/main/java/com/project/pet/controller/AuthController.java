package com.project.pet.controller;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.Image;
import com.project.pet.models.Role;
import com.project.pet.models.User;
import com.project.pet.payload.response.LoginResponse;
import com.project.pet.services.AuthService;
import com.project.pet.services.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
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
//  @PostMapping("/register")
//  public ResponseEntity<String> sendOtp(@RequestParam("username") String username,
//                                        @RequestParam("email") String email,
//                                        @RequestParam("password") String password) throws IOException {
//    authService.sendOtp(username, email, password);
//    return ResponseEntity.ok("OTP sended to your email.");
//  }

  @PostMapping("/register")
  public ResponseEntity<Map<String, Object>> sendOtp(@RequestParam("username") String username,
                                                     @RequestParam("email") String email,
                                                     @RequestParam("password") String password) throws IOException {
    try {
      // Gọi service gửi OTP
      authService.sendOtp(username, email, password);

      // Tạo phản hồi thành công
      Map<String, Object> response = new HashMap<>();
      response.put("success", true);
      response.put("message", "OTP has been sent to your email.");

      // Trả về phản hồi thành công với status 200
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      // Trường hợp có lỗi (ví dụ: email không hợp lệ, người dùng đã tồn tại, v.v.)
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("success", false);
      errorResponse.put("message", "Error: " + e.getMessage());

      // Trả về phản hồi lỗi với status 400
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
  }

  @PostMapping("/verify-otp")
  public ResponseEntity<User> verifyOtp(@RequestParam("email") String email,
                                        @RequestParam("otp") String otp) throws IOException {
    User user = authService.createUser(email, otp);
    return ResponseEntity.ok(user);
  }



  @Operation(summary = "User authentication", description = "Authenticate user credentials")
  @ApiResponse(responseCode = "200", description = "User authenticated successfully")
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginDto) {
    User authenticatedUser = authService.authenticate(loginDto);
    String jwtToken = jwtService.generateToken(authenticatedUser);
    String username = authenticatedUser.getUserName();
    Long userId = authenticatedUser.getId();
    Role role = authenticatedUser.getRole();
    Image avatar = authenticatedUser.getAvatar();

    LoginResponse loginResponse = new LoginResponse()
        .setToken(jwtToken)
        .setExpiresIn(jwtService.getExpirationTime())
        .setUserName(username)
        .setAvatar(avatar)
        .setRole(role)
        .setUserId(userId);
    return ResponseEntity.ok(loginResponse);
  }

  @Operation(summary = "Update user", description = "Update user information")
  @ApiResponse(responseCode = "200", description = "User updated successfully")
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id,
                                         @RequestParam("username") String username,
                                         @RequestParam("email") String email,
                                         @RequestParam("address") String address,
                                         @RequestParam("image") MultipartFile images,
                                         @RequestParam("birthday") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate birthday) throws IOException {
    User updatedUser = authService.updateUser(id, username, email, images, birthday, address);
    return ResponseEntity.ok(updatedUser);
  }

  @Operation(summary = "Delete user", description = "Delete user by user ID")
  @ApiResponse(responseCode = "200", description = "User deleted successfully")
  @DeleteMapping("/{userId}")
  public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
    authService.deleteUser(userId);
    return ResponseEntity.ok("User deleted successfully");
  }

  @GetMapping("/login-with-google")
  public void loginWithGoogle(HttpServletResponse response) throws IOException {
    response.sendRedirect("/oauth2/authorization/google"); // Chuyển hướng trình duyệt
  }

  @GetMapping("/profile")
  public String getUserProfile(OAuth2AuthenticationToken token, Model model) {
    if (token != null) {
      // Lấy thông tin từ token
      Map<String, Object> attributes = token.getPrincipal().getAttributes();
      String name = (String) attributes.get("name");
      String email = (String) attributes.get("email");
      String picture = (String) attributes.get("picture");

      // Thêm thông tin vào model để hiển thị trên giao diện
      model.addAttribute("name", name);
      model.addAttribute("email", email);
      model.addAttribute("photo", picture);
    }
    return "user-profile"; // Tên template hiển thị giao diện
  }


}
