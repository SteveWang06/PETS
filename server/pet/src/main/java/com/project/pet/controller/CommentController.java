package com.project.pet.controller;


import com.project.pet.dto.CommentRequest;
import com.project.pet.services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/post")
public class CommentController {

  private final CommentService commentService;

  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/{postId}/comments")
  public ResponseEntity<String> addCommentToPost(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
    commentService.addCommentToPost(postId, commentRequest);
    return ResponseEntity.ok("Comment added successfully");
  }
}
