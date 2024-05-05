package com.project.pet.controller;

import com.project.pet.dto.PostDTO;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
//import com.project.pet.payload.response.ResponseHandler;
import com.project.pet.repository.PostRepository;
import com.project.pet.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("api/auth/post")

public class PostController {

  @Autowired
  private PostService postService;

  @Autowired
  private PostRepository postRepository;

  public PostController(PostService postService) {
    this.postService = postService;
  }


  @GetMapping("/{postId}")
  public ResponseEntity<PostDTO> getPostById(@PathVariable Long postId) {
    PostDTO postDTO = postService.getPostById(postId);
    if (postDTO != null) {
      return ResponseEntity.ok().body(postDTO);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/")
  public List<PostDTO> getAllPost() {
    return postService.getAllPost();
  }

  @PostMapping("/")

  public ResponseEntity<?> createPost(@RequestParam("caption") String caption,
                                      @RequestParam("images") MultipartFile[] images,
                                      @RequestParam("userId") Long userId,
                                      @RequestParam("kind") String kind) {
    try {
      Long postId = postService.createPost(caption, images, userId, kind);
      return ResponseEntity.ok("Post created successfully with ID: " + postId);
    } catch (IOException e) {
      return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
    }

  }

  @PutMapping("/{postId}")
  public ResponseEntity<?> updatePost(@PathVariable Long postId,
                                      @RequestParam("caption") String caption,
                                      @RequestParam("images") MultipartFile[] images,
                                      @RequestParam("kind") String kind) {
    try {
      // Gọi phương thức updatePost từ service để cập nhật bài post
      Post updatedPost = postService.updatePost(postId, caption, images, kind);
      // Trả về bài post đã được cập nhật
      return ResponseEntity.ok("The post with id " +  postId + " has been updated successfully");
    } catch (IOException e) {
      return ResponseEntity.badRequest().body("Error updating post: " + e.getMessage());
    }
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePost(@PathVariable Long id) {
    try {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted successfully");
    } catch (NoSuchElementException e) {
        return ResponseEntity.notFound().build();
    }
  }


  @PostMapping("/{postId}/like")
  public ResponseEntity<?> likePost(@PathVariable Long postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isPresent()) {
      Post post = optionalPost.get();
      post.setPostLike(post.getPostLike() + 1);
      postRepository.save(post);
      return ResponseEntity.ok("Liked post with ID: " + postId);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

  @GetMapping("/{postId}/likes")
  public ResponseEntity<?> getLikes(@PathVariable Long postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isPresent()) {
      Post post = optionalPost.get();
      return ResponseEntity.ok(post.getPostLike());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

  @DeleteMapping("/{postId}/like")
  public ResponseEntity<?> unlikePost(@PathVariable Long postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isPresent()) {
      Post post = optionalPost.get();
      if (post.getPostLike() > 0) {
        post.setPostLike(post.getPostLike() - 1);
        postRepository.save(post);
      }
      return ResponseEntity.ok("Unliked post with ID: " + postId);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

}
