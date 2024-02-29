package com.project.pet.services;

import com.project.pet.exception.PostNotFoundException;
import com.project.pet.models.Post;
import com.project.pet.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostServiceImpl implements PostService{

  @Autowired
  private PostRepository postRepository;

  public PostServiceImpl(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @Override
  public String createPost(Post post) {
    postRepository.save(post);
    return "Success";
  }

  @Override
  public List<Post> getAllPost() {
    return postRepository.findAll();
  }

  @Override
  public Post getPostById(Long postId) {
    if (postRepository.findById(postId).isEmpty()) throw new PostNotFoundException("Post does not exit");
    return postRepository.findById(postId).get();
  }


}
