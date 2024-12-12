package com.project.pet.repository;

import com.project.pet.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
  Image findByImageUrl(String imageUrl);
  //Image findByImageUrl(String imageUrl);

}
