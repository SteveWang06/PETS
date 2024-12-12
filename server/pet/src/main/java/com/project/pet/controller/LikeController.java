package com.project.pet.controller;

import com.project.pet.models.Post;
import com.project.pet.models.User;
import com.project.pet.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

  @Autowired
  private LikeService likeService;

  @GetMapping("/check")
  public ResponseEntity<Boolean> checkIfLiked(@RequestParam Long userId, @RequestParam Long postId) {
    User user = new User();  // Tìm người dùng theo userId
    Post post = new Post();  // Tìm bài viết theo postId
    // Bạn cần lấy từ cơ sở dữ liệu, ví dụ:
    user.setId(userId);
    post.setId(postId);

    try {
      boolean isLiked = likeService.isLiked(user, post);
      return ResponseEntity.ok(isLiked);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.ok(false);
    }
  }

  @PostMapping("/toggle")
  public ResponseEntity<String> toggleLike(@RequestParam Long userId, @RequestParam Long postId) {
    User user = new User();  // Tìm người dùng theo userId
    Post post = new Post();  // Tìm bài viết theo postId
    // Bạn cần lấy từ cơ sở dữ liệu, ví dụ:
    user.setId(userId);
    post.setId(postId);

    try {
      likeService.toggleLike(user, post);
      return ResponseEntity.ok("Like toggled successfully");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User or Post not found");
    }
  }
}


