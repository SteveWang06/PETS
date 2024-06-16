package com.project.pet.services;

import com.project.pet.models.Image;
import com.project.pet.models.Product;
import com.project.pet.models.User;
import com.project.pet.repository.ProductRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;
  @Autowired
  private UserRepository userRepository;

  @Value("${product.upload.dir}")
  private String uploadDir;



  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Optional<Product> getProductById(Long id) {
    return productRepository.findById(id);
  }

  public Product createProduct(String name, String type, Integer price, String description, MultipartFile[] imageUrl, Long userId) throws IOException {
    Product product = new Product();
    product.setName(name);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);

    List<Image> savedImages = new ArrayList<>();
    for (MultipartFile image : imageUrl) {

      ImageInfo imageInfo = saveImage(image);
      Image savedImage = new Image();

      savedImage.setImageUrl(imageInfo.getUniqueFileName());
      savedImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      savedImage.setProduct(product);
      savedImages.add(savedImage);
    }
    product.setImageUrl(savedImages);

    User user = userRepository.findById(userId).orElse(null);
    product.setUser(user);



    return productRepository.save(product);
  }

  public Product updateProduct(Long id, String name, String type, Integer price, String description, MultipartFile[] imageUrl) throws IOException {
    Product product = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
    List<Image> oldImages = product.getImageUrl();
    product.setName(name);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);


    List<Image> newImagesList = new ArrayList<>();
    for (MultipartFile image : imageUrl) {
      ImageInfo imageInfo = saveImage(image);
      Image newImage = new Image();
      newImage.setImageUrl(imageInfo.getUniqueFileName());
      newImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      newImage.setProduct(product);
      newImagesList.add(newImage);
    }


    product.getImageUrl().clear();
    product.getImageUrl().addAll(newImagesList);
    return productRepository.save(product);
  }

  public boolean deleteProduct(Long id) {
    Optional<Product> optionalProduct = productRepository.findById(id);
    if (optionalProduct.isPresent()) {
      productRepository.deleteById(id);
      return true;
    } else {
      return false; // Product not found
    }
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

}
