package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.Role;
import com.project.pet.models.RoleEnum;
import com.project.pet.models.User;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class AuthServiceImpl implements AuthService{
  @Autowired
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
  }

  @Override
  public User createUser(SignupDTO input) {
    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

    if (optionalRole.isEmpty()) {
      return null;
    }

    var user = new User()
        .setFullName(input.getUsername())
        .setEmail(input.getEmail())
        .setPassword(passwordEncoder.encode(input.getPassword()))
        .setRole(optionalRole.get());
    return userRepository.save(user);

  }

  public User authenticate(LoginDto input) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            input.getEmail(),
            input.getPassword()
        )
    );
    return userRepository.findByEmail(input.getEmail()).orElseThrow();
  }

  public List<User> allUsers() {
    List<User> users = new ArrayList<>();
    userRepository.findAll().forEach(users::add);
    return users;
  }

}




















