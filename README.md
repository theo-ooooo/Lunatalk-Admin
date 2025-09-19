# Lunatalk Admin

Lunatalk 관리자 대시보드입니다. React, TypeScript, Vite를 기반으로 구축되었습니다.

## 🚀 주요 기능

### 📦 상품 관리

- 상품 목록 조회 및 검색
- 상품 등록, 수정, 삭제
- 상품 이미지 업로드 (S3 연동)
- 카테고리별 상품 분류
- 상품 가시성 관리

### 👥 회원 관리

- 회원 목록 조회 및 검색
- 회원 상세 정보 확인
- 회원별 주문 내역 조회
- 회원 정보 관리

### 📋 주문 관리

- 주문 목록 조회 및 필터링
- 주문 상세 정보 확인
- 주문 상태 관리
- 배송 정보 관리

### 🎨 기획전 관리

- 기획전 목록 조회
- 기획전 등록, 수정, 삭제
- 기획전 상품 선택 및 순서 관리
- 기획전 기간 및 공개 상태 관리

### 🏷️ 카테고리 관리

- 카테고리 목록 조회
- 카테고리 등록, 수정, 삭제
- 카테고리 계층 구조 관리

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **UI Library**: Radix UI, Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Form Management**: React Hook Form + Zod
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Date Handling**: Day.js
- **Icons**: Lucide React

## 📁 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── ui/             # UI 컴포넌트 (Radix UI 기반)
│   └── shared/         # 공유 컴포넌트
├── features/           # 기능별 모듈
│   ├── auth/           # 인증 관련
│   ├── products/       # 상품 관리
│   ├── members/        # 회원 관리
│   ├── orders/         # 주문 관리
│   ├── exhibitions/    # 기획전 관리
│   └── categories/     # 카테고리 관리
├── layouts/            # 레이아웃 컴포넌트
├── lib/                # 유틸리티 및 설정
└── router/             # 라우팅 설정
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- Yarn

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# 빌드 미리보기
yarn preview
```

## 🔧 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_TITLE=Lunatalk Admin
```

## 📝 주요 기능 상세

### 상품 관리

- 상품 CRUD 작업
- 이미지 업로드 (S3 Presigned URL 사용)
- 상품 검색 및 필터링
- 카테고리별 상품 분류

### 기획전 관리

- 기획전 생성 및 수정
- 상품 선택 및 순서 관리
- 기간 설정 및 공개 상태 관리
- 기획전별 상품 목록 표시

### 주문 관리

- 주문 목록 조회 및 필터링
- 주문 상세 정보 확인
- 주문 상태 업데이트
- 배송 정보 관리

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **다크/라이트 모드**: 사용자 선호도에 따른 테마 변경
- **접근성**: WCAG 가이드라인 준수
- **일관된 디자인**: Radix UI 기반 컴포넌트 시스템

## 🔒 보안

- JWT 토큰 기반 인증
- API 요청 인증 헤더 자동 추가
- 민감한 정보 환경 변수 관리

## 📱 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
