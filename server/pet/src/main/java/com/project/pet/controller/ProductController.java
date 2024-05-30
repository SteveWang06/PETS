package com.project.pet.controller;

import com.project.pet.models.Product;
import com.project.pet.services.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    Optional<Product> optionalProduct = productService.getProductById(id);
    return optionalProduct.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN', 'BUSINESS')")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Product> createProduct(@RequestParam("name") String name,
                                               @RequestParam("description") String description,
                                               @RequestParam("images") MultipartFile[] imageUrl,
                                               @RequestParam("userId") Long userId) throws IOException {
    Product createdProduct = productService.createProduct(name, description, imageUrl, userId);
    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN', 'BUSINESS')")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                               @RequestParam("name") String name,
                                               @RequestParam("description") String description,
                                               @RequestParam("images") MultipartFile[] imageUrl) throws IOException {
    Product product = productService.updateProduct(id, name, description, imageUrl);
    if (product != null) {
      return new ResponseEntity<>(product, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN', 'BUSINESS')")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    boolean deleted = productService.deleteProduct(id);
    if (deleted) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}

