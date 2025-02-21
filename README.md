#프로젝트 구조
```
project/
│
├── models/ # 데이터베이스 스키마 정의
│   ├── groupModel.js # 그룹 관련 데이터 모델
│   ├── postModel.js # 게시글(추억) 관련 데이터 모델
│   ├── commentModel.js # 댓글 관련 데이터 모델
│
├── controllers/ # API 로직 구현
│   ├── groupController.js # 그룹 관련 API 로직
│   ├── postController.js # 게시글(추억) 관련 API 로직
│   ├── commentController.js # 댓글 관련 API 로직
│
├── routes/ # 라우터 설정
│   ├── groupRoute.js # 그룹 관련 라우터
│   ├── postRoute.js # 게시글(추억) 관련 라우터
│   ├── commentRoute.js # 댓글 관련 라우터
│   ├── badgeRoute.js # 배지 관련 라우터
│
├── .env # 환경 변수 설정 파일
├── app.js # Express 서버 설정 및 라우터 연결
├── package.json # 프로젝트 설정 및 종속성 관리 파일
├── README.md # 프로젝트 설명 파일
```
#시스템구조
```
+------------------+     +----------------------+
| Web/Mobile App  | <--> | Express.js Server   |
+------------------+     +----------------------+
                               |
                               |
                       +----------------+
                       |    MongoDB     |
                       +----------------+
```
