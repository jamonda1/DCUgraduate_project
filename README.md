# [모행] 대구가톨릭대학교 캡스톤디자인 과제
## 모행 - 모두의 여행
&nbsp;'모행'은 AI를 활용하여 일정과 게시글을 작성할 수 있는 애플리케이션입니다.
 
&nbsp;기존 여행 시장에 출시된 앱들은 숙소나 항공권, 여행 상품 예약에 집중되어 있어, 자유롭게 여행기를 작성하는 것에 어려움이 있다고 느꼈습니다.(수정 필요)
그래서 이 문제를 해결하기 위해 SNS에 일정 관리 기능을 더하여, 사용자들이 일정과 여행 정보를 더욱 적극적으로 기록 **・** 공유하는 것을 목표로 하고 있습니다.(수정 필요)

## 목차
- [개요](#개요)
- [기능 설명](#기능-설명)
  - [화면 설명](#화면-설명)
  - [API 설명](#API-설명)
- [아쉬웠던 부분](#아쉬웠던-부분)

## 프로젝트 소개
프로젝트 이름: 모행 ( 모두의 여행 )

프로젝트 주제: AI를 활용한 위치 기반 자동 여행 일지 작성 앱 개발

개발 기간: 2024.09.02 ~ 2025.05.10

개발 인원: 4명 (박승진, 이상엽, 이동훈, 정세익)

캡스톤 디자인 전시회: 2024.12.03  |  2025.06.03


>**기존의 문제점**
>
>&nbsp;2023년과 2024년의 내국인 출국자 수는 각각 2,271만 명과 2,872만 명으로, 여행에 대한 수요가 매우 높다는 것을 알 수 있습니다. 그리고 그것에 걸맞게 이미 시장에는 여러 앱들이 출시된 상태입니다. 하지만 기존 시장에 출시된 앱들은 숙소나 항공권, 여행 상품 예약 등 수많은 기능이 복합적으로 연결되어 있어, 오히려 사용자 만족도가 낮은 경우가 있습니다.

>**해결 방법**
>
>&nbsp;SNS, 지도, 일정 관리 기능에 AI를 접목시켜, 간편한 여행 기록과 일정 관리를 도와주는 앱을 통해 일부 사용자들의 불만을 해소하고자 합니다. 사용자가 입력한 키워드를 기반으로 AI가 게시글을 작성하고, 여행 일정에 고민이 될 경우에는 원하는 지역을 입력하여 추천을 받는 것이 가능합니다. 또한 불필요한 기능을 최소화하여 간편하고 직관적인 조작 방식을 유지할 수 있었습니다. 이는 사용자 친화적으로 다가와 별도로 사용법을 익히기 위해 시간을 투자하지 않도록 합니다.

>**기대 효과**
>
>&nbsp;사용자가 기록한 여행기는 타인이 자유롭게 조회하고 공유할 수 있습니다. 이를 통해 다른 사람들의 여행 소감을 간접적으로 경험할 수 있으며, 게시글 공유를 통해 국내외의 새로운 여행지를 발견하는 데 도움이 됩니다. 커뮤니티 기반의 구조는 새로운 여행에 대한 동기를 부여하고, 신규 사용자의 유입을 유도할 수 있습니다. 또한 공유 목적이 아니더라도, 지금까지의 여정을 추억하고 기록하기 위한 용도로도 활용할 수 있습니다. 사용 목적은 다양하지만, 모든 중심에는 ‘여행’이 있으며, 이러한 활동들이 결국 여행 산업에 긍정적으로 기여할 수 있습니다.

## 기능 설명
### 사용 기술
<div align=center><h3>📚 기술 스택</h3></div>
<div align=center> 
  <img src="https://img.shields.io/badge/reactnative-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <br>
 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <br>

  <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
</div>

### 메인 제공 기능
<div align=center> 
 
|메인 화면|일정 작성|AI 일정 추천|게시글 작성|AI 본문 작성|
|------|------|------|------|------|
|<img src="https://github.com/jamonda1/DCUgraduate_project/blob/main/images/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?raw=true" width="150"/>|<img src="https://github.com/jamonda1/DCUgraduate_project/blob/main/images/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?raw=true" width="150"/>|<img src="https://github.com/jamonda1/DCUgraduate_project/blob/main/images/AI%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC.png?raw=true" width="150"/>|<img src="https://github.com/jamonda1/DCUgraduate_project/blob/main/images/%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%E1%84%89%E1%85%A6%E1%86%BA%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%AE%E1%84%80%E1%85%A1.png?raw=true" width="150"/>|<img src="https://github.com/jamonda1/DCUgraduate_project/blob/main/images/AI%E1%84%80%E1%85%A6%E1%84%89%E1%85%B5%E1%84%80%E1%85%B3%E1%86%AF.png?raw=true" width="150"/>

</div>


[화면 설명]

[API 설명]

## 아쉬웠던 부분


[화면 설명]: <https://github.com/jamonda1/DCUgraduate_project/tree/front-end>
[API 설명]: <https://github.com/jamonda1/DCUgraduate_project/tree/back-end>
