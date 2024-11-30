package com.project.pet.services;

import com.project.pet.models.Like;
import com.project.pet.models.Post;
import com.project.pet.models.User;
import com.project.pet.repository.LikeRepository;
import com.project.pet.repository.PostRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

  @Autowired
  private LikeRepository likeRepository;

  @Autowired
  private PostRepository postRepository;  // Giả sử bạn có PostRepository để tìm bài viết

  @Autowired
  private UserRepository userRepository;  // Giả sử bạn có UserRepository để tìm người dùng

  public boolean isLiked(User user, Post post) {
    // Kiểm tra xem bài viết và người dùng có tồn tại trong cơ sở dữ liệu không
    if (postRepository.existsById(post.getId()) && userRepository.existsById(user.getId())) {
      Like like = likeRepository.findByUserAndPost(user, post);
      return like != null && like.isLiked(); // Kiểm tra trạng thái like
    }
    return false;
  }

  public void toggleLike(User user, Post post) {
    // Kiểm tra xem bài viết và người dùng có tồn tại trong cơ sở dữ liệu không
    if (postRepository.existsById(post.getId()) && userRepository.existsById(user.getId())) {
      Like like = likeRepository.findByUserAndPost(user, post);
      if (like == null) {
        like = new Like();
        like.setUser(user);
        like.setPost(post);
        like.setLiked(true);
        likeRepository.save(like); // Lưu trạng thái like mới
      } else {
        like.setLiked(!like.isLiked());
        likeRepository.save(like); // Cập nhật trạng thái like
      }
    } else {
      throw new IllegalArgumentException("User or Post does not exist");
    }
  }

}
