package com.project.pet.services;


import com.project.pet.dto.CommentDTO;
import com.project.pet.models.PostComment;
import com.project.pet.models.User;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface CommentService {
  PostComment createComment(Long postId, User userId, String content);
  PostComment updateComment(Long commentId, String content);
  void deleteComment(Long commentId);




//  List<PostComment> getAllComments();
//  Optional<PostComment> getCommentById(Long commentId);
//  PostComment updateComment(Long commentId, PostComment updatedComment);
//  void deleteComment(Long commentId);
}
