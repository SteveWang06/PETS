package com.project.pet.services;

import com.project.pet.dto.ChatBotDTO;
import com.project.pet.models.ChatBot;
import com.project.pet.models.User;
import com.project.pet.repository.ChatBotRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChatBotService {

  @Autowired
  private ChatBotRepository chatBotRepository;
  @Autowired
  private UserRepository userRepository;

  public List<ChatBot> getAllChatBots() {
    return chatBotRepository.findAll();
  }

  public List<ChatBot> getChatBotsByUserId(Long userId) {
    return chatBotRepository.findAllByUserId(userId);
  }

  public ChatBot getChatBotById(String id) {
    return chatBotRepository.findById(id).orElse(null);
  }

  public ChatBot saveChatBot(ChatBot chatBot) {
    return chatBotRepository.save(chatBot);
  }

  public ChatBot createChatBot(ChatBotDTO chatBotDTO, Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      throw new IllegalArgumentException("User không tồn tại với id: " + userId);
    }

    ChatBot chatBot = new ChatBot();
    chatBot.setDetailedInfo(chatBotDTO.getDetailedInfo());
    chatBot.setImageUrl(chatBotDTO.getImageUrl());
    chatBot.setAppearance(chatBotDTO.getAppearance());
    chatBot.setNameBreed(chatBotDTO.getNameBreed());
    chatBot.setUser(user); // Gắn User cho ChatBot
    chatBot.setChatTime(new Date());

    return chatBotRepository.save(chatBot);
  }

  public ChatBot updateChatBot(String id, ChatBotDTO chatBotDTO) {
    ChatBot existingChatBot = getChatBotById(id);
    if (existingChatBot == null) {
      return null; // Nếu không tìm thấy, trả về null
    }
    existingChatBot.setDetailedInfo(chatBotDTO.getDetailedInfo());
    existingChatBot.setImageUrl(chatBotDTO.getImageUrl());
    existingChatBot.setAppearance(chatBotDTO.getAppearance());
    existingChatBot.setNameBreed(chatBotDTO.getNameBreed());
    return chatBotRepository.save(existingChatBot);
  }

  public void deleteChatBot(String id) {
    chatBotRepository.deleteById(id);
  }
}
