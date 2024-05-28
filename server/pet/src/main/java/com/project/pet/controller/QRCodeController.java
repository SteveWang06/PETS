package com.project.pet.controller;

import com.project.pet.services.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth/qr")
public class QRCodeController {

  @Autowired
  private QRCodeService qrCodeService;

  @GetMapping("/{userId}")
  public ResponseEntity<byte[]> getQRCode(@PathVariable Long userId) {
    try {
      String profileUrl = "http://localhost:8080/api/auth/user/" + userId;
      BufferedImage qrCodeImage = qrCodeService.generateQRCodeImage(profileUrl);

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      ImageIO.write(qrCodeImage, "PNG", baos);
      byte[] imageBytes = baos.toByteArray();

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.IMAGE_PNG);

      return ResponseEntity.ok().headers(headers).body(imageBytes);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(null);
    }
  }
}

