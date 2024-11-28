package com.project.pet.controller;

import com.project.pet.models.RoleEnum;
import com.project.pet.models.RoleUpdateRequest;
import com.project.pet.services.RoleUpdateRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/role-requests")
public class RoleUpdateRequestController {

  @Autowired
  private RoleUpdateRequestService roleUpdateRequestService;

  @Operation(summary = "Create Role Update Request", description = "Create a new role update request")
  @PostMapping
  public RoleUpdateRequest createRoleUpdateRequest(@RequestParam("userId") Long userId,
                                                   @RequestParam("requestedRole") RoleEnum requestedRole,
                                                   @RequestParam("address") String address,
                                                   @RequestParam("images") MultipartFile[] images) throws IOException {
    return roleUpdateRequestService.createRoleUpdateRequest(userId, requestedRole, address, images);
  }

  @Operation(summary = "Get Pending Role Update Requests", description = "Retrieve all pending role update requests")
  @GetMapping("/pending")
  @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
  @SecurityRequirement(name = "bearerAuth")
  public List<RoleUpdateRequest> getPendingRequests() {
    return roleUpdateRequestService.getPendingRequests();
  }

  @Operation(summary = "Approve Role Update Request", description = "Approve a pending role update request by ID")
  @PostMapping("/approve/{requestId}")
  @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
  @SecurityRequirement(name = "bearerAuth")
  public RoleUpdateRequest approveRequest(@PathVariable Long requestId) {
    return roleUpdateRequestService.approveRequest(requestId);
  }
}
