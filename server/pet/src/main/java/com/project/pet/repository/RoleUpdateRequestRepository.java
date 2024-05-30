package com.project.pet.repository;
import com.project.pet.models.RoleUpdateRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleUpdateRequestRepository extends JpaRepository<RoleUpdateRequest, Long> {
  List<RoleUpdateRequest> findByApprovedFalse();
}

