package com.project.pet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "post")
@Data
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  @Temporal(TemporalType.TIMESTAMP)
  private LocalDateTime uploadAt;

  @Column()
  private String caption;

  @Column()
  private Integer postStatus;

  @Column()
  private Integer postLike;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "postImages", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "image_id"))
  private List<PostImage> postImages = new ArrayList<>();

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "postKinds", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "kind_id"))
  private Set<PostKind> postKinds = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "postComments", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "comment_id"))
  private List<PostComment> comments = new ArrayList<>();

  public Post() {
  }

  public Post(Long id, LocalDateTime uploadAt, String caption, Integer postStatus, Integer postLike, List<PostImage> postImages, Set<PostKind> postKinds, List<PostComment> comments) {
    this.id = id;
    this.uploadAt = uploadAt;
    this.caption = caption;
    this.postStatus = postStatus;
    this.postLike = postLike;
    this.postImages = postImages;
    this.postKinds = postKinds;
    this.comments = comments;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDateTime getUploadAt() {
    return uploadAt;
  }

  public void setUploadAt(LocalDateTime uploadAt) {
    this.uploadAt = uploadAt;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public Integer getStatus() {
    return postStatus;
  }

  public void setStatus(Integer postStatus) {
    this.postStatus = postStatus;
  }

  public Integer getLike() {
    return postLike;
  }

  public void setLike(Integer postLike) {
    this.postLike = postLike;
  }

  public List<PostImage> getPostImages() {
    return postImages;
  }

  public void setPostImages(List<PostImage> postImages) {
    this.postImages = postImages;
  }

  public Set<PostKind> getPostKinds() {
    return postKinds;
  }

  public void setPostKinds(Set<PostKind> postKinds) {
    this.postKinds = postKinds;
  }

  public List<PostComment> getComments() {
    return comments;
  }

  public void setComments(List<PostComment> comments) {
    this.comments = comments;
  }
}
