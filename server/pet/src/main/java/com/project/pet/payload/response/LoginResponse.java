package com.project.pet.payload.response;

public class LoginResponse {
  private String token;

  private long expiresIn;

  private String username;
  private long userId;

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

  @Override
  public String toString() {
    return "LoginResponse{" +
        "token='" + token + '\'' +
        ", expiresIn=" + expiresIn +
        ", username=" + username +
        ", userId=" + userId +
        '}';
  }
}
