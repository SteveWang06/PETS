package com.project.pet.services;


import com.project.pet.dto.CommentDTO;
import com.project.pet.models.PostComment;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface CommentService {
  PostComment createComment(PostComment comment);
  List<PostComment> getAllComments();
  Optional<PostComment> getCommentById(Long commentId);
  PostComment updateComment(Long commentId, PostComment updatedComment);
  void deleteComment(Long commentId);
}

