package com.project.pet.payload.response;

import com.project.pet.models.Image;
import org.springframework.web.multipart.MultipartFile;

public class LoginResponse {
  private String token;

  private long expiresIn;

  private String username;
  private long userId;

  private Image avatar;

  public String getToken() {
    return token;
  }

  public LoginResponse setToken(String token) {
    this.token = token;
    return this;
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

  @Override
  public String toString() {
    return "LoginResponse{" +
        "token='" + token + '\'' +
        ", expiresIn=" + expiresIn +
        ", username=" + username +
        ", userId=" + userId +
        ", userId=" + avatar +
        '}';
  }
}
