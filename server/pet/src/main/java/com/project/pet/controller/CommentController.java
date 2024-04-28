package com.project.pet.controller;


import com.project.pet.dto.CommentDTO;
import com.project.pet.models.PostComment;
import com.project.pet.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("api/post/comment")
public class CommentController {

  @Autowired
  private CommentService commentService;

  @PostMapping("/{postId}/create")
  public ResponseEntity<PostComment> createComment(@PathVariable Long postId, @RequestBody CommentDTO commentDTO) {
    // Kiểm tra xem postId có tồn tại không
    if (postId == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // Kiểm tra xem commentDTO có các thông tin cần thiết không
    if (commentDTO.getAuthor() == null || commentDTO.getContent() == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // Tạo mới đối tượng PostComment từ CommentDTO
    PostComment comment = new PostComment();
    comment.setPostId(postId);
    comment.setAuthor(commentDTO.getAuthor());
    comment.setContent(commentDTO.getContent());
    // Set thời gian uploadAt từ local
    comment.setUploadAt(new Date());

    PostComment createdComment = commentService.createComment(comment);
    return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
  }

  @GetMapping("/all")
  public ResponseEntity<List<PostComment>> getAllComments() {
    List<PostComment> comments = commentService.getAllComments();
    return ResponseEntity.ok(comments);
  }

  @PutMapping("/{commentId}")
  public ResponseEntity<PostComment> updateComment(@PathVariable Long commentId, @RequestBody CommentDTO updatedCommentDTO) {
    PostComment updatedComment = convertToComment(updatedCommentDTO);

    PostComment result = commentService.updateComment(commentId, updatedComment);

    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.noContent().build();
  }

  private PostComment convertToComment(CommentDTO commentDTO) {
    PostComment comment = new PostComment();
    Date currentTime = new Date();
    comment.setPostId(commentDTO.getPostId());
    comment.setAuthor(commentDTO.getAuthor());
    comment.setUploadAt(currentTime);
    comment.setContent(commentDTO.getContent());
    return comment;
  }

}
