package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.*;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;


@Service
public class AuthServiceImpl implements AuthService{
  @Autowired
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  @Value("${avatar.upload.dir}")
  private String uploadDir;
  public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
  }


  public User createUser(String username, String email, String password) throws IOException {
    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

    if (optionalRole.isEmpty()) {
      return null;
    }

//    ImageInfo avatarUrl = saveImage(images);
//    if (avatarUrl == null) {
//      return null;
//    }

    Image savedImage = new Image();
//    savedImage.setImageUrl(avatarUrl.getUniqueFileName());
//    savedImage.setImagePath(String.valueOf(avatarUrl.getFilePath()));
    User user = new User();
    user.setUserName(username);
    user.setEmail(email);
    user.setAvatar(savedImage);
    user.setPassword(passwordEncoder.encode(password)); // Encode the provided password
    user.setRole(optionalRole.get());
    return userRepository.save(user);

  }

  public class ImageInfo {
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
    // Tạo tên duy nhất cho hình ảnh
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    // Tạo đường dẫn đầy đủ của hình ảnh
    Path filePath = Paths.get(uploadDir + uniqueFileName);
    // Lưu trữ hình ảnh vào đường dẫn
    Files.copy(file.getInputStream(), filePath);
    // Trả về thông tin hình ảnh
    return new ImageInfo(uniqueFileName, filePath);
  }

  public User authenticate(LoginDto input) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            input.getEmail(),
            input.getPassword()
        )
    );
    return userRepository.findByEmail(input.getEmail()).orElseThrow();
  }

  public List<User> allUsers() {
    List<User> users = new ArrayList<>();
    userRepository.findAll().forEach(users::add);
    return users;
  }


  public User updateUser(Long id, String username, String email, MultipartFile images, LocalDate birthday, String address) throws IOException {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    ImageInfo avatarUrl = saveImage(images);
    if (avatarUrl == null) {
      return null;
    }

    Image savedImage = new Image();
    savedImage.setImageUrl(avatarUrl.getUniqueFileName());
    savedImage.setImagePath(String.valueOf(avatarUrl.getFilePath()));
    user.setUserName(username);
    user.setEmail(email);
    user.setAvatar(savedImage);
    user.setBirthday(birthday);
    // Cập nhật địa chỉ
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


    return userRepository.save(user);
  }



  public String deleteUser(Long userId) {
    User existingUser = userRepository.findById(userId)
        .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

    userRepository.delete(existingUser);
    return "User deleted";
  }

}




















