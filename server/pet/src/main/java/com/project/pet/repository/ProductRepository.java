package com.project.pet.repository;

import com.project.pet.models.Post;
import com.project.pet.models.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
  @Query("SELECT p FROM Product p LEFT JOIN FETCH p.user")
  List<Product> findAllProducts();
}