package com.project.pet.controller;

import com.project.pet.dto.PostDTO;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
//import com.project.pet.payload.response.ResponseHandler;
import com.project.pet.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("api/auth/post")

public class PostController {

  @Autowired
  private PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Post> getPostById(@PathVariable Long id) {
    try {
      Post post = postService.getPostById(id);
      return new ResponseEntity<Post>(post, HttpStatus.OK);
    }catch (NoSuchElementException e){
      return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
    }

  }

  @GetMapping("/")
  public List<PostDTO> getAllPost() {
    return postService.getAllPost();
  }

  @PostMapping("/")
//  public String createPost(@RequestBody Post post) {
//    postService.createPost(post);
//    return "Created Successfully";
//
//  }
  public ResponseEntity<?> createPost(@RequestParam("caption") String caption,
                                      @RequestParam("images") MultipartFile[] images,
                                      @RequestParam("userId") Long userId) {
    try {
      Long postId = postService.createPost(caption, images, userId);
      return ResponseEntity.ok("Post created successfully with ID: " + postId);
    } catch (IOException e) {
      return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
    }

  }

  @PutMapping("/{id}")
  public ResponseEntity<String> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
    try {
        Post existingPost = postService.getPostById(id);
        existingPost.setCaption(updatedPost.getCaption());

        postService.updatePost(existingPost);
        return ResponseEntity.ok("Post updated successfully");
    } catch (NoSuchElementException e) {
        return ResponseEntity.notFound().build();
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

}
