package com.project.pet.services;


import com.project.pet.exception.NotFoundException;
import com.project.pet.exception.UnauthorizedException;
import com.project.pet.models.PostComment;
import com.project.pet.models.User;
import com.project.pet.repository.PostCommentRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  private PostCommentRepository postCommentRepository;


  public PostComment createComment(Long postId, User userId, String content) {
    PostComment comment = new PostComment();
    comment.setPostId(postId);
    comment.setUserId(userId);
    comment.setContent(content);
    comment.setUploadAt(new Date());

    return postCommentRepository.save(comment);
  }

  @Override
  public PostComment updateComment(Long commentId, Long userId, String content) {


    Long currentUserId = getUserIdByCommentId(commentId);

    if (!userId.equals(currentUserId)) {
      throw new UnauthorizedException("User is not authorized to update this comment");
    }
    System.out.println("userId " + userId);
    System.out.println("currentUserId " + currentUserId);



    Optional<PostComment> optionalComment = postCommentRepository.findById(commentId);
    if (optionalComment.isPresent()) {
      PostComment comment = optionalComment.get();

      comment.setContent(content);
      comment.setUploadAt(new Date());

      // Lưu comment đã cập nhật vào cơ sở dữ liệu
      return postCommentRepository.save(comment);
    } else {
      // Nếu comment không tồn tại, bạn có thể throw một exception hoặc xử lý theo cách khác tùy thuộc vào yêu cầu của bạn.
      throw new NotFoundException("Comment not found with ID: " + commentId);
    }


  }

  public Long getUserIdByCommentId(Long commentId) {
    return postCommentRepository.findUserIdById(commentId);
  }

  @Override
  public void deleteComment(Long commentId) {
    PostComment existingComment = postCommentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));

    postCommentRepository.delete(existingComment);
  }
}
