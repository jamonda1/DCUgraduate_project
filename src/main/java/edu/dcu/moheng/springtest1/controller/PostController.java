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
            @ModelAttribute PostRequestDto dto,                 // 사용자가 작성한 텍스트 필드를 PostRequestDto 객체에 담고 매핑
            @RequestPart("file") MultipartFile file,            // 업로드된 파일
            @RequestHeader("Authorization") String authHeader   // 해더에서 토큰을 가져온다
    ) throws IOException {
        String token = authHeader.replace("Bearer ", "");   // 토큰 추출
        Post post = postService.createPost(dto, file, token);                 // 게시글 생성 메서드에 텍스트 필드 객체와 이미지, 토큰을 전
        return ResponseEntity.ok(post);                                       // 응답 반환
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    // 수정
    @PutMapping("/{id}")    // 해당 {id}에 들어갈 내용은 게시글의 id
    public ResponseEntity<PostResponseDto> updatePost(
            @PathVariable Long id,
            @RequestBody PostRequestDto dto,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(postService.updatePost(id, dto, token));
    }

    // 삭제
    @DeleteMapping("/{id}") // 해당 {id}에 들어갈 내용은 게시글의 id
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        postService.deletePost(id, token);
        return ResponseEntity.noContent().build(); // 204 No Content(삭제 성공)
    }


}
