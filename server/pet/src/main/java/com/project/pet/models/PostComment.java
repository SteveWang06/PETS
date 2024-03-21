package com.project.pet.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "comments")
public class PostComment {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;


  @ManyToOne()
  private Post post;




  @Column
  private String content;

  public PostComment() {}

  public PostComment(String content) {
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




  public Post getPost() {
    return post;
  }

  public void setPost(Post post) {
    this.post = post;
  }
}
