package com.project.pet.payload.response;

import com.project.pet.models.Image;
import com.project.pet.models.Role;
import org.springframework.web.multipart.MultipartFile;

public class LoginResponse {
  private String token;

  private long expiresIn;

  private String username;
  private long userId;

  private Image avatar;
  private Role role;

  public String getToken() {
    return token;
  }

  public LoginResponse setToken(String token) {
    this.token = token;
    return this;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }



  public long getExpiresIn() {
    return expiresIn;
  }

  public LoginResponse setExpiresIn(long expiresIn) {
    this.expiresIn = expiresIn;
    return this;
  }


  public String getUserName() {
    return username;
  }

  public LoginResponse setUserName(String username) {
    this.username = username;
    return this;
  }

  public Long getUserId() {
    return userId;
  }

  public LoginResponse setUserId(long userId) {
    this.userId = userId;
    return this;
  }

  public Image getAvatar() {
    return avatar;
  }

  public LoginResponse setAvatar(Image avatar) {
    this.avatar = avatar;
    return this;
  }

  public Role getRole() {
    return role;
  }

  public LoginResponse setRole(Role role) {
    this.role = role;
    return this;
  }

  @Override
  public String toString() {
    return "LoginResponse{" +
        "token='" + token + '\'' +
        ", expiresIn=" + expiresIn +
        ", username=" + username +
        ", role=" + role +
        ", userId=" + userId +
        ", avatar=" + avatar +
        '}';
  }
}
