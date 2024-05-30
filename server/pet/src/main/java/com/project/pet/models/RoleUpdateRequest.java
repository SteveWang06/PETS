package com.project.pet.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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
}
