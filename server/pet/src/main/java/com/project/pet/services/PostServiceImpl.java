package com.project.pet.services;

import com.project.pet.dto.PostDTO;
import com.project.pet.exception.PostNotFoundException;
import com.project.pet.models.*;
import com.project.pet.repository.PostImageRepository;
import com.project.pet.repository.PostRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService{

  //PostDTO postDTO;
  @Autowired
  private PostRepository postRepository;
  @Autowired
  private UserRepository userRepository;
  private PostImageRepository postImageRepository;
//  private PostCommentRepository postCommentRepository;

  @Value("${file.upload.dir}")
  private String uploadDir;

  public PostServiceImpl(PostRepository postRepository,
                         PostImageRepository postImageRepository
                        ) {
    this.postRepository = postRepository;
    this.postImageRepository = postImageRepository;

  }

//  @Override
//  public String createPost(Post post) {
//
//    postRepository.save(post);
//
//    return "Success";
//  }



  public Long createPost(String caption, MultipartFile[] images, Long userId ) throws IOException {
    Post post = new Post();
    post.setCaption(caption);
    User user = userRepository.findById(userId).orElse(null);
    post.setAuthor(user);


    List<Image> savedImages = new ArrayList<>();
    for (MultipartFile image : images) {
      String imageUrl = saveImage(image);
      Image savedImage = new Image();
      savedImage.setName(imageUrl);
      savedImage.setImageUrl(imageUrl);

      savedImage.setPost(post);
      savedImages.add(savedImage);
    }
    post.setPostImages(savedImages);
    postRepository.save(post);
    return post.getId();
  }

  private String saveImage(MultipartFile file) throws IOException {
    // Tạo tên duy nhất cho hình ảnh
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    // Tạo đường dẫn đầy đủ của hình ảnh
    Path filePath = Paths.get(uploadDir + uniqueFileName);
    // Lưu trữ hình ảnh vào đường dẫn
    Files.copy(file.getInputStream(), filePath);
    // Trả về đường dẫn của hình ảnh
    return uniqueFileName;
  }

  @Override
  public List<PostDTO> getAllPost() {
    List<Post> posts = postRepository.findAllWithAuthor();
    return posts.stream().map(this::convertToDTO).collect(Collectors.toList());
  }



  private PostDTO convertToDTO(Post post) {
    PostDTO dto = new PostDTO();
    dto.setId(post.getId());
    dto.setCaption(post.getCaption());
    dto.setPostImages(post.getPostImages());
    dto.setPostKinds(post.getPostKinds());
    dto.setAuthorName(post.getAuthor().getUserName());
    dto.setAuthorAvatar(post.getAuthor().getAvatar());
    dto.setPostLike(post.getPostLike());
    return dto;
  }

  @Override
  public Post getPostById(Long postId) {
    return postRepository.findById(postId).get();

  }

  @Override
  public void updatePost(Post updatedPost) {
    postRepository.save(updatedPost);
  }
  @Override
  public void deletePost(Long id) {
    postRepository.deleteById(id);
  }
   @Override
    public void addComment(PostComment comment) {

    }
}

