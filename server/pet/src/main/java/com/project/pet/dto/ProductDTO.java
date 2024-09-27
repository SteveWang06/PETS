package com.project.pet.dto;

import com.project.pet.models.Image;
import com.project.pet.models.User;

import java.util.List;

public class ProductDTO {
  private Long id;
  private String name;
  private String type;
  private Integer price;
  private String description;
  private List<String> imageUrl;
  private UserDTO user;
  // getters and setters

  public static class UserDTO {
    private Long id;
    private String userName;
    private String email;
    private Image avatar;

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }

    public Image getAvatar() {
      return avatar;
    }

    public void setAvatar(Image avatar) {
      this.avatar = avatar;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }
  }
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Integer getPrice() {
    return price;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public List<String> getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(List<String> imageUrl) {
    this.imageUrl = imageUrl;
  }

  public UserDTO getUser() {
    return user;
  }

  public void setUser(UserDTO user) {
    this.user = user;
  }
}

