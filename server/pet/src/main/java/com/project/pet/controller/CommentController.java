package com.project.pet.controller;


import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.models.User;
import com.project.pet.repository.PostRepository;
import com.project.pet.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/post/comment")
public class CommentController {

  private final CommentService commentService;

  @Autowired
  private PostRepository postRepository;
  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("{postId}/create")
  public ResponseEntity<PostComment> createComment(@PathVariable Long postId, @RequestParam User userId, @RequestParam String content) {
    Post post = postRepository.findById(postId).orElse(null);

    // Kiểm tra xem post có tồn tại không
    if (userId == null || content == null) {
      return ResponseEntity.badRequest().build();
    }

    PostComment comment = commentService.createComment(postId, userId, content);
    return new ResponseEntity<>(comment, HttpStatus.CREATED);
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<PostComment> updateComment(@PathVariable Long commentId, @RequestParam Long userId, @RequestParam String content) {
    PostComment updated = commentService.updateComment(commentId, userId, content);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.ok("Comment deleted successfully");
  }


}