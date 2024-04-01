package com.project.pet.services;


import com.project.pet.dto.CommentRequest;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {

  public void addCommentToPost(Long postId, CommentRequest commentRequest);

}
