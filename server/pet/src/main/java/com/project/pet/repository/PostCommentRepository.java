package com.project.pet.repository;

import com.project.pet.models.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
  @Query("SELECT p.userId.id FROM PostComment p WHERE p.id = :id")
  Long findUserIdById(@Param("id") Long id);
}
