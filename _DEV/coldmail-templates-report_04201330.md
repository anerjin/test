# 콜드메일 HTML 템플릿 제작 보고서

## 개요
neowave.one 디자인 컨셉 기반 콜드메일 HTML 템플릿 5종 제작 완료.

## 디자인 시스템

### 컬러 팔레트 (Neowave 톤앤매너)
| 용도 | 색상코드 | 설명 |
|------|----------|------|
| Background | `#f5f0eb` | 따뜻한 베이지 배경 |
| Card | `#ffffff` | 화이트 카드 |
| Primary Text | `#3D3229` | 다크 브라운 (헤드라인) |
| Body Text | `#5a5049` | 미디엄 브라운 (본문) |
| Secondary Text | `#7a6e63` | 소프트 브라운 (서브텍스트) |
| Muted Text | `#a89b8c` | 라이트 브라운 (레이블) |
| Accent BG | `#faf7f4` | 따뜻한 크림 (카드 내부) |
| Border | `#e8e0d8` / `#ece6df` | 따뜻한 베이지 보더 |
| CTA Button | `#3D3229` bg + `#f5f0eb` text | 다크 브라운 버튼 |

### 타이포그래피
- **헤드라인**: 24-28px, font-weight: 700
- **서브텍스트**: 16px, line-height: 1.7
- **본문**: 15-16px, line-height: 1.6-1.7
- **레이블**: 12-13px, letter-spacing: 1-1.5px, uppercase

### 레이아웃
- **최대 너비**: 600px (이메일 표준)
- **카드 border-radius**: 20px
- **내부 카드 radius**: 10-16px
- **CTA 버튼 radius**: 12px
- **카드 패딩**: 48px (데스크톱) / 24px (모바일)
- **Shadow**: `0 4px 16px rgba(61, 50, 41, 0.06)`

## 제작 템플릿 목록

### 1. 서비스 소개 (service-intro.html)
- **목적**: 자사 서비스를 처음 소개하는 콜드메일
- **구조**: 카테고리 뱃지 → 헤드라인 → 인사 → 3개 피처 카드 → CTA → 서명
- **변수**: 15개 (`HEADLINE`, `FEATURE_1_TITLE/DESC` 등)

### 2. 프로젝트 제안서 (project-proposal.html)
- **목적**: 구체적인 프로젝트를 제안하는 메일
- **구조**: 프로젝트 뱃지 → 타이틀/메타 → 개요 박스 → 범위 체크리스트 → 예산/기간 2열 → CTA
- **변수**: 20개 (`PROJECT_TITLE`, `BUDGET`, `TIMELINE`, `SCOPE_1-4` 등)

### 3. 포트폴리오 공유 (portfolio-share.html)
- **목적**: 포트폴리오를 공유하며 관심을 유도
- **구조**: 헤더 → 3개 프로젝트 카드 (이미지+설명) → CTA → 전체 포트폴리오 링크
- **변수**: 18개 (`PROJECT_1_IMAGE/TITLE/CATEGORY/DESC` 등)

### 4. 협업/파트너십 제안 (partnership.html)
- **목적**: 상호 시너지를 강조한 파트너십 제안
- **구조**: 뱃지 → 헤드라인 → 2열 시너지 비교 → 기대 성과 다크박스 → 3단계 프로세스 → CTA
- **변수**: 22개 (`OUR_STRENGTH_1-3`, `THEIR_STRENGTH_1-3`, `EXPECTED_OUTCOME` 등)

### 5. 후속 팔로업 (followup.html)
- **목적**: 이전 연락에 대한 부담 없는 팔로업
- **구조**: 헤더 → 컨텍스트 → 이전 내용 요약 박스 → 추가 가치 제공 → A/B/C 응답 옵션 → CTA
- **변수**: 16개 (`PREVIOUS_SUMMARY`, `OPTION_A/B/C`, `VALUE_ADD_TITLE` 등)

## 기술 사양

### 이메일 클라이언트 호환성
- **테이블 기반 레이아웃**: 모든 구조를 `<table>` 태그로 구성
- **인라인 CSS**: 모든 스타일을 inline으로 적용
- **Outlook VML**: `v:roundrect`로 Outlook에서 라운드 코너 지원
- **MSO 조건부 주석**: Outlook 전용 폴백 처리
- **Apple Mail 링크 감지 방지**: `a[x-apple-data-detectors]` 리셋

### 반응형
- **브레이크포인트**: 620px
- **모바일 패딩**: 48px → 24px
- **스택 컬럼**: 2열 레이아웃이 모바일에서 1열로 전환

### 접근성
- `role="presentation"` 모든 레이아웃 테이블에 적용
- `lang="ko"` 문서 언어 설정
- 시맨틱 heading 구조 (h1 하나만 사용)
- 이미지에 alt 텍스트 포함

### 공통 변수 (모든 템플릿)
| 변수 | 용도 |
|------|------|
| `{{COMPANY_NAME}}` | 발신 회사명 |
| `{{SENDER_NAME}}` | 발신자 이름 |
| `{{SENDER_TITLE}}` | 발신자 직함 |
| `{{SENDER_EMAIL}}` | 발신자 이메일 |
| `{{SENDER_PHONE}}` | 발신자 전화번호 |
| `{{RECIPIENT_NAME}}` | 수신자 이름 |
| `{{RECIPIENT_EMAIL}}` | 수신자 이메일 |
| `{{PREVIEW_TEXT}}` | 이메일 미리보기 텍스트 |
| `{{WEBSITE_URL}}` | 웹사이트 URL |
| `{{UNSUBSCRIBE_URL}}` | 수신거부 URL |
| `{{COMPANY_ADDRESS}}` | 회사 주소 |
| `{{CTA_URL}}` | CTA 버튼 링크 |
| `{{CTA_TEXT}}` | CTA 버튼 텍스트 |
| `{{CLOSING_MESSAGE}}` | 마무리 메시지 |

## 파일 구조
```
templates/
├── service-intro.html      # 서비스 소개
├── project-proposal.html   # 프로젝트 제안서
├── portfolio-share.html    # 포트폴리오 공유
├── partnership.html        # 협업/파트너십 제안
└── followup.html           # 후속 팔로업
```
