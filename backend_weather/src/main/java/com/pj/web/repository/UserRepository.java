package com.pj.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pj.web.entity.SiteUser;

public interface UserRepository extends JpaRepository<SiteUser, Long> {
    SiteUser findByUsername(String username);
    boolean existsByUsername(String username);
}
