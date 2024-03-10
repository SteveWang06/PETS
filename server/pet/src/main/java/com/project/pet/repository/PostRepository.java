package com.project.pet.repository;

import com.project.pet.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Override
public void updatePost(Post updatedPost) {
    postRepository.save(updatedPost);
}

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
