package com.project.pet.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class RoleUpdateRequest {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "role_id")
  private Role requestedRole;

  private LocalDateTime requestDate;

  private boolean approved;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "image_id")
  @JsonManagedReference
  private List<Image> images;

  // Constructors, getters, and setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Role getRequestedRole() {
    return requestedRole;
  }

  public void setRequestedRole(Role requestedRole) {
    this.requestedRole = requestedRole;
  }

  public LocalDateTime getRequestDate() {
    return requestDate;
  }

  public void setRequestDate(LocalDateTime requestDate) {
    this.requestDate = requestDate;
  }

  public boolean isApproved() {
    return approved;
  }

  public void setApproved(boolean approved) {
    this.approved = approved;
  }

  public List<Image> getImages() {
    return images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }
}
