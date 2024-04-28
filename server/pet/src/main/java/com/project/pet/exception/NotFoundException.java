package com.project.pet.exception;

public class NotFoundException extends RuntimeException{
  public NotFoundException(String message) {
    super(message);
  }
}
