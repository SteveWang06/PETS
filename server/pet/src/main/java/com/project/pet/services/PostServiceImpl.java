package com.project.pet.services;

import com.project.pet.exception.PostNotFoundException;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.models.PostImage;
import com.project.pet.repository.PostImageRepository;
import com.project.pet.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostServiceImpl implements PostService{

  @Autowired
  private PostRepository postRepository;
  private PostImageRepository postImageRepository;

  public PostServiceImpl(PostRepository postRepository,
                         PostImageRepository postImageRepository) {
    this.postRepository = postRepository;
    this.postImageRepository = postImageRepository;
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
    return postRepository.findById(postId).get();

  }

  @Override
  public void updatePost(Post updatedPost) {
    postRepository.save(updatedPost);
  }
  @Override
  public void deletePost(Long id) {
    postRepository.deleteById(id);
  }
   @Override
    public void addComment(PostComment comment) {

    }
}

