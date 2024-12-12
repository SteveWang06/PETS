package com.project.pet.services;

import com.project.pet.dto.LoginDto;
import com.project.pet.dto.SignupDTO;
import com.project.pet.dto.UserDTO;
import com.project.pet.models.*;
import com.project.pet.repository.PendingUserRepository;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
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
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class AuthServiceImpl implements AuthService{
  @Autowired
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;

  @Autowired
  private PendingUserRepository pendingUserRepository;
  @Autowired
  private EmailService emailService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  @Value("${avatar.upload.dir}")
  private String uploadDir;

  @Value("${default.avatar.path}")
  private String defaultAvatarPath;


  public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, @Lazy AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
  }


//  public User createUser(String username, String email, String password, MultipartFile image) throws IOException {
//    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);
//
//    if (optionalRole.isEmpty()) {
//      return null;
//    }
//
//    ImageInfo avatarUrl = saveImage(image);
//    if (avatarUrl == null) {
//      return null;
//    }
//
//    Image savedImage = new Image();
//    savedImage.setImageUrl(avatarUrl.getUniqueFileName());
//    savedImage.setImagePath(String.valueOf(avatarUrl.getFilePath()));
//    User user = new User();
//    user.setUserName(username);
//    user.setEmail(email);
//    user.setAvatar(savedImage);
//    user.setPassword(passwordEncoder.encode(password)); // Encode the provided password
//    user.setRole(optionalRole.get());
//    return userRepository.save(user);
//
//  }

  public User createUser(String email, String otp) throws IOException {
    // Tìm vai trò USER trong cơ sở dữ liệu
    Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);

    if (optionalRole.isEmpty()) {
      return null; // Không tìm thấy vai trò
    }

    PendingUser pendingUser = pendingUserRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Email does not exist or is not registered."));

    // Kiểm tra OTP
    if (!pendingUser.getOtp().equals(otp)) {
      throw new RuntimeException("Invalid OTP.");
    }

    // Kiểm tra thời gian hết hạn
    if (pendingUser.getOtpExpiration().isBefore(LocalDateTime.now())) {
      throw new RuntimeException("OTP has expired.");
    }

    // Kiểm tra ảnh mặc định
    if (defaultAvatarPath == null || !Files.exists(Paths.get(defaultAvatarPath))) {
      throw new IllegalArgumentException("Default avatar image not found at path: " + defaultAvatarPath);
    }

    // Lưu ảnh mặc định như một ảnh mới
    Path defaultImagePath = Paths.get(defaultAvatarPath);
    String uniqueFileName = UUID.randomUUID().toString() + "_" + defaultImagePath.getFileName().toString();
    Path newImagePath = Paths.get(uploadDir).resolve(uniqueFileName);

    Files.copy(defaultImagePath, newImagePath, StandardCopyOption.REPLACE_EXISTING);

    // Tạo đối tượng Image cho ảnh đã lưu
    Image savedImage = new Image();
    savedImage.setImageUrl(uniqueFileName);
    savedImage.setImagePath(newImagePath.toString());

    // Tạo đối tượng User
//    User user = new User();
//    user.setUserName(username);
//    user.setEmail(email);
//    user.setAvatar(savedImage);
//    user.setPassword(passwordEncoder.encode(password)); // Mã hóa mật khẩu
//    user.setRole(optionalRole.get());
//
//    // Lưu User vào cơ sở dữ liệu
//    return userRepository.save(user);

    // Tạo User chính thức
    User user = new User();
    user.setUserName(pendingUser.getUsername());
    user.setEmail(pendingUser.getEmail());
    user.setPassword(pendingUser.getPassword()); // Mật khẩu đã mã hóa
    user.setRole(optionalRole.get()); // Vai trò mặc định là USER
    user.setAvatar(savedImage);
    // Lưu User vào cơ sở dữ liệu
    userRepository.save(user);

    // Xóa thông tin khỏi PendingUser
    pendingUserRepository.delete(pendingUser);

    return user;
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

  private String generateOTP() {
    return String.valueOf((int) (Math.random() * 900000) + 100000); // Tạo OTP 6 chữ số
  }

  public void sendOtp(String username, String email, String password) {
    // Kiểm tra email đã tồn tại
    if (userRepository.findByEmail(email).isPresent()) {
      throw new RuntimeException("Email đã được sử dụng.");
    }

    // Mã hóa mật khẩu
    String encodedPassword = passwordEncoder.encode(password);

    // Sinh OTP và thời gian hết hạn
    String otp = generateOTP();
    LocalDateTime expiration = LocalDateTime.now().plusMinutes(5);

    // Lưu thông tin tạm thời
    PendingUser pendingUser = new PendingUser();
    pendingUser.setUsername(username);
    pendingUser.setEmail(email);
    pendingUser.setPassword(encodedPassword);
    pendingUser.setOtp(otp);
    pendingUser.setOtpExpiration(expiration);

    pendingUserRepository.save(pendingUser);

    // Gửi email
    String subject = "Authenticate OTP";
    String body = "Your OTP is: " + otp + ". OTP code valid for 5 minutes.";
    emailService.sendEmail(email, subject, body);
  }

  @Transactional
  public User saveUserIfNotExists(String name, String email, Role role) {
    // Kiểm tra xem user đã tồn tại hay chưa
    User existingUser = userRepository.findByEmail(email).orElse(null);

    if (existingUser == null) {
      // Nếu chưa tồn tại, tạo user mới
      User newUser = new User();
      newUser.setUserName(name);
      newUser.setEmail(email);
      newUser.setRole(role);

      // Lưu user vào database
      userRepository.save(newUser);

      return newUser; // Trả về user mới tạo
    }

    return existingUser; // Nếu đã tồn tại, trả về user hiện tại
  }


}




















