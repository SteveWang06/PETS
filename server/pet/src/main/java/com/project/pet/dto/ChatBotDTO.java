package com.project.pet.dto;

import java.util.Date;

public class ChatBotDTO {

  private String detailedInfo;
  private String imageUrl;
  private String appearance;
  private String nameBreed;
  private Date chatTime;

  // Getters và Setters
  public String getDetailedInfo() {
    return detailedInfo;
  }

  public void setDetailedInfo(String detailedInfo) {
    this.detailedInfo = detailedInfo;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getAppearance() {
    return appearance;
  }

  public void setAppearance(String appearance) {
    this.appearance = appearance;
  }

  public String getNameBreed() {
    return nameBreed;
  }

  public void setNameBreed(String nameBreed) {
    this.nameBreed = nameBreed;
  }

  public Date getChatTime() {
    return chatTime;
  }

  public void setChatTime(Date chatTime) {
    this.chatTime = chatTime;
  }
}
