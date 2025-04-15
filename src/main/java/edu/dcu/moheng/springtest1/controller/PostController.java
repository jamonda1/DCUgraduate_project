package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.dto.PostRequestDto;
import edu.dcu.moheng.springtest1.dto.PostResponseDto;
import edu.dcu.moheng.springtest1.entity.Post;
import edu.dcu.moheng.springtest1.service.PostService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/posts")
public class PostController {   // 게시글 작성을 요청하는 컨트롤러 클래스

    private final PostService postService;              // 의존성 주입

    public PostController(PostService postService) {    // spring이 자동으로 Bean을 주입해주기 때문에 @Autowired는 필요 없음
        this.postService = postService;
    }

    @PostMapping(value = "/with-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // 파일 업로드가 포함된 요청
    public ResponseEntity<Post> createPostWithImage(
            @ModelAttribute PostRequestDto dto,
            @RequestPart("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader
    ) throws IOException {
        String token = authHeader.replace("Bearer ", "");
        Post post = postService.createPost(dto, file, token);
        return ResponseEntity.ok(post);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

}
