package com.project.pet.services;

import com.project.pet.dto.ProductDTO;
import com.project.pet.models.Image;
import com.project.pet.models.Product;
import com.project.pet.models.User;
import com.project.pet.repository.ProductRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  @Value("${product.upload.dir}")
  private String uploadDir;

//  public List<Product> getAllProducts() {
//    return productRepository.findAll();
//  }
public List<ProductDTO> getAllProducts() {
  List<Product> products = productRepository.findAllProducts();
  return products.stream().map(this::convertToDto).collect(Collectors.toList());
}

  public ProductDTO getProductById(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    return convertToDto(product);
  }

  @Transactional
  public Product createProduct(String name, String type, Integer price, String description, MultipartFile[] imageUrl, Long userId) throws IOException {
    Product product = new Product();
    product.setName(name);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);
    product.setCreatedAt(new Date());

    List<Image> savedImages = saveImages(imageUrl, product);
    product.setImageUrl(savedImages);

    User user = userRepository.findById(userId).orElse(null);
    product.setUser(user);

    return productRepository.save(product);
  }

  @Transactional(rollbackFor = Exception.class)
  public ProductDTO updateProduct(Long id, String name, String type, Integer price, String description, MultipartFile[] newImages) throws IOException {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    // Update basic product information
    product.setName(name);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);

    // Delete old images and add new ones
    updateImages(product, newImages);

    // Save the updated product
    Product updatedProduct = productRepository.save(product);

    // Convert to DTO for response
    return convertToDto(updatedProduct);
  }

  private void updateImages(Product product, MultipartFile[] newImages) throws IOException {
    // Delete old images
    deleteOldImages(product);

    // Add new images
    List<Image> updatedImages = new ArrayList<>();
    for (MultipartFile file : newImages) {
      ImageInfo imageInfo = saveImage(file);
      Image newImage = new Image();
      newImage.setImageUrl(imageInfo.getUniqueFileName());
      newImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      newImage.setProduct(product);
      updatedImages.add(newImage);
    }
    product.setImageUrl(updatedImages);
  }



  @Transactional
  public boolean deleteProduct(Long id) {
    Optional<Product> optionalProduct = productRepository.findById(id);
    if (optionalProduct.isPresent()) {
      productRepository.deleteById(id);
      return true;
    }
    return false; // Product not found
  }

  private void updateProductFields(Product product, String name, String type, Integer price, String description) {
    product.setName(name);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);
  }

  private List<Image> saveImages(MultipartFile[] images, Product product) throws IOException {
    List<Image> savedImages = new ArrayList<>();
    for (MultipartFile image : images) {
      ImageInfo imageInfo = saveImage(image);
      Image savedImage = new Image();
      savedImage.setImageUrl(imageInfo.getUniqueFileName());
      savedImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      savedImage.setProduct(product);
      savedImages.add(savedImage);
    }
    return savedImages;
  }

  private void updateProductImages(Product product, MultipartFile[] newImages) throws IOException {
    Set<String> newImageFileNames = Arrays.stream(newImages)
        .map(file -> {
          try {
            return saveImage(file).getUniqueFileName();
          } catch (IOException e) {
            e.printStackTrace();
            return null;
          }
        })
        .collect(Collectors.toSet());

    Iterator<Image> imageIterator = product.getImageUrl().iterator();
    while (imageIterator.hasNext()) {
      Image oldImage = imageIterator.next();
      if (!newImageFileNames.contains(oldImage.getImageUrl())) {
        deleteImageFile(oldImage.getImagePath());
        imageIterator.remove();
      }
    }

    List<Image> updatedImages = saveImages(newImages, product);
    product.getImageUrl().addAll(updatedImages);
  }
  private void deleteOldImages(Product product) {
    List<Image> imagesToRemove = new ArrayList<>(product.getImageUrl());
    product.getImageUrl().clear();

    for (Image image : imagesToRemove) {
      deleteImageFile(image.getImagePath());
    }
  }


  private void deleteImageFile(String imagePath) {
    try {
      Files.deleteIfExists(Paths.get(imagePath));
    } catch (IOException e) {
      e.printStackTrace();
      // Handle exception as per your application's requirements
    }
  }

  private ImageInfo saveImage(MultipartFile file) throws IOException {
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadDir + uniqueFileName);
    Files.copy(file.getInputStream(), filePath);
    return new ImageInfo(uniqueFileName, filePath);
  }

  private ProductDTO convertToDto(Product product) {
    ProductDTO productDTO = new ProductDTO();
    productDTO.setId(product.getId());
    productDTO.setName(product.getName());
    productDTO.setType(product.getType());
    productDTO.setPrice(product.getPrice());
    productDTO.setDescription(product.getDescription());
    productDTO.setImageUrl(product.getImageUrl().stream()
        .map(Image::getImageUrl)
        .collect(Collectors.toList()));

    ProductDTO.UserDTO userDTO = new ProductDTO.UserDTO();
    User user = product.getUser();
    if (user != null) {
      userDTO.setId(user.getId());
      userDTO.setUserName(user.getUserName());
      userDTO.setEmail(user.getEmail());
      userDTO.setAvatar(user.getAvatar());
    }
    productDTO.setUser(userDTO);

    return productDTO;
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
}
