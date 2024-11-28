package com.project.pet.repository;

import com.project.pet.models.ChatBot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatBotRepository extends JpaRepository<ChatBot, String> {

  // Tìm kiếm danh sách ChatBot theo userId
  List<ChatBot> findAllByUserId(Long userId);
}
