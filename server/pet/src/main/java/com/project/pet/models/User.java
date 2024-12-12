package com.project.pet.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;


@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email")
})
@Data
public class User implements UserDetails {


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotBlank
  private String username;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "image_id")
  @JsonManagedReference
  private Image avatar;

  @NotBlank
  @Email
  private String email;

  //@NotBlank
  private String password;


  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  @CreationTimestamp
  @Column(updatable = false, name = "created_at")
  private Date createdAt;

  //@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  //@UpdateTimestamp
  @Column(name = "birthday")
  private LocalDate birthday;

  @JsonIgnore
  @OneToMany(mappedBy = "author")
  private List<Post> posts;

  @JsonIgnore
  @OneToMany(mappedBy = "user")
  private List<Product> products;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
  private Role role;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Address> addresses;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonManagedReference // Quản lý ánh xạ tới ChatBot
  private List<ChatBot> chatBots;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().toString());

    return List.of(authority);
  }

  public List<Post> getPosts() {
    return posts;
  }

  public List<Product> getProducts() {
    return products;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Long getId() {
    return id;
  }

  public User setId(Long id) {
    this.id = id;
    return this;
  }

  public String getUserName() {
    return username;
  }

  public User setUserName(String username) {
    this.username = username;
    return this;
  }

  public String getEmail() {
    return email;
  }

  public User setEmail(String email) {
    this.email = email;
    return this;
  }

  public User setPassword(String password) {
    this.password = password;
    return this;
  }


  public Image getAvatar() {
    return avatar;
  }

  public void setAvatar(Image avatar) {
    this.avatar = avatar;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public User setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public User setBirthday(LocalDate birthday) {
    this.birthday = birthday;
    return this;
  }



  public Role getRole() {
    return role;
  }

  public User setRole(Role role) {
    this.role = role;
    return this;
  }

  public List<Address> getAddresses() {
    return addresses;
  }

  public void setAddresses(List<Address> addresses) {
    this.addresses = addresses;
  }

  public List<ChatBot> getChatBots() {
    return chatBots;
  }

  public void setChatBots(List<ChatBot> chatBots) {
    this.chatBots = chatBots;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", avatar=" + avatar +
        ", fullName='" + username + '\'' +
        ", email='" + email + '\'' +
        ", createdAt=" + createdAt +
        ", updatedAt=" + birthday +
        ", address=" + addresses +
        '}';
  }
}
































