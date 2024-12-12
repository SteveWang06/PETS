package com.project.pet.repository;

import com.project.pet.models.RoleEnum;
import com.project.pet.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {

  Optional<Role> findByName(RoleEnum name);

}
