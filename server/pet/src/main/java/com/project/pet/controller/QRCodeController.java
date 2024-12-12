package com.project.pet.controller;

import com.project.pet.services.QRCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth/qr")
public class QRCodeController {

  @Autowired
  private QRCodeService qrCodeService;

  @Operation(summary = "Get QR Code", description = "Generate and retrieve QR code image for a user profile")
  @ApiResponse(responseCode = "200", description = "QR code image generated successfully")
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
