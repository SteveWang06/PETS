package com.project.pet.repository;

import com.project.pet.models.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

public void updatePost(Post updatedPost);

public interface PostImageRepository extends JpaRepository<PostImage, Long> {
}
