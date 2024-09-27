package com.project.pet.dto;

import com.project.pet.models.Post;
import com.project.pet.models.Product;
import com.project.pet.models.User;

import java.util.List;

public class UserProfileDTO {
  private User user;
  private List<Post> posts;
  private List<Product> products;

  public UserProfileDTO(User user, List<Post> posts, List<Product> products) {
    this.user = user;
    this.posts = posts;
    this.products = products;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<Post> getPosts() {
    return posts;
  }

  public void setPosts(List<Post> posts) {
    this.posts = posts;
  }

  public List<Product> getProducts() {
    return products;
  }

  public void setProducts(List<Product> products) {
    this.products = products;
  }
}

