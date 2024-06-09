package com.project.pet.controller;

import com.project.pet.dto.PostDTO;
import com.project.pet.models.Post;
import com.project.pet.repository.PostRepository;
import com.project.pet.services.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "*")
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

  @Operation(summary = "Get a post by ID", description = "Retrieve a post by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Found the post"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @GetMapping("/{postId}")
  public ResponseEntity<PostDTO> getPostById(
      @Parameter(description = "ID of the post to be retrieved") @PathVariable Long postId) {
    PostDTO postDTO = postService.getPostById(postId);
    if (postDTO != null) {
      return ResponseEntity.ok().body(postDTO);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @Operation(summary = "Get all posts", description = "Retrieve all posts")
  @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
  @GetMapping("/")
  public List<PostDTO> getAllPost() {
    return postService.getAllPost();
  }

  @Operation(summary = "Create a new post", description = "Create a new post with the provided details")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post created successfully"),
      @ApiResponse(responseCode = "400", description = "Error creating post")
  })
  @PostMapping("/")
  public ResponseEntity<?> createPost(
      @Parameter(description = "Caption of the post") @RequestParam("caption") String caption,
      @Parameter(description = "Images for the post") @RequestParam("images") MultipartFile[] images,
      @Parameter(description = "User ID of the post creator") @RequestParam("userId") Long userId,
      @Parameter(description = "Kind of the post") @RequestParam("kind") String kind) {
    try {
      Long postId = postService.createPost(caption, images, userId, kind);
      return ResponseEntity.ok("Post created successfully with ID: " + postId);
    } catch (IOException e) {
      return ResponseEntity.badRequest().body("Error creating post: " + e.getMessage());
    }
  }

  @Operation(summary = "Update a post", description = "Update the details of an existing post")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post updated successfully"),
      @ApiResponse(responseCode = "400", description = "Error updating post")
  })
  @PutMapping("/{postId}")
  public ResponseEntity<?> updatePost(
      @Parameter(description = "ID of the post to be updated") @PathVariable Long postId,
      @Parameter(description = "Updated caption of the post") @RequestParam("caption") String caption,
      @Parameter(description = "Updated images for the post") @RequestParam("images") MultipartFile[] images,
      @Parameter(description = "Updated kind of the post") @RequestParam("kind") String kind) {
    try {
      Post updatedPost = postService.updatePost(postId, caption, images, kind);
      return ResponseEntity.ok("The post with id " + postId + " has been updated successfully");
    } catch (IOException e) {
      return ResponseEntity.badRequest().body("Error updating post: " + e.getMessage());
    }
  }

  @Operation(summary = "Delete a post", description = "Delete an existing post by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post deleted successfully"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePost(
      @Parameter(description = "ID of the post to be deleted") @PathVariable Long id) {
    try {
      postService.deletePost(id);
      return ResponseEntity.ok("Post deleted successfully");
    } catch (NoSuchElementException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @Operation(summary = "Like a post", description = "Like an existing post by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post liked successfully"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @PostMapping("/{postId}/like")
  public ResponseEntity<?> likePost(
      @Parameter(description = "ID of the post to be liked") @PathVariable Long postId) {
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

  @Operation(summary = "Get likes of a post", description = "Retrieve the number of likes of a post by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved number of likes"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @GetMapping("/{postId}/likes")
  public ResponseEntity<?> getLikes(
      @Parameter(description = "ID of the post to retrieve likes for") @PathVariable Long postId) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (optionalPost.isPresent()) {
      Post post = optionalPost.get();
      return ResponseEntity.ok(post.getPostLike());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
    }
  }

  @Operation(summary = "Unlike a post", description = "Unlike an existing post by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post unliked successfully"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @DeleteMapping("/{postId}/like")
  public ResponseEntity<?> unlikePost(
      @Parameter(description = "ID of the post to be unliked") @PathVariable Long postId) {
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
