package com.project.pet.services;

import com.project.pet.models.Post;
import com.project.pet.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostServiceImpl implements PostService{

  @Autowired
  private PostRepository repository;

  @Override
  @Transactional(readOnly = true)
  public List<Post> findALL() {
    return (List<Post>) repository.findAll();
  }


}
