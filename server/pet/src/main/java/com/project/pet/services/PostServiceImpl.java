package com.project.pet.services;

import com.project.pet.exception.PostNotFoundException;
import com.project.pet.models.Post;
import com.project.pet.models.PostComment;
import com.project.pet.repository.PostCommentRepository;
import com.project.pet.repository.PostImageRepository;
import com.project.pet.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{

  @Autowired
  private PostRepository postRepository;
  private PostImageRepository postImageRepository;
  private PostCommentRepository postCommentRepository;

  public PostServiceImpl(PostRepository postRepository,
                         PostImageRepository postImageRepository,
                         PostCommentRepository postCommentRepository) {
    this.postRepository = postRepository;
    this.postImageRepository = postImageRepository;
    this.postCommentRepository = postCommentRepository;
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

  @Override
  public void updatePost(Post updatedPost) {
    postRepository.save(updatedPost);
  }
  @Override
  public void deletePost(Long id) {
    postRepository.deleteById(id);
  }


}
