package com.project.pet.controller;

import com.project.pet.models.Post;
import com.project.pet.services.PostService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("post")
public class PostController {

  private PostService postService;

  @RequestMapping(method = RequestMethod.GET)
  public List<Post> findAll() {
    return (List<Post>) postService.findALL();
  }

}
