package com.project.pet.controller;

import com.project.pet.models.Image;
import com.project.pet.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/auth")
public class ImageController {

  private final ImageService imageService;

  @Value("${file.upload.dir}")
  private String uploadDir;

  public ImageController(ImageService imageService) {
    this.imageService = imageService;
  }

  @GetMapping("/url")
  public ResponseEntity<byte[]> getImage(@PathVariable String imageUrl) throws IOException {
    // Đọc dữ liệu từ tệp hình ảnh
    Path imagePath = Paths.get(uploadDir + imageUrl);
    byte[] imageData = Files.readAllBytes(imagePath);

    // Trả về dữ liệu hình ảnh trong phản hồi HTTP
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_JPEG); // hoặc MediaType.IMAGE_PNG nếu là hình PNG
    return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
  }

  @GetMapping("/{imageName}")
  public ResponseEntity<byte[]> getImageByName(@PathVariable String imageName) {
    Image image = imageService.getImageByName(imageName);
    if (image != null) {
      try {
        Path imagePath = Paths.get(image.getImageUrl());
        byte[] imageData = Files.readAllBytes(imagePath);
        // Trả về dữ liệu hình ảnh trong ResponseEntity
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG) // hoặc MediaType.IMAGE_PNG tùy vào định dạng ảnh
            .body(imageData);
      } catch (IOException e) {
        // Xử lý lỗi khi không thể đọc dữ liệu hình ảnh
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    } else {
      // Trả về lỗi 404 Not Found nếu không tìm thấy hình ảnh
      return ResponseEntity.notFound().build();
    }
  }
}
