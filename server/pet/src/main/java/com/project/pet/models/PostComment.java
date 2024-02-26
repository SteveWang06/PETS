package com.project.pet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "postComment")
public class PostComment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private String content;

  public PostComment() {}

  public PostComment(Long id, String content) {
    this.id = id;
    this.content = content;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
