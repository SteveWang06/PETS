package com.project.pet.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.pet.models.Role;
import com.project.pet.models.RoleEnum;
import com.project.pet.models.User;
import com.project.pet.repository.RoleRepository;
import com.project.pet.services.AuthService;
import com.project.pet.services.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  @Lazy
  private final AuthService authService;
  private final JwtService jwtService;
  private final RoleRepository roleRepository;

  public CustomAuthenticationSuccessHandler(AuthService authService, JwtService jwtService, RoleRepository roleRepository) {
    this.authService = authService;
    this.jwtService = jwtService;
    this.roleRepository = roleRepository;
  }

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
    if (authentication instanceof OAuth2AuthenticationToken) {
      OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
      Map<String, Object> attributes = token.getPrincipal().getAttributes();
      Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

      // Lấy thông tin user từ token
      String name = (String) attributes.get("name");
      String email = (String) attributes.get("email");

      // Lưu user vào database nếu chưa tồn tại
      User user = authService.saveUserIfNotExists(name, email, optionalRole.get());

      // Tạo JWT token
      String jwtToken = jwtService.generateToken(user);

      // Tạo response JSON
      Map<String, Object> responsePayload = new HashMap<>();
      responsePayload.put("name", user.getUserName());
      responsePayload.put("email", user.getEmail());
      responsePayload.put("token", jwtToken);
      responsePayload.put("expiresIn", jwtService.getExpirationTime());

      // Trả về response JSON
      response.setContentType("application/json");
      response.setCharacterEncoding("UTF-8");
      response.getWriter().write(new ObjectMapper().writeValueAsString(responsePayload));
      response.getWriter().flush();
    }
  }
}
