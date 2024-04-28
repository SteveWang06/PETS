package com.project.pet.services;


import com.project.pet.dto.CommentDTO;
import com.project.pet.exception.NotFoundException;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.repository.PostCommentRepository;
import com.project.pet.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  private PostCommentRepository commentRepository;

  @Override
  public PostComment createComment(PostComment comment) {

    return commentRepository.save(comment);
  }

  @Override
  public List<PostComment> getAllComments() {
    return commentRepository.findAll();
  }

  @Override
  public Optional<PostComment> getCommentById(Long commentId) {
    return commentRepository.findById(commentId);
  }

  @Override
  public PostComment updateComment(Long commentId, PostComment updatedComment) {
    Optional<PostComment> optionalComment = commentRepository.findById(commentId);
    if (!optionalComment.isPresent()) {
      // Xử lý trường hợp không tìm thấy comment
      throw new NotFoundException("Comment not found");
    }

    PostComment comment = optionalComment.get();
    // Cập nhật thông tin comment với thông tin mới từ updatedComment
    // Ví dụ:
    comment.setContent(updatedComment.getContent());
    comment.setUploadAt(updatedComment.getUploadAt());

    return commentRepository.save(comment);
  }

  @Override
  public void deleteComment(Long commentId) {
    Optional<PostComment> optionalComment = commentRepository.findById(commentId);
    if (!optionalComment.isPresent()) {
      // Xử lý trường hợp không tìm thấy comment
      throw new NotFoundException("Comment not found");
    }

    commentRepository.deleteById(commentId);
  }
}
