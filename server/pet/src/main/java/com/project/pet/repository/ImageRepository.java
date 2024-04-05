package com.project.pet.repository;

import com.project.pet.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
  Image findByName(String imageName);
  Image findByImageUrl(String imageUrl);
}