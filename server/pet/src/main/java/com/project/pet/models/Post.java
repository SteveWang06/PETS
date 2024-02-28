package com.project.pet.models;

import jakarta.persistence.*;

import java.util.*;
import java.util.List;

@Entity
@Table(name = "post")
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
}
