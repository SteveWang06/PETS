package com.project.pet.repository;

import com.project.pet.models.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
}
