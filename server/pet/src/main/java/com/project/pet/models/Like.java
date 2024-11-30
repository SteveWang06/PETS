package com.project.pet.models;


import jakarta.persistence.*;

@Entity
@Table(name = "user_likes")
public class Like {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user; // Người dùng đã like

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post; // Bài viết được like

  private boolean isLiked; // Trạng thái like (true nếu đã like, false nếu chưa like)

  // Getters and Setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }

  public boolean isLiked() {
    return isLiked;
  }

  public void setLiked(boolean liked) {
    isLiked = liked;
  }
}

