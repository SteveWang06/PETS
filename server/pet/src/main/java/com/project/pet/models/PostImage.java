package com.project.pet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "postImageEntity")
public class PostImage {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private String imageurl;

  public PostImage() {}

  public PostImage(Long id, String imageurl) {
    this.id = id;
    this.imageurl = imageurl;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getImageurl() {
    return imageurl;
  }

  public void setImageurl(String imageurl) {
    this.imageurl = imageurl;
  }
}
