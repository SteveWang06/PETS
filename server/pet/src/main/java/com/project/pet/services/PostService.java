package com.project.pet.services;

import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {

  public String createPost(Post post);
  public Post getPostById(Long postId);
  public List<Post> getAllPost();
  public void updatePost(Post updatedPost);
  public void deletePost(Long id);

  public void addComment(PostComment comment) ;


}
