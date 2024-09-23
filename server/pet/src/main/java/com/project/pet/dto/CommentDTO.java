package com.project.pet.dto;

import com.project.pet.models.User;

import java.time.LocalDateTime;

public class CommentDTO {


  private Long commentId;
  private Long userId;
  private String username;
  private String content;
  private String userFullName;
  private String userEmail;
  private String userAvatarUrl;

  // Constructors, getters, and setters
  public CommentDTO(Long commentId, Long userId, String username, String content, String userFullName, String userEmail, String userAvatarUrl) {
    this.commentId = commentId;
    this.userId = userId;
    this.username = username;
    this.content = content;
    this.userFullName = userFullName;
    this.userEmail = userEmail;
    this.userAvatarUrl = userAvatarUrl;
  }

  // Getters and setters
  public Long getCommentId() {
    return commentId;
  }

  public void setCommentId(Long commentId) {
    this.commentId = commentId;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getUserFullName() {
    return userFullName;
  }

  public void setUserFullName(String userFullName) {
    this.userFullName = userFullName;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public String getUserAvatarUrl() {
    return userAvatarUrl;
  }

  public void setUserAvatarUrl(String userAvatarUrl) {
    this.userAvatarUrl = userAvatarUrl;
  }
}