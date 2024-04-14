package com.project.pet.services;

import com.project.pet.models.PostKind;
import com.project.pet.models.User;
import com.project.pet.repository.PostKindRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostKindServiceImpl implements PostKindService{

  private PostKindRepository postKindRepository;

  @Autowired
  public PostKindServiceImpl(PostKindRepository postKindRepository) {
    this.postKindRepository = postKindRepository;
  }
  @Override
  public List<PostKind> getAllKinds() {
    List<PostKind> kinds = new ArrayList<>();
    return postKindRepository.findAll();
  }

  @Override
  public PostKind createKind(String kind) {
    PostKind postKind = new PostKind();
    postKind.setKind(kind);
    return postKindRepository.save(postKind);
  }
}
