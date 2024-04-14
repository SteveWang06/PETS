package com.project.pet.repository;

import com.project.pet.models.PostKind;
import com.project.pet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostKindRepository extends JpaRepository<PostKind, Integer> {
}
