package com.project.pet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "postKind")
public class PostKind {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column
  private String kind;



  public PostKind() {}



  public PostKind(Integer id, String kind) {
    this.id = id;
    this.kind = kind;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getKind() {
    return kind;
  }

  public void setKind(String kind) {
    this.kind = kind;
  }
}
