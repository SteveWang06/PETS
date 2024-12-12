package com.project.pet.controller;

import com.project.pet.models.PostComment;
import com.project.pet.models.User;
import com.project.pet.services.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/post/comment")
public class CommentController {

  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @Operation(summary = "Create comment", description = "Create a new comment for a post")
  @ApiResponse(responseCode = "201", description = "Comment created successfully")
  @PostMapping("{postId}/create")
  public ResponseEntity<PostComment> createComment(@PathVariable Long postId, @RequestParam User userId, @RequestParam String content) {
    PostComment comment = commentService.createComment(postId, userId, content);
    return new ResponseEntity<>(comment, HttpStatus.CREATED);
  }

  @Operation(summary = "Update comment", description = "Update an existing comment")
  @ApiResponse(responseCode = "200", description = "Comment updated successfully")
  @PutMapping("/{commentId}")
  public ResponseEntity<PostComment> updateComment(@PathVariable Long commentId, @RequestParam String content) {
    PostComment updated = commentService.updateComment(commentId, content);
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete comment", description = "Delete a comment by comment ID")
  @ApiResponse(responseCode = "200", description = "Comment deleted successfully")
  @DeleteMapping("/{commentId}")
  public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.ok("Comment deleted successfully");
  }
}
