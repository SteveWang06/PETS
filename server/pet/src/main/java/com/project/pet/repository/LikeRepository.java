package com.project.pet.repository;

import com.project.pet.models.Like;
import com.project.pet.models.Post;
import com.project.pet.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
  Like findByUserAndPost(User user, Post post); // Tìm kiếm trạng thái like của người dùng với bài viết
}

