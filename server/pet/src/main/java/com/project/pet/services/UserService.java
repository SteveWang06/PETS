package com.project.pet.services;


import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserProfileDTO;
import com.project.pet.models.*;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
  }

  public List<User> allUser() {
    List<User> users = new ArrayList<>();
    userRepository.findAll().forEach(users::add);
    return users;
  }

  public User createAdministrator(SignupDTO input) {
    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);

    if (optionalRole.isEmpty()) {
      return null;
    }

    var user = new User()
        .setUserName(input.getUsername())
        .setEmail(input.getEmail())
        .setPassword(passwordEncoder.encode(input.getPassword()))
        .setRole(optionalRole.get());

    return userRepository.save(user);
  }

  public UserProfileDTO getUserProfile(Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    List<Post> posts = user != null ? user.getPosts() : new ArrayList<>();
    List<Product> products = user != null ? user.getProducts() : new ArrayList<>();
    return new UserProfileDTO(user, posts, products);
  }

  public List<Address> findAddressesByRole(RoleEnum roleEnum) {
    List<User> users = userRepository.findByRoleName(roleEnum);
    List<Address> addresses = new ArrayList<>();

    for (User user : users) {
      addresses.addAll(user.getAddresses());
    }

    return addresses;
  }

}
