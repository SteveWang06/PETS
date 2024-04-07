package com.project.pet.dto;

import com.project.pet.models.Image;
import com.project.pet.models.Role;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class SignupDTO {
  private String username;

  private String email;

  private String password;



  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }


}
