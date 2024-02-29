package com.project.pet.exception;

public class PostNotFoundException extends RuntimeException{
  public PostNotFoundException(String message) {
    super(message);
  }
}
