package com.project.pet.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@Table(name = "comments")
public class PostComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "post_id")
  private Long postId;

  @ManyToOne
  //@Column(name = "user_id")
  @JoinColumn(name = "user_id")
  private User userId;

  @Column
  private String content;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  @Column
  private Date uploadAt;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getPostId() {
    return postId;
  }

  public void setPostId(Long postId) {
    this.postId = postId;
  }

  public User getUserId() {
    return userId;
  }

  public void setUserId(User userId) {
    this.userId = userId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Date getUploadAt() {
    return uploadAt;
  }

  public void setUploadAt(Date uploadAt) {
    this.uploadAt = uploadAt;
  }

  //  public User getUser() {
//    return user;
//  }
//
//  public void setUser(User user) {
//    this.user = user;
//  }

//  public String getContent() {
//    return content;
//  }
//
//  public void setContent(String content) {
//    this.content = content;
//  }

  //  @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
//  private Long id;
//
//
//  @Column(name = "post_id")
//  private Long postId;
//
//  //  @Column(name = "user_id")
////  private Long userId;
//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "user_id")
//  private User author;
//
//
//  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
//  @Column
//  private Date uploadAt;
//
//  @Column
//  private String content;
//
//
//
//
//  public PostComment() {}
//
//  public PostComment(String content) {
//    this.content = content;
//  }
//
//  public Long getId() {
//    return id;
//  }
//
//  public void setId(Long id) {
//    this.id = id;
//  }
//
//  public String getContent() {
//    return content;
//  }
//
//  public void setContent(String content) {
//    this.content = content;
//  }
//
////  public Long getUserId() {
////    return userId;
////  }
////
////  public void setUserId(Long user) {
////    this.userId = user;
////  }
//
//
//  public User getAuthor() {
//    return author;
//  }
//
//  public void setAuthor(User author) {
//    this.author = author;
//  }
//
//  public Date getUploadAt() {
//    return uploadAt;
//  }
//
//  public void setUploadAt(Date uploadAt) {
//    this.uploadAt = uploadAt;
//  }
//
//  public Long getPostId() {
//    return postId;
//  }
//
//  public void setPostId(Long post) {
//    this.postId = post;
//  }
}