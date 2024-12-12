package com.project.pet.services;

import com.project.pet.models.PostKind;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface PostKindService {
  public List<PostKind> getAllKinds();
  public PostKind createKind(String kind);
  public  void deleteKind (Integer kindId);
}
