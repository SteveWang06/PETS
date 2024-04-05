package com.project.pet.services;

import com.project.pet.models.Image;
import com.project.pet.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

@Service
public class ImageService {

  @Autowired
  private ImageRepository imageRepository;

  public Image getImageByName(String imageName) {
    return imageRepository.findByName(imageName);
  }
  public Image getImageByUrl(String imageUrl) {
    return imageRepository.findByImageUrl(imageUrl);
  }
}
