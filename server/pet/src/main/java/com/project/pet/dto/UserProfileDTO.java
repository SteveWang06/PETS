package com.project.pet.models.dto;

import com.project.pet.models.Post;
import com.project.pet.models.User;

import java.util.List;

public class UserProfileDTO {
  private User user;
  private List<Post> posts;


  public UserProfileDTO(User user, List<Post> posts) {
    this.user = user;
    this.posts = posts;
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
}

