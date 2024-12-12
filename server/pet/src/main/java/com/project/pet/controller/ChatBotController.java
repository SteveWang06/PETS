package com.project.pet.controller;

import com.project.pet.dto.ChatBotDTO;
import com.project.pet.models.ChatBot;
import com.project.pet.services.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbots")
public class ChatBotController {

  @Autowired
  private ChatBotService chatBotService;

  @GetMapping
  public List<ChatBot> getAllChatBots() {
    return chatBotService.getAllChatBots();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ChatBot> getChatBotById(@PathVariable String id) {
    ChatBot chatBot = chatBotService.getChatBotById(id);
    return chatBot != null ? ResponseEntity.ok(chatBot) : ResponseEntity.notFound().build();
  }

  @GetMapping("/user/{userId}")
  public List<ChatBot> getChatBotsByUserId(@PathVariable Long userId) {
    return chatBotService.getChatBotsByUserId(userId);
  }

  @PostMapping("/user/{userId}")
  public ResponseEntity<ChatBot> createChatBot(
      @PathVariable Long userId,
      @RequestBody ChatBotDTO chatBotDTO) {
    ChatBot chatBot = chatBotService.createChatBot(chatBotDTO, userId);
    return ResponseEntity.ok(chatBot);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ChatBot> updateChatBot(@PathVariable String id, @RequestBody ChatBotDTO chatBotDTO) {
    ChatBot updatedChatBot = chatBotService.updateChatBot(id, chatBotDTO);
    return updatedChatBot != null ? ResponseEntity.ok(updatedChatBot) : ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteChatBot(@PathVariable String id) {
    chatBotService.deleteChatBot(id);
    return ResponseEntity.noContent().build();
  }
}
