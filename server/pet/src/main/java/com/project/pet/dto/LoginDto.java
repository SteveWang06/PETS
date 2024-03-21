package com.project.pet.dto;


import lombok.Data;

@Data
public class LoginDto {
  private String email;

  private String password;

  public String getEmail() {
    return email;
  }

  public LoginDto setEmail(String email) {
    this.email = email;
    return this;
  }

  public String getPassword() {
    return password;
  }

  public LoginDto setPassword(String password) {
    this.password = password;
    return this;
  }

  @Override
  public String toString() {
    return "LoginUserDto{" +
        "email='" + email + '\'' +
        ", password='" + password + '\'' +
        '}';
  }
}
