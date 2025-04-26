package edu.dcu.moheng.springtest1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 장소 정보를 담는 DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDto {
    private String name;         // 장소 이름
    private String description;  // 장소 설명 (초기엔 null, 나중에 GPT 등으로 채울 수 있음)
    private String address;      // 장소 주소
    private double lat;          // 위도
    private double lng;          // 경도
}
