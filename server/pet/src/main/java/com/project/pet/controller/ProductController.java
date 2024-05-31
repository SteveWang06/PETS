package com.project.pet.controller;

import com.project.pet.models.Product;
import com.project.pet.services.ProductService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
//@Api(value = "Product Management System", tags = "Products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping
  @Operation(summary = "Get all products", description = "Retrieve a list of all products")
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }


  @Operation(summary = "Get a product by ID", description = "Retrieve a product by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Found the product",
          content = { @Content(mediaType = "application/json",
              schema = @Schema(implementation = Product.class)) }),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content) })
  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    Optional<Product> optionalProduct = productService.getProductById(id);
    return optionalProduct.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }




  @Operation(summary = "Create a new product", description = "Create a new product with the provided details")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Product created",
          content = { @Content(mediaType = "application/json",
              schema = @Schema(implementation = Product.class)) }),
      @ApiResponse(responseCode = "400", description = "Invalid input",
          content = @Content) })
  @PostMapping
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN', 'BUSINESS')")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Product> createProduct(
      @Parameter(description = "Name of the product") @RequestParam("name") String name,
      @Parameter(description = "Description of the product") @RequestParam("description") String description,
      @Parameter(description = "Images of the product") @RequestParam("images") MultipartFile[] imageUrl,
      @Parameter(description = "User ID who is creating the product") @RequestParam("userId") Long userId) throws IOException {

    Product createdProduct = productService.createProduct(name, description, imageUrl, userId);
    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
  }


  @Operation(summary = "Update a product", description = "Update the details of an existing product")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Product updated",
          content = { @Content(mediaType = "application/json",
              schema = @Schema(implementation = Product.class)) }),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content) })
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN', 'BUSINESS')")
  @SecurityRequirement(name = "bearerAuth")
  public ResponseEntity<Product> updateProduct(
      @Parameter(description = "ID of the product to be updated") @PathVariable Long id,
      @Parameter(description = "Updated name of the product") @RequestParam("name") String name,
      @Parameter(description = "Updated description of the product") @RequestParam("description") String description,
      @Parameter(description = "Updated images of the product") @RequestParam("images") MultipartFile[] imageUrl) throws IOException {

    Product product = productService.updateProduct(id, name, description, imageUrl);
    if (product != null) {
      return new ResponseEntity<>(product, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }


  @Operation(summary = "Delete a product", description = "Delete an existing product by its ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Product deleted",
          content = @Content),
      @ApiResponse(responseCode = "404", description = "Product not found",
          content = @Content) })
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

