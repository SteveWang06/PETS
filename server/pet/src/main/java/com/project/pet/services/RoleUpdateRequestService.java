package com.project.pet.services;


import com.project.pet.models.*;
import com.project.pet.repository.RoleRepository;
import com.project.pet.repository.RoleUpdateRequestRepository;
import com.project.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RoleUpdateRequestService {

  @Autowired
  private RoleUpdateRequestRepository roleUpdateRequestRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  public RoleUpdateRequest createRoleUpdateRequest(Long userId, RoleEnum requestedRoleEnum, String address) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    Role requestedRole = roleRepository.findByName(requestedRoleEnum)
        .orElseThrow(() -> new RuntimeException("Role not found"));
    RoleUpdateRequest request = new RoleUpdateRequest();
    request.setUser(user);
    request.setRequestedRole(requestedRole);
    request.setRequestDate(LocalDateTime.now());
    request.setApproved(false);
    Address userAddress = new Address();
    userAddress.setAddress(address);
    userAddress.setUser(user); // Đặt user cho địa chỉ

    // Kiểm tra nếu người dùng đã có địa chỉ thì cập nhật
    if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
      // Nếu có địa chỉ tồn tại, cập nhật địa chỉ đầu tiên
      Address existingAddress = user.getAddresses().get(0);
      existingAddress.setAddress(address);
    } else {
      // Nếu không có địa chỉ, thêm mới
      user.getAddresses().add(userAddress);
    }
    return roleUpdateRequestRepository.save(request);
  }

  public List<RoleUpdateRequest> getPendingRequests() {
    return roleUpdateRequestRepository.findByApprovedFalse();
  }

  public RoleUpdateRequest approveRequest(Long requestId) {
    RoleUpdateRequest request = roleUpdateRequestRepository.findById(requestId)
        .orElseThrow(() -> new RuntimeException("Request not found"));
    request.setApproved(true);
    Role requestedRole = request.getRequestedRole();
    User user = request.getUser();
    user.setRole(requestedRole);
    userRepository.save(user);
    return roleUpdateRequestRepository.save(request);
  }
}
