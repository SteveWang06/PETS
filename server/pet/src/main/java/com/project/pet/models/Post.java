package com.project.pet.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;
import java.util.List;

@Entity
@Table(name = "post")
@Data
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column()
  @Temporal(TemporalType.DATE)
  private Date uploadAt;

  @Column()
  private String caption;

  @Column()
  private Integer status;

  @Column()
  private Integer like;

  @OneToMany
  @JoinColumn(name = "image_id")
  private List<PostImage> postImages = new ArrayList<>();

  @OneToOne
  @JoinColumn(name = "postKind_id")
  private PostKind postKinds;

  @OneToMany
  @JoinColumn(name = "comment_id")
  private Set<PostComment> comments = new HashSet<>();

  public Post() {
  }

  public Post(Long id, Date uploadAt, String caption, Integer status, Integer like, List<PostImage> postImages, PostKind postKinds, Set<PostComment> comments) {
    this.id = id;
    this.uploadAt = uploadAt;
    this.caption = caption;
    this.status = status;
    this.like = like;
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

  public Date getUploadAt() {
    return uploadAt;
  }

  public void setUploadAt(Date uploadAt) {
    this.uploadAt = uploadAt;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public Integer getLike() {
    return like;
  }

  public void setLike(Integer like) {
    this.like = like;
  }

  public List<PostImage> getPostImages() {
    return postImages;
  }

  public void setPostImages(List<PostImage> postImages) {
    this.postImages = postImages;
  }

  public PostKind getPostKinds() {
    return postKinds;
  }

  public void setPostKinds(PostKind postKinds) {
    this.postKinds = postKinds;
  }

  public Set<PostComment> getComments() {
    return comments;
  }

  public void setComments(Set<PostComment> comments) {
    this.comments = comments;
  }
}
