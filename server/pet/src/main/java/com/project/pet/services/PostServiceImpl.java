package com.project.pet.services;

import com.project.pet.dto.PostDTO;
import com.project.pet.models.*;
import com.project.pet.repository.PostImageRepository;
import com.project.pet.repository.PostRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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





  public Long createPost(String caption, MultipartFile[] images, Long userId, String kind ) throws IOException {
    Post post = new Post();
    post.setCaption(caption);
    User user = userRepository.findById(userId).orElse(null);
    post.setAuthor(user);
    post.setPostKind(kind);

    List<Image> savedImages = new ArrayList<>();
    for (MultipartFile image : images) {

      ImageInfo imageInfo = saveImage(image);
      Image savedImage = new Image();

      savedImage.setImageUrl(imageInfo.getUniqueFileName());
      savedImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      savedImage.setPost(post);
      savedImages.add(savedImage);
    }
    post.setPostImages(savedImages);
    postRepository.save(post);
    return post.getId();
  }

  public Post updatePost(Long postId, String caption, MultipartFile[] newImages, String kind) throws IOException {
    // Lấy bài post từ cơ sở dữ liệu
    Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));
    List<Image> oldImages = post.getPostImages();
    // Cập nhật tiêu đề (caption) của bài post
    post.setCaption(caption);
    post.setPostKind(kind);

    List<Image> newImagesList = new ArrayList<>();

    // Lưu trữ hình ảnh mới và thêm vào danh sách mới
    for (MultipartFile image : newImages) {
      ImageInfo imageInfo = saveImage(image);
      Image newImage = new Image();
      newImage.setImageUrl(imageInfo.getUniqueFileName());
      newImage.setImagePath(String.valueOf(imageInfo.getFilePath()));
      newImage.setPost(post);
      newImagesList.add(newImage);
    }

    // Xóa hết các hình ảnh cũ và thêm vào danh sách mới
    post.getPostImages().clear();
    post.getPostImages().addAll(newImagesList);

    // Lưu bài post đã được cập nhật vào cơ sở dữ liệu
    postRepository.save(post);
    return post;
  }

  public class ImageInfo {
    private String uniqueFileName;
    private Path filePath;

    public ImageInfo(String uniqueFileName, Path filePath) {
      this.uniqueFileName = uniqueFileName;
      this.filePath = filePath;
    }

    public String getUniqueFileName() {
      return uniqueFileName;
    }

    public Path getFilePath() {
      return filePath;
    }
  }

  private ImageInfo saveImage(MultipartFile file) throws IOException {
    // Tạo tên duy nhất cho hình ảnh
    String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
    // Tạo đường dẫn đầy đủ của hình ảnh
    Path filePath = Paths.get(uploadDir + uniqueFileName);
    // Lưu trữ hình ảnh vào đường dẫn
    Files.copy(file.getInputStream(), filePath);
    // Trả về thông tin hình ảnh
    return new ImageInfo(uniqueFileName, filePath);
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
    //dto.setPostKinds(post.getPostKinds());
    dto.setPostKind(post.getPostKind());
    dto.setUserId(post.getAuthor().getId());
    dto.setAuthorName(post.getAuthor().getUserName());
    dto.setAuthorAvatar(post.getAuthor().getAvatar());
    dto.setPostLike(post.getPostLike());
    dto.setPostComment(post.getComments());
    return dto;
  }

//  @Override
//  public Post getPostById(Long postId) {
//    return postRepository.findById(postId).get();
//
//  }

  @Override
  public PostDTO getPostById(Long postId) {
    Optional<Post> postOptional = postRepository.findById(postId);
    if (postOptional.isPresent()) {
      Post post = postOptional.get();
      return convertToDTO(post);
    } else {
      throw new IllegalArgumentException("Post not found with ID: " + postId);
    }
  }


  @Override
  public void deletePost(Long id) {
    postRepository.deleteById(id);
  }
  @Override
  public void addComment(PostComment comment) {

  }
}
