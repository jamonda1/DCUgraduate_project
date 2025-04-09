package edu.dcu.moheng.springtest1.controller;

import edu.dcu.moheng.springtest1.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController // 이 class가 REST API 요청과 응답을 처리하는 컨트롤러임을 나타낸다.
@RequestMapping("/api/images")  // 컨트롤러의 모든 메서드 URL은 /api/images로 시작
public class ImageController {

    private final ImageService imageService;            // 이미지 처리를 실행하는 ImageService 참조

    public ImageController(ImageService imageService) { // 생성자 주입 방식(IoC)로 ImageService 주입
        this.imageService = imageService;
    }

    @PostMapping("/upload") // 클라이언트에서 /api/images/upload 요청이 들어오면 실행되는 메서드
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {                    // from-data로 전송된 파일을 받음
        try {
            ImageService.ImageResult result = imageService.saveImage(file);                                  // imageService의 saveImage를 호출하여 이미지 저장
            return ResponseEntity.ok("업로드 성공: " + result.filename + " | 날씨: " + result.weather);    // 성공 시 출력 메시지
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("업로드 실패: " + e.getMessage());  // 예외
        }
    }
}
