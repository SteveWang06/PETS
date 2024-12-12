package com.project.pet.services;

import com.project.pet.models.FileData;
import com.project.pet.repository.FileDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FilesStorageService {

  @Autowired
  private FileDataRepository fileDataRepository;

  @Value("${app.file.storage.mapping}")
  private String FOLDER_PATH;
  public String uploadImageToFileSystem(MultipartFile file) throws IOException {
    String filePath=FOLDER_PATH+file.getOriginalFilename();

    FileData fileData=fileDataRepository.save(FileData.builder()
        .name(file.getOriginalFilename())
        .type(file.getContentType())
        .filePath(filePath).build());

    file.transferTo(new File(filePath));

    if (fileData != null) {
      return "file uploaded successfully : " + filePath;
    }
    return null;
  }


  public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
    Optional<FileData> fileData = fileDataRepository.findByName(fileName);
    String filePath=fileData.get().getFilePath();
    byte[] images = Files.readAllBytes(new File(filePath).toPath());
    return images;
  }









}
