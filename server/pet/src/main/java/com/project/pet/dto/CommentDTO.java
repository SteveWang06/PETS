package com.project.pet.dto;

import com.project.pet.models.User;

import java.time.LocalDateTime;

public class CommentDTO {


  private Long postId;
  //private Long userId;
  private LocalDateTime uploadAt;
  private String content;
  private User author;
  // Constructors
  public CommentDTO() {}

  public CommentDTO(Long postId, User author, LocalDateTime uploadAt, String content) {

    this.postId = postId;
    this.author = author;
    this.uploadAt = uploadAt;
    this.content = content;
  }

  // Getters and setters
//  public Long getId() {
//    return id;
//  }
//
//  public void setId(Long id) {
//    this.id = id;
//  }

  public Long getPostId() {
    return postId;
  }

  public void setPostId(Long postId) {
    this.postId = postId;
  }

//  public Long getUserId() {
//    return userId;
//  }
//
//  public void setUserId(Long userId) {
//    this.userId = userId;
//  }


  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public LocalDateTime getUploadAt() {
    return uploadAt;
  }

  public void setUploadAt(LocalDateTime uploadAt) {
    this.uploadAt = uploadAt;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}

