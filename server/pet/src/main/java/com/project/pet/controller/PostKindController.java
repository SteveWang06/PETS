package com.project.pet.controller;


import com.project.pet.models.PostKind;
import com.project.pet.services.PostKindService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("api/auth/")
public class PostKindController {


  @Autowired
  private PostKindService postKindService;


  @PostMapping("createKind")
  public ResponseEntity<?> createKind(@RequestParam("kind") String kind) {
    try {
      PostKind postKind = postKindService.createKind(kind);
      return ResponseEntity.ok(postKind);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error creating post kind: " + e.getMessage());
    }
  }


  @GetMapping("kind")
  public ResponseEntity<List<PostKind>> getAllKind() {
    List<PostKind> postKinds = postKindService.getAllKinds();
    return ResponseEntity.ok(postKinds);
  }

  @DeleteMapping("/{kindId}")
  public ResponseEntity<String> deleteKind(@PathVariable Integer kindId) {
    postKindService.deleteKind(kindId);
    return ResponseEntity.ok("Kind deleted successfully");
  }
}
