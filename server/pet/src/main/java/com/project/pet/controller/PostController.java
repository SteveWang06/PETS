package com.project.pet.controller;

import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.payload.response.ResponseHandler;
import com.project.pet.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("api/post")
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
  public List<Post> getAllPost() {
    return postService.getAllPost();
  }

  @PostMapping("/")
  public String createPost(@RequestBody Post post) {
    postService.createPost(post);
    return "Created Successfully";
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
  @PostMapping("/{postId}/comment")
  public ResponseEntity<String> addCommentToPost(@PathVariable Long postId, @RequestBody PostComment comment) {
    try {
        Post post = postService.getPostById(postId);
        post.getComments().add(comment);
        postService.updatePost(post); 
        return ResponseEntity.ok("Comment added successfully");
    } catch (NoSuchElementException e) {
        return ResponseEntity.notFound().build();
    }
}
}
