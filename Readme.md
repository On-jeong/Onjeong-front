# 온정 (Onjeong) 프론트엔드

react-native를 이용함

- 서버 상태관리 라이브러리 : react-query
- 프론트 상태관리 라이브러리 : recoil

## 페이지 구성

- ### 메인 페이지

  - HomeScreen.js
  - 꽃을 볼 수 있는 메인 페이지 (미구현)

- ### 캘린더 페이지

  - CalendarScreen.js
  - 가족끼리의 이벤트나 일정을 공유할 수 있는 페이지
  - 각 날짜별 상세보기 페이지 (PostScreen.js)
    - 일정을 추가할 수 있음
    - 해당 날짜에 대한 기록을 올릴 수 있음

- ### 프로필 페이지

  - ProfileScreen.js
  - 가족 구성원의 프로필을 볼 수 있는 페이지 (ProfileDetailScreen.js)
  - 타 구성원의 프로필을 추가해 줄 수 있음

- ### 질문 페이지
  - QaScreen.js
  - 일주일에 한번 새로 생기는 질문에 대해 가족들끼리 답을 공유할 수 있음
