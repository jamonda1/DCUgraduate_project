package edu.dcu.moheng.springtest1.service;

import edu.dcu.moheng.springtest1.dto.PostRequestDto;
import edu.dcu.moheng.springtest1.dto.PostResponseDto;
import edu.dcu.moheng.springtest1.entity.Post;
import edu.dcu.moheng.springtest1.repository.PostRepository;
import edu.dcu.moheng.springtest1.repository.UserRepository;
import edu.dcu.moheng.springtest1.entity.User;
import edu.dcu.moheng.springtest1.jwt.JwtUtil;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service    // 비즈니스 로직을 처리하는 비즈니스 게층, 이 클래스는 빈이 되어 스프링 컨테이너가 생성/관리/주입
public class PostService {  // 게시글 생성을 담당하는 클래스

    private final PostRepository postRepository;    // 게시글 저장
    private final UserRepository userRepository;    // 사용자 조회
    private final JwtUtil jwtUtil;                  // JWT 토큰 처리
    private final ImageService imageService;

    public PostService(PostRepository postRepository, UserRepository userRepository, JwtUtil jwtUtil, ImageService imageService) { // 의존성 주입
        this.postRepository = postRepository;       // IOC(제어의 역전) 객체를 생성하지 않고, 어디선가 받아온 객체를 가져와서 할당하는 것
        this.userRepository = userRepository;       // 객체의 생성과 관리의 자동화, 결합도 감소, 테스트 용이성, 생명주기 관리, 유연한 연결이 가능
        this.jwtUtil = jwtUtil;
        this.imageService = imageService;
    }

    public Post createPost(PostRequestDto dto, MultipartFile file, String token) throws IOException {
        String email = jwtUtil.getEmailFromToken(token);
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        ImageService.ImageResult result = imageService.saveImage(file);

        Post post = Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .keywords(dto.getKeywords())
                .style(dto.getStyle())
                .hashtags(dto.getHashtags())
                .imageUrl(result.filename)
                .weather(result.weather)
                .author(author)
                .build();

        return postRepository.save(post);
    }
    /*
    public Post createPost(PostRequestDto dto, String token) {  // 게시글 생성 메서드
        String email = jwtUtil.getEmailFromToken(token);        // 이메일 추출
        User author = userRepository.findByEmail(email)         // 추출한 이메일을 userRepository에 조회
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음")); // 없으면 "사용자 없음"

        Post post = Post.builder()              // 게시글 작성에 필요한 것
                .title(dto.getTitle())          // 게시글 제목
                .keywords(dto.getKeywords())    // 게시글 작성을 위한 키워드 입력
                .style(dto.getStyle())          // 게시글 작성 스타일
                .content(dto.getContent())      // 게시글 본문 작성
                .hashtags(dto.getHashtags())    // 본문 기반의 해시태그
                .author(author)                 // 게시글 작성자
                .build();

        return postRepository.save(post);       // 해당 값들을 postRepository에 저장
    }
    */

    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadDate")).stream()
                .map(PostResponseDto::from)
                .toList();
    }
}
