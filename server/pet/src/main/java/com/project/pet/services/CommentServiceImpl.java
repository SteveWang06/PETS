package com.project.pet.services;


import com.project.pet.dto.CommentRequest;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.repository.PostCommentRepository;
import com.project.pet.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService{
  private PostRepository postRepository;
  private PostCommentRepository postCommentRepository;

  public CommentServiceImpl(PostRepository postRepository, PostCommentRepository postCommentRepository) {
    this.postRepository = postRepository;
    this.postCommentRepository = postCommentRepository;
  }





  public void addCommentToPost(Long postId, CommentRequest commentRequest) {
    Optional<Post> optionalPost = postRepository.findById(postId);
    if (!optionalPost.isPresent()) {
      throw new EntityNotFoundException("Post not found with ID: " + postId);
    }

    Post post = optionalPost.get();
    PostComment postComment = new PostComment();
    postComment.setPost(post);
    postComment.setContent(commentRequest.getContent());
    postCommentRepository.save(postComment);

    //insertDataFromCommentToPostAndComment(postId, postComment.getId());


  }

  public void insertDataFromCommentToPostAndComment(Long postId, Long commentId) {
    Optional<PostComment> commentOptional = postCommentRepository.findById(commentId);
    Optional<Post> postOptional = postRepository.findById(postId);

    if (commentOptional.isPresent() && postOptional.isPresent()) {
      PostComment comment = commentOptional.get();
      Post post = postOptional.get();

      // Thêm comment vào danh sách comments của post
      post.getComments().add(comment);

      // Lưu lại post để JPA tự động quản lý insert dữ liệu vào bảng postAndComment
      postRepository.save(post);
    } else {
      throw new EntityNotFoundException("post id not found");
    }
  }
}
