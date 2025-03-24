-- 데이터베이스 및 사용자 계정 설정
CREATE DATABASE IF NOT EXISTS mohang;
CREATE USER IF NOT EXISTS 'travel_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON mohang.* TO 'travel_user'@'localhost';
FLUSH PRIVILEGES;

USE mohang;

-- 사용자 테이블
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_nickname VARCHAR(50) UNIQUE NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL, -- Bcrypt 해싱된 비밀번호
    user_birth DATE,
    user_gender ENUM('남', '여', '비공개'),
    user_createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_feel TEXT,
    user_status ENUM('활성', '비활성', '탈퇴') DEFAULT '활성',
    user_verificationToken VARCHAR(255) UNIQUE, -- 이메일 인증 토큰
    user_lastLogin TIMESTAMP NULL -- 마지막 로그인 시간 기록
);

-- 이메일 검색 최적화를 위한 인덱스 추가
CREATE INDEX idx_user_email ON User(user_email);

-- 로그인 기록 테이블
CREATE TABLE UserLoginHistory (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    login_ip VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 사용자 세션 관리 (JWT 또는 세션 토큰 기반 인증 지원)
CREATE TABLE UserSession (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    session_expiry TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 장소 테이블
CREATE TABLE Place (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    place_address VARCHAR(100) NOT NULL,
    place_detailAddress VARCHAR(100),
    place_name VARCHAR(100) NOT NULL,
    place_telephone VARCHAR(20),
    place_img VARCHAR(255),
    place_category1 ENUM('음식점', '관광지', '쇼핑', '기타') NOT NULL,
    place_category2 ENUM('대구', '오사카', '뉴욕', '기타') NOT NULL
);

-- 관심 장소 등록 (위시리스트) 테이블
CREATE TABLE Wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    wishlist_addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    wishlist_category ENUM('가고싶은장소', '갔던장소') NOT NULL,
    wishlist_memo TEXT,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES Place(place_id) ON DELETE CASCADE
);

-- 여행 일정 테이블
CREATE TABLE Plan (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    wishlist_id INT DEFAULT NULL,
    place_id INT DEFAULT NULL,
    plan_title VARCHAR(100) NOT NULL,
    plan_startDate DATE NOT NULL,
    plan_endDate DATE NOT NULL,
    plan_withFriend VARCHAR(100),
    plan_memo TEXT,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (wishlist_id) REFERENCES Wishlist(wishlist_id) ON DELETE SET NULL,
    FOREIGN KEY (place_id) REFERENCES Place(place_id) ON DELETE SET NULL
);

-- 지도에 등록 테이블
CREATE TABLE Mapping (
    mapping_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    wishlist_id INT NOT NULL,
    mapping_markfering VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (wishlist_id) REFERENCES Wishlist(wishlist_id) ON DELETE CASCADE
);

-- 게시글 테이블
CREATE TABLE Post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_content TEXT NOT NULL,
    post_imgLocation VARCHAR(255), -- 이미지 URL 저장
    post_uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 댓글 테이블
CREATE TABLE Comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    comment_userContent TEXT NOT NULL,
    comment_uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- 게시글 좋아요 테이블
CREATE TABLE PostLike (
    post_like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    postLike_addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
);

-- 더미 데이터 삽입
INSERT INTO User (user_nickname, user_email, user_password, user_birth, user_gender, user_status) 
VALUES
('testuser1', 'test1@example.com', '$2y$10$abc123hashedpassword', '2001-01-01', '남', '활성'),
('testuser2', 'test2@example.com', '$2y$10$abc123hashedpassword', '2001-12-31', '여', '활성');

INSERT INTO Place (place_address, place_detailAddress, place_name, place_telephone, place_img, place_category1, place_category2) 
VALUES 
('서울 강남구', '테헤란로 123', '맛있는 식당', '02-1234-5678', 'img1.jpg', '음식점', '대구'),
('부산 해운대구', '해운대로 456', '멋진 카페', '051-9876-5432', 'img2.jpg', '관광지', '기타');

INSERT INTO Wishlist (user_id, place_id, wishlist_category, wishlist_memo) 
VALUES 
(1, 1, '가고싶은장소', '이곳에 꼭 가보고 싶다!'),
(2, 2, '갔던장소', '여기 너무 좋았음!');

INSERT INTO Plan (user_id, place_id, plan_title, plan_startDate, plan_endDate, plan_withFriend, plan_memo) 
VALUES 
(1, 1, '서울 여행', '2025-04-01', '2025-04-05', '친구1, 친구2', '맛집 탐방 일정');

INSERT INTO Post (user_id, post_content, post_uploadDate) 
VALUES 
(1, '서울에서 맛집 탐방 중!', NOW()),
(2, '부산 해운대에서 커피 한잔!', NOW());

INSERT INTO Comment (user_id, post_id, comment_userContent, comment_uploadDate) 
VALUES 
(2, 1, '와! 저도 가보고 싶어요!', NOW()),
(1, 2, '커피 맛있나요?', NOW());

INSERT INTO PostLike (user_id, post_id, postLike_addDate) 
VALUES 
(1, 2, NOW()),
(2, 1, NOW());
