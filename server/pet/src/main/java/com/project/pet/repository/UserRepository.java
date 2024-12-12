package com.project.pet.repository;

import com.project.pet.models.Role;
import com.project.pet.models.RoleEnum;
import com.project.pet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

  Optional<User> findByEmail(String email);

  Boolean existsByEmail(String email);
  List<User> findByRoleName(RoleEnum roleEnum);
}
