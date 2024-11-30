package com.project.pet.services;


import com.project.pet.models.*;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.RoleUpdateRequestRepository;
import com.project.pet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleUpdateRequestService {

  @Autowired
  private RoleUpdateRequestRepository roleUpdateRequestRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Value("${certificate.upload.dir}")
  private String uploadDir;

  public RoleUpdateRequest createRoleUpdateRequest(Long userId, RoleEnum requestedRoleEnum, String address, MultipartFile[] images) throws IOException {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    Role requestedRole = roleRepository.findByName(requestedRoleEnum)
        .orElseThrow(() -> new RuntimeException("Role not found"));
    RoleUpdateRequest request = new RoleUpdateRequest();
    request.setUser(user);
    request.setRequestedRole(requestedRole);
    request.setRequestDate(LocalDateTime.now());
    request.setApproved(false);
    Address userAddress = new Address();
    userAddress.setAddress(address);
    userAddress.setUser(user); // Đặt user cho địa chỉ

    // Kiểm tra nếu người dùng đã có địa chỉ thì cập nhật
    if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
      // Nếu có địa chỉ tồn tại, cập nhật địa chỉ đầu tiên
      Address existingAddress = user.getAddresses().get(0);
      existingAddress.setAddress(address);
    } else {
      // Nếu không có địa chỉ, thêm mới
      user.getAddresses().add(userAddress);
    }


    List<Image> savedImages = saveImages(images, request);
    request.setImages(savedImages);
    return roleUpdateRequestRepository.save(request);
  }


  private List<Image> saveImages(MultipartFile[] images, RoleUpdateRequest request) throws IOException {
    List<Image> savedImages = new ArrayList<>();
    for (MultipartFile image : images) {
      ImageInfo imageInfo = saveImage(image);
      Image savedImage = new Image();
      savedImage.setImageUrl(imageInfo.getUniqueFileName());
      savedImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      savedImage.setRequest(request);
      savedImages.add(savedImage);
    }
    return savedImages;
  }

  public static class ImageInfo {
    private String uniqueFileName;
    private Path filePath;

    public ImageInfo(String uniqueFileName, Path filePath) {
      this.uniqueFileName = uniqueFileName;
      this.filePath = filePath;
    }

    public String getUniqueFileName() {
      return uniqueFileName;
    }

    public Path getFilePath() {
      return filePath;
    }
  }

  private ImageInfo saveImage(MultipartFile file) throws IOException {
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadDir + uniqueFileName);
    Files.copy(file.getInputStream(), filePath);
    return new ImageInfo(uniqueFileName, filePath);
  }

  public List<RoleUpdateRequest> getPendingRequests() {
    return roleUpdateRequestRepository.findByApprovedFalse();
  }

  public RoleUpdateRequest approveRequest(Long requestId) {
    RoleUpdateRequest request = roleUpdateRequestRepository.findById(requestId)
        .orElseThrow(() -> new RuntimeException("Request not found"));
    request.setApproved(true);
    Role requestedRole = request.getRequestedRole();
    User user = request.getUser();
    user.setRole(requestedRole);
    userRepository.save(user);
    return roleUpdateRequestRepository.save(request);
  }
}
