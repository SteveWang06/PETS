package com.project.pet.repository;

import com.project.pet.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  @Query("SELECT p FROM Post p JOIN FETCH p.author")
  List<Post> findAllWithAuthor();
  @Query("SELECT p FROM Post p JOIN FETCH p.author WHERE p.id = :postId")
  Optional<Post> findById(@Param("postId") Long postId);
}
