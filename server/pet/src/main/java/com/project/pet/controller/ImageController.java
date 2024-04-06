package com.project.pet.controller;


import com.project.pet.models.FileData;
import com.project.pet.models.Post;
import com.project.pet.payload.response.MessageResponse;
import com.project.pet.payload.response.ResponseFile;
import com.project.pet.services.FilesStorageService;
import com.project.pet.services.PostServiceImpl;
//import com.project.pet.services.StorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/auth")
public class ImageController {


  @Autowired
  FilesStorageService storageService;

  @PostMapping("/image")
  public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("image")MultipartFile file) throws IOException {
    String uploadImage = storageService.uploadImageToFileSystem(file);
    return ResponseEntity.status(HttpStatus.OK)
        .body(uploadImage);
  }

  @GetMapping("/image/{fileName}")
  public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
    byte[] imageData=storageService.downloadImageFromFileSystem(fileName);
    return ResponseEntity.status(HttpStatus.OK)
        .contentType(MediaType.valueOf("image/png"))
        .body(imageData);

  }
}
