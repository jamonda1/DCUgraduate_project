# 모행 백엔드입니다.

담당: 박승진, 정세익

## 프로젝트 구조
```shell
├── config
│   ├── SecurityConfig.java
│   └── WebConfig.java
├── controller
│   ├── AiController.java
│   ├── DbTestController.java
│   ├── ImageController.java
│   ├── PostController.java
│   ├── ScheduleAiController.java
│   ├── ScheduleController.java
│   └── UserController.java
├── dto
│   ├── AiPostRequestDto.java
│   ├── LoginRequestDto.java
│   ├── LoginResponseDto.java
│   ├── PlaceDto.java
│   ├── PostRequestDto.java
│   ├── PostResponseDto.java
│   ├── SignupRequestDto.java
│   └── UserResponseDto.java
├── entity
│   ├── Post.java
│   ├── Schedule.java
│   └── User.java
├── jwt
│   ├── JwtFilter.java
│   └── JwtUtil.java
├── repository
│   ├── PostRepository.java
│   ├── ScheduleRepository.java
│   └── UserRepository.java
├── service
│   ├── GptService.java
│   ├── ImageService.java
│   ├── OllamaService.java
│   ├── PlaceService.java
│   ├── PostService.java
│   ├── UserService.java
│   └── WeatherService.java
├── SpringTest1Application.java
└── util
    ├── ImageMetadataExtractor.java
    └── ImageUploadResult.java
```

## API 설명

### 1. AI에게 내용을 전달 후 본문 리턴

**Class: ```AiController```**

**URL: ```/api/ai/generate-post```**

**Method: ```POST```**

**예시 입력값**
```c
{
  "title": "오사카 2박 3일 여행",
  "keywords": ["도톤보리", "타코야끼", "유니버설 스튜디오", "밤거리"],
  "writingStyle": "일기 형식"
}
```
**기대 출력값**
```c
{
  "content": "오사카 도톤보리에서 먹은 타코야끼는 정말 최고였다.
              밤거리를 걷다 보면 거리의 불빛과 사람들의 활기가 그대로 느껴졌다.
              유니버설 스튜디오도 빼놓을 수 없는 재미였고, 2박 3일이 너무 짧게 느껴질 만큼 즐거운 여행이었다."
}
```

### 2. 사진을 업로드하고 해당 시간과 장소의 날씨 정보 리턴

**Class: ```ImageController```**

**URL: ```/api/images/upload```**

**Method: ```POST```**

**예시 입력값**
```c
{
  file: <사용자가 게시글 업로드에 선택한 이미지 파일>
}
```
**기대 출력값**
```c
{
  업로드 성공: <업로드 된 파일 이름> | 날씨: 맑음(22°C)
}
```

