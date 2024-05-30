package com.project.pet.controller;

import com.project.pet.models.Role;
import com.project.pet.models.RoleEnum;
import com.project.pet.models.RoleUpdateRequest;
import com.project.pet.services.RoleUpdateRequestService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role-requests")
public class RoleUpdateRequestController {
  @Autowired
  private RoleUpdateRequestService roleUpdateRequestService;

  @PostMapping
  public RoleUpdateRequest createRoleUpdateRequest(@RequestParam("userId") Long userId, @RequestParam("requestedRole") RoleEnum requestedRole) {
    return roleUpdateRequestService.createRoleUpdateRequest(userId, requestedRole);
  }

  @GetMapping("/pending")
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN')")
  @SecurityRequirement(name = "bearerAuth")
  public List<RoleUpdateRequest> getPendingRequests() {
    return roleUpdateRequestService.getPendingRequests();
  }

  @PostMapping("/approve/{requestId}")
  @PreAuthorize("hasRole('ADMIN','SUPER_ADMIN')")
  @SecurityRequirement(name = "bearerAuth")
  public RoleUpdateRequest approveRequest(@PathVariable Long requestId) {
    return roleUpdateRequestService.approveRequest(requestId);
  }
}

