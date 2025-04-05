package edu.dcu.moheng.springtest1.repository;

import edu.dcu.moheng.springtest1.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    // JpaRepository<Post, Long> Post 엔티티에 대한 기본 CRUD(저장, 조회, 수정, 삭제) 기능을 자동으로 제공
}

