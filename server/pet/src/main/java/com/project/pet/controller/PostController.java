package com.project.pet.controller;

import com.project.pet.models.Post;
import com.project.pet.payload.response.ResponseHandler;
import com.project.pet.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/post")
public class PostController {

  @Autowired
  private PostService postService;

  public PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/{postId}")
  public ResponseEntity<Object> getPostById(@PathVariable("postId") Long postId) {
    return ResponseHandler.responseBuilder("Requested Vendor Details are given here",
        HttpStatus.OK, postService.getPostById(postId));
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

}
