package com.example.mohangpj.scheduleapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 일정 정보를 담는 엔티티
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;         // 사용자 ID (회원 연동 시 활용)
    private String title;        // 일정 이름 (장소 이름 등)
    private String address;      // 장소 주소
    private double lat;          // 위도
    private double lng;          // 경도

    private LocalDate date;      // 일정 날짜
    private LocalTime startTime; // 시작 시간
    private LocalTime endTime;   // 종료 시간

    private String category;     // 장소 카테고리 (명소, 음식점 등)
}
