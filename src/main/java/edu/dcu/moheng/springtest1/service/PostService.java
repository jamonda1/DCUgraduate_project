package edu.dcu.moheng.springtest1.service;

import edu.dcu.moheng.springtest1.dto.AiPostRequestDto;
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
    private final OllamaService ollamaService;


    public PostService(PostRepository postRepository, UserRepository userRepository, JwtUtil jwtUtil, ImageService imageService, OllamaService ollamaService) { // 의존성 주입
        this.postRepository = postRepository;       // IOC(제어의 역전) 객체를 생성하지 않고, 어디선가 받아온 객체를 가져와서 할당하는 것
        this.userRepository = userRepository;       // 객체의 생성과 관리의 자동화, 결합도 감소, 테스트 용이성, 생명주기 관리, 유연한 연결이 가능
        this.jwtUtil = jwtUtil;
        this.imageService = imageService;
        this.ollamaService = ollamaService;
    }
    // 게시글 생성 C
    public Post createPost(PostRequestDto dto, MultipartFile file, String token) throws IOException {
        String email = jwtUtil.getEmailFromToken(token);    // 토큰에서 이메일 추철하여 저장
        User author = userRepository.findByEmail(email)     // 이메일을 DB에 조회해서 사용자 확인
                .orElseThrow(() -> new IllegalArgumentException("사용자 없음"));

        ImageService.ImageResult result = imageService.saveImage(file); // 이미지 저장 후 경로와 날씨 정보 리턴

        String content = dto.getContent();
        if (content == null || content.trim().isEmpty()) {  // 본문이 null이면
            content = generatePostBody(dto);                // AI로 본문 생성
        }

        Post post = Post.builder()
                .title(dto.getTitle())          // 사용자가 입력한 제목
                .content(content)               // AI가 작성한 본문
                .keywords(dto.getKeywords())    // 사용자가 입력한 키워드
                .style(dto.getStyle())          // 사용자가 입력한 게시글 작성 스타일
                .hashtags(dto.getHashtags())    // 이하 마찬가지
                .imageUrl(result.filename)
                .weather(result.weather)
                .author(author)
                .build();

        return postRepository.save(post);       // 완성된 Post 객체를 DB에 저장
    }


    // 게시글 조회 R
    public List<PostResponseDto> getAllPosts() {    // 게시글 목록 전체를 가져오는 메서드
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadDate")).stream()
                .map(PostResponseDto::from)
                .toList();
    }
    public PostResponseDto getPostById(Long id) {   // 특정 게시글의 상세 정보를 가져오는 메서드
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        return new PostResponseDto(post);
    }

    // 게시글 수정 U
    public PostResponseDto updatePost(Long id, PostRequestDto dto, String token) {
        String email = jwtUtil.getEmailFromToken(token);    // 토큰에서 이메일 추출
        Post post = postRepository.findById(id)             // id를 통해 DB에서 게시글을 탐색
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));    // DB에 없을 경우

        // 본인 글인지 확인
        if (!post.getAuthor().getEmail().equals(email)) {   // 게시글 작성자의 이메일과 토큰에서 추출한 이메일이 다를 경우
            throw new IllegalArgumentException("작성자만 수정할 수 있습니다.");
        }

        post.update(dto);           // dto에 담긴 수정된 게시글대로 post의 객체 필드 수정
        postRepository.save(post);  // 수정된 내용을 DB에 업데이트
        return new PostResponseDto(post);
    }

    // 게시글 삭제 D
    public void deletePost(Long id, String token) {
        String email = jwtUtil.getEmailFromToken(token);    // 토큰에서 이메일 추출
        Post post = postRepository.findById(id)             // id를 통해 DB에서 게시글을 탐색
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        if (!post.getAuthor().getEmail().equals(email)) {   // 게시글 작성자의 이메일과 토큰에서 추출한 이메일이 다를 경우
            throw new IllegalArgumentException("작성자만 삭제할 수 있습니다.");
        }

        postRepository.delete(post);    // 게시글 삭제
    }

    public String generatePostBody(PostRequestDto dto) {
        String title = dto.getTitle();
        List<String> keywords = dto.getKeywords();
        String style = dto.getStyle();

        String prompt = String.format("""
        Please write the body of the travel blog in Korean using the information below.
        
        Title: %s
        Keywords: %s
        Style: %s

        I would like you to translate into Korean a natural and emotional text of about 150 to 200 characters that fits the style.
        """, title, String.join(", ", keywords), style);

        return ollamaService.generateText(prompt);
    }

}

