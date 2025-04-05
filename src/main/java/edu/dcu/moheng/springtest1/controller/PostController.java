package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.PostRequestDto;
import edu.dcu.moheng.springtest1.dto.PostResponseDto;
import edu.dcu.moheng.springtest1.entity.Post;
import edu.dcu.moheng.springtest1.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {   // 게시글 작성을 요청하는 컨트롤러 클래스

    private final PostService postService;              // 의존성 주입

    public PostController(PostService postService) {    // spring이 자동으로 Bean을 주입해주기 때문에 @Autowired는 필요 없음
        this.postService = postService;
    }

    @PostMapping    // HTTP Post 요청을 처리
    public ResponseEntity<Post> createPost(@RequestBody PostRequestDto dto,
                                           @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");   // JWT 토큰 추출
        Post post = postService.createPost(dto, token); // 게시글 작성은 postService로 전달
        return ResponseEntity.ok(post);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

}
