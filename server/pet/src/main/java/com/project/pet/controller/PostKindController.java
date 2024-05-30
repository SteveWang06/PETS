package com.project.pet.controller;

import com.project.pet.models.PostKind;
import com.project.pet.services.PostKindService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/post/kind")
public class PostKindController {

  @Autowired
  private PostKindService postKindService;

  @Operation(summary = "Create post kind", description = "Create a new post kind")
  @ApiResponse(responseCode = "200", description = "Post kind created successfully")
  @PostMapping("/create")
  public ResponseEntity<PostKind> createKind(@RequestParam("kind") String kind) {
    PostKind postKind = postKindService.createKind(kind);
    return ResponseEntity.ok(postKind);
  }

  @Operation(summary = "Get all post kinds", description = "Retrieve all post kinds")
  @ApiResponse(responseCode = "200", description = "List of post kinds retrieved successfully")
  @GetMapping("/")
  public ResponseEntity<List<PostKind>> getAllKind() {
    List<PostKind> postKinds = postKindService.getAllKinds();
    return ResponseEntity.ok(postKinds);
  }

  @Operation(summary = "Delete post kind", description = "Delete a post kind by kind ID")
  @ApiResponse(responseCode = "200", description = "Post kind deleted successfully")
  @DeleteMapping("/{kindId}")
  public ResponseEntity<String> deleteKind(@PathVariable Integer kindId) {
    postKindService.deleteKind(kindId);
    return ResponseEntity.ok("Kind deleted successfully");
  }
}
