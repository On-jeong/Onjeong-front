<br />
<div align="center">
  <a href="https://www.onjeong-app.com/">
    <img src="https://onjeong-prod.s3.ap-northeast-2.amazonaws.com/profile/24c4b2d3-be1c-4bd8-8d95-79e7a66ce23eonjeong%20logo.png?s=200&v=4" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Onjeong-Backend</h3>

  <p align="center">
    온정의 Frontend github입니다.
    <br />
    <a href="https://github.com/On-jeong"><strong>1. Explore the Organization</strong></a><br>
    <a href="https://github.com/On-jeong/Onjeong-front"><strong>2. Explore Front Repository</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    <!-- · -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <!-- <a href="#about-the-project">About The Project</a> -->
      <a href="#built-with">Built With</a>
    </li>
    <li><a href="#Dependencies">Dependencies</a></li>
    <li><a href="#File Structure">File Structure</a></li>
    <li><a href="#Main Screen Structure">Main Screen Structure</a></li>
    <li><a href="#Developers">Developers</a></li>
  </ol>
</details>


<!--Built with -->
### Built With

<b id="Built With">Frontend</b>

-   [React Native](https://reactnative.dev/)
-   [React-Query](https://react-query-v3.tanstack.com/)
-   [Recoil](https://recoiljs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>
<br/>
<br/>
<hr/>

<!--Dependencies -->
### Dependencies

#### react-native
<ul id="Dependencies">
 <li> 서버 상태관리 라이브러리 : react-query </li><br/>
 <li> 프론트 상태관리 라이브러리 : recoil </li>
</ul>
<br/>
<hr/>
<br/>

<!--File Structure -->
### File Structure
<ul id="File Structure">
  <li> src/api : custom axios 및 interceptors </li><br/>
  <li> src/assets : fonts, icons, images </li><br/>
  <li> src/components : buttons, headers, IconButtons, inputs, Loading, Modal </li><br/>
  <li> src/config : custom AsyncStorage </li><br/>
  <li> src/hooks : react-query hooks </li><br/>
  <li> src/navigators : Bottom Navigator, stack Navigator </li><br/>
  <li> src/screens : all screens </li><br/>
  <li> src/state : recoil states </li><br/>
  <li> src/ui/icons : export svg icons </li><br/>
  <li> src/utils : export FlowerImagePaths, globalFonts, globalStyles </li>
</ul>
<br/>
<hr/>
<br/>


<!--Main Screen Structure -->
### Main Screen Structure

<h4 id="Main Screen Structure"> All the files below are in the "src/screens/..." </h4>

- #### Main Page

  - HomeScreen.js
  - 꽃을 볼 수 있는 메인 페이지
  
- #### Mail Page
  
  - MailScreen.js
  - 보낸/받은 매일들을 볼 수 있는 페이지
  - 각 메일 별 상세보기 페이지(MailDetailScreen.js)
  - 새 메일 작성 페이지(MailWriteScreen.js)

- #### Calendar Page

  - CalendarScreen.js
  - 가족끼리의 이벤트나 일정을 공유할 수 있는 페이지
  - 각 날짜별 상세보기 페이지 (PostScreen.js)
    - 일정을 추가
    - 해당 날짜에 대한 상세한 기록

- #### Profile Page

  - ProfileScreen.js
  - 가족 구성원의 프로필을 볼 수 있는 페이지 (ProfileDetailScreen.js)
  - 본인의 프로필 수정 가능
  - 타 구성원의 프로필 수정 가능

- #### Question&Aswer Page
  - QaScreen.js
  - 일주일에 한번 새로 생기는 질문에 대해 가족들끼리 문답 공유

- #### ETC
  - AlertScreen.js
    - 지금까지의 알림 목록
  - MyScreen.js 
    - setting 변경
    - user information 변경
<br/>
<hr/>
<br/>


<!--Developers -->
### Developers

<table id="Developers">
  <tr>
    <td align="center">
      <a href="https://github.com/hyeonjin25">
        <img src="https://onjeong-prod.s3.ap-northeast-2.amazonaws.com/profile/24c4b2d3-be1c-4bd8-8d95-79e7a66ce23eonjeong%20logo.png?v=4" width="110px;" alt=""/><br />
        <sub><b>소현진</b></sub></a><br />
        <sub><b>Front-end</b></sub></a><br />
        <a href="https://github.com/hyeonjin25" title="Code">💻</a>
    </td>
  </tr>
</table>  

<p align="right">(<a href="#top">back to top</a>)</p>

