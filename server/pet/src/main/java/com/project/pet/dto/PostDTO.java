package com.project.pet.dto;

import com.project.pet.models.Image;
import com.project.pet.models.PostKind;
import com.project.pet.models.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public class PostDTO {
  private Long id;
  private String caption;
  //private List<PostImage> postImages;
  //private MultipartFile postImages;
  private List<Image> postImages;
  private String postKind;


  private String authorName;
  private Image authorAvatar;
  private Integer postLike;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public List<Image> getPostImages() {
    return postImages;
  }

  public void setPostImages(List<Image> postImages) {
    this.postImages = postImages;
  }

//  public Set<PostKind> getPostKinds() {
//    return postKinds;
//  }
//
//  public void setPostKinds(Set<PostKind> postKinds) {
//    this.postKinds = postKinds;
//  }


  public String getPostKind() {
    return postKind;
  }

  public void setPostKind(String postKind) {
    this.postKind = postKind;
  }

  public String getAuthorName() {
    return authorName;
  }

  public void setAuthorName(String authorName) {
    this.authorName = authorName;
  }

  public Image getAuthorAvatar() {
    return authorAvatar;
  }

  public void setAuthorAvatar(Image authorAvatar) {
    this.authorAvatar = authorAvatar;
  }

  public Integer getPostLike() {
    return postLike;
  }

  public void setPostLike(Integer postLike) {
    this.postLike = postLike;
  }

  //  public List<String> getPostImages() {
//    return postImages;
//  }
//
//  public void setPostImages(List<String> postImages) {
//    this.postImages = postImages;
//  }
//
//
//
//
//  public Set<PostKind> getPostKinds() {
//    return postKinds;
//  }
//
//  public void setPostKinds(Set<PostKind> postKinds) {
//    this.postKinds = postKinds;
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
//  public String getCaption() {
//    return caption;
//  }
//
//  public void setCaption(String caption) {
//    this.caption = caption;
//  }
//
//
//
//  public String getAuthorName() {
//    return authorName;
//  }
//
//  public void setAuthorName(String authorName) {
//    this.authorName = authorName;
//  }
//
//  public String getAuthorAvatar() {
//    return authorAvatar;
//  }
//
//  public void setAuthorAvatar(String authorAvatar) {
//    this.authorAvatar = authorAvatar;
//  }
//
//  public Integer getPostLike() {
//    return postLike;
//  }
//
//  public void setPostLike(Integer postLike) {
//    this.postLike = postLike;
//  }
}
