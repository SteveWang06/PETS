package com.project.pet.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

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
  private Date uploadAt;

  @Column()
  private String caption;

  @Column()
  private Integer postStatus;

  @Column()
  private Integer postLike;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User author;

//  @OneToMany(cascade = CascadeType.ALL)
//  @JoinTable(name = "postImages", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "image_id"))
//  private List<PostImage> postImages = new ArrayList<>();

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "post_id")
  @JsonManagedReference
  private List<Image> postImages;


  //  @OneToOne(cascade = CascadeType.ALL)
//  @JoinTable(name = "postKinds", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "kind_id"))
//  private Set<PostKind> postKinds = new HashSet<>();
  @Column()
  private String postKind;

  @OneToMany(cascade = CascadeType.ALL)
//  @JoinTable(name = "comments",
//      joinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"),
//      inverseJoinColumns = @JoinColumn(name = "id", referencedColumnName = "id"))
  @JoinColumn(name = "post_id")
  private List<PostComment> comments = new ArrayList<>();



  public Post() {
  }

  public Post(Long id, Date uploadAt, String caption, Integer postStatus, Integer postLike, String postKind, User author, List<Image> postImages, List<PostComment> comments) {
    this.id = id;
    this.uploadAt = uploadAt;
    this.caption = caption;
    this.postStatus = postStatus;
    this.postLike = postLike;
    this.postKind = postKind;
    this.author = author;
    this.postImages = postImages;
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

  public Integer getPostStatus() {
    return postStatus;
  }

  public void setPostStatus(Integer postStatus) {
    this.postStatus = postStatus;
  }

  public int getPostLike() {
    return postLike != null ? postLike.intValue() : 0;
  }

  public void setPostLike(Integer postLike) {
    this.postLike = postLike;
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public List<Image> getPostImages() {
    return postImages;
  }

  public void setPostImages(List<Image> postImages) {
    this.postImages = postImages;
  }

  public String getPostKind() {
    return postKind;
  }

  public void setPostKind(String postKind) {
    this.postKind = postKind;
  }

  //  public Set<PostKind> getPostKinds() {
//    return postKinds;
//  }
//
//  public void setPostKinds(Set<PostKind> postKinds) {
//    this.postKinds = postKinds;
//  }

  public List<PostComment> getComments() {
    return comments;
  }

  public void setComments(List<PostComment> comments) {
    this.comments = comments;
  }

  //  public Post(Long id, LocalDateTime uploadAt, String caption, Integer postStatus, Integer postLike, List<PostImage> postImages, Set<PostKind> postKinds, List<PostComment> comments) {
//    this.id = id;
//    this.uploadAt = uploadAt;
//    this.caption = caption;
//    this.postStatus = postStatus;
//    this.postLike = postLike;
//    this.postImages = postImages;
//    this.postKinds = postKinds;
//    this.comments = comments;
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
//  public LocalDateTime getUploadAt() {
//    return uploadAt;
//  }
//
//  public void setUploadAt(LocalDateTime uploadAt) {
//    this.uploadAt = uploadAt;
//  }
//
//  public User getAuthor() {
//    return author;
//  }
//
//  public void setAuthor(User author) {
//    this.author = author;
//  }
//
//  public String getCaption() {
//    return caption;
//  }
//
//  public void setCaption(String caption) {
//    this.caption = caption;
//  }
//
//  public Integer getPostStatus() {
//    return postStatus;
//  }
//
//  public void setPostStatus(Integer postStatus) {
//    this.postStatus = postStatus;
//  }
//
//  public Integer getPostLike() {
//    return postLike;
//  }
//
//  public void setPostLike(Integer postLike) {
//    this.postLike = postLike;
//  }
//
//  public List<PostImage> getPostImages() {
//    return postImages;
//  }
//
//  public void setPostImages(List<PostImage> postImages) {
//    this.postImages = postImages;
//  }
//
//  public Set<PostKind> getPostKinds() {
//    return postKinds;
//  }
//
//  public void setPostKinds(Set<PostKind> postKinds) {
//    this.postKinds = postKinds;
//  }
//
//  public List<PostComment> getComments() {
//    return comments;
//  }
//
//  public void setComments(List<PostComment> comments) {
//    this.comments = comments;
//  }
}