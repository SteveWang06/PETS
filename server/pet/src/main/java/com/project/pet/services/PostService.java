package com.project.pet.services;

import com.project.pet.dto.PostDTO;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface PostService {

  public Long createPost(String caption, MultipartFile[] images, Long userId) throws IOException;
  public Post getPostById(Long postId);
  public List<PostDTO> getAllPost();
  public void updatePost(Post updatedPost);
  public void deletePost(Long id);

  public void addComment(PostComment comment) ;


}
