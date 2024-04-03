package com.project.pet.seeder;

import com.project.pet.dto.SignupDTO;
import com.project.pet.models.Role;
import com.project.pet.models.RoleEnum;
import com.project.pet.models.User;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
  private final RoleRepository roleRepository;
  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;


  public AdminSeeder(
      RoleRepository roleRepository,
      UserRepository  userRepository,
      PasswordEncoder passwordEncoder
  ) {
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    this.createSuperAdministrator();
  }

  private void createSuperAdministrator() {
    SignupDTO userDto = new SignupDTO();
    userDto.setUsername("Super Admin");
    userDto.setEmail("superAdmin@gmail.com");
    userDto.setPassword("12345678");

    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.SUPER_ADMIN);
    Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

    if (optionalRole.isEmpty() || optionalUser.isPresent()) {
      return;
    }

    var user = new User()
        .setUserName(userDto.getUsername())
        .setEmail(userDto.getEmail())
        .setPassword(passwordEncoder.encode(userDto.getPassword()))
        .setRole(optionalRole.get());

    userRepository.save(user);
  }
}
