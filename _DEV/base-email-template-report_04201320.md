# 콜드메일 베이스 HTML 템플릿 구현 보고서

> **산출물**: `templates/base-email.html`
> **작성일**: 2026-04-20
> **참조 문서**: `_PLAN/neowave-design-analysis_04201304.md`, `_PLAN/coldmail-template-scenarios_04201315.md`

---

## 1. 구현 요약

Neowave 디자인 가이드라인을 기반으로 모든 콜드메일 시나리오에 공통 적용되는 HTML/CSS 베이스 템플릿을 제작하였습니다.

### 핵심 특징
- **100% 인라인 CSS** — 이메일 클라이언트 호환성 최대화
- **반응형 레이아웃** — max-width: 600px, 모바일 620px 이하 대응
- **라운드 박스 디자인** — 컨테이너 16px, 카드 12px, 버튼 8px
- **Outlook VML 대응** — CTA 버튼에 VML roundrect 포함
- **다크모드 대응** — `prefers-color-scheme: dark` 미디어쿼리
- **접근성 준수** — role="article", aria-roledescription, lang 속성

---

## 2. 디자인 토큰 적용 현황

| 요소 | 디자인 가이드 | 구현값 | 상태 |
|------|-------------|--------|------|
| Body 배경 | `#F5F0EB` | `#F5F0EB` | ✅ |
| 컨테이너 배경 | `#FFFFFF` | `#FFFFFF` | ✅ |
| 헤더 배경 | `#3D3229` | `#3D3229` | ✅ |
| 본문 텍스트 | `#3C1E1E` | `#3C1E1E` | ✅ |
| 보조 텍스트 | `#6B5B4E` | `#6B5B4E` | ✅ |
| 카드 배경 | `#E8E0D8` | `#E8E0D8` | ✅ |
| CTA 버튼 | `#3D3229` + 흰 텍스트 | `#3D3229` + `#FFFFFF` | ✅ |
| 푸터 배경 | `#E8E0D8` | `#E8E0D8` | ✅ |
| 구분선 | `#D4C9BD` | `#D4C9BD` | ✅ |
| 컨테이너 radius | 16px | 16px | ✅ |
| 카드 radius | 12px | 12px | ✅ |
| 버튼 radius | 8px | 8px | ✅ |
| 그림자 | warm-tinted | `rgba(61,50,41,0.08)` | ✅ |

---

## 3. 템플릿 구조

```
┌─────────────────────────────────────┐
│  Body BG: #F5F0EB                   │
│  ┌─────────────────────────────┐    │
│  │  Container (600px, r:16px)  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  HEADER (#3D3229)     │  │    │
│  │  │  로고 + 태그라인       │  │    │
│  │  └───────────────────────┘  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  GREETING             │  │    │
│  │  │  "안녕하세요, OOO님"   │  │    │
│  │  └───────────────────────┘  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  HERO MESSAGE         │  │    │
│  │  │  h1 + 서브헤딩         │  │    │
│  │  └───────────────────────┘  │    │
│  │  ── Divider ──────────────  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  MAIN CONTENT         │  │    │
│  │  │  본문 + 카드(#E8E0D8) │  │    │
│  │  └───────────────────────┘  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  CTA BUTTON           │  │    │
│  │  │  Primary + Secondary  │  │    │
│  │  └───────────────────────┘  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  CLOSING              │  │    │
│  │  │  발신자 서명           │  │    │
│  │  └───────────────────────┘  │    │
│  │  ┌───────────────────────┐  │    │
│  │  │  FOOTER (#E8E0D8)     │  │    │
│  │  │  회사정보/SNS/수신거부 │  │    │
│  │  └───────────────────────┘  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 4. 변수 플레이스홀더 목록

### 필수 변수

| 변수 | 설명 | 예시값 |
|------|------|--------|
| `{{company_name}}` | 회사명 | Neowave |
| `{{company_url}}` | 회사 웹사이트 URL | https://neowave.one |
| `{{logo_url}}` | 로고 이미지 URL | https://neowave.one/logo.png |
| `{{recipient_name}}` | 수신자 이름 | 홍길동 |
| `{{recipient_email}}` | 수신자 이메일 | hong@example.com |
| `{{sender_name}}` | 발신자 이름 | 김네오 |
| `{{sender_title}}` | 발신자 직책 | Business Lead |
| `{{email_subject}}` | 이메일 제목 | AI 시대의 Creative Partner |
| `{{hero_heading}}` | 메인 헤딩 | 새 제품을 만들거나, 지금을 AI로 바꾸거나. |
| `{{hero_subheading}}` | 서브 헤딩 | Neowave는 Research + Build + Evolve... |
| `{{cta_primary_text}}` | CTA 버튼 텍스트 | 서비스 알아보기 → |
| `{{cta_primary_url}}` | CTA 링크 URL | https://neowave.one/services |
| `{{unsubscribe_url}}` | 수신거부 링크 | https://neowave.one/unsubscribe |

### 선택 변수

| 변수 | 설명 |
|------|------|
| `{{preheader_text}}` | 프리헤더 (미리보기 텍스트) |
| `{{header_tagline}}` | 헤더 우측 태그라인 |
| `{{main_content}}` | 본문 텍스트 |
| `{{card_title}}` | 콘텐츠 카드 제목 |
| `{{card_content}}` | 콘텐츠 카드 내용 |
| `{{cta_secondary_text}}` | 보조 CTA 텍스트 |
| `{{cta_secondary_url}}` | 보조 CTA 링크 |
| `{{company_address}}` | 회사 주소 |
| `{{company_phone}}` | 회사 전화번호 |
| `{{company_email}}` | 회사 이메일 |
| `{{social_website}}` | 웹사이트 링크 |
| `{{social_linkedin}}` | LinkedIn 링크 |
| `{{social_instagram}}` | Instagram 링크 |
| `{{icon_website}}` | 웹사이트 아이콘 이미지 URL |
| `{{icon_linkedin}}` | LinkedIn 아이콘 이미지 URL |
| `{{icon_instagram}}` | Instagram 아이콘 이미지 URL |

---

## 5. 이메일 클라이언트 호환성

| 클라이언트 | 호환 상태 | 비고 |
|-----------|----------|------|
| Gmail (Web) | ✅ | border-radius, 인라인 CSS 정상 |
| Gmail (App) | ✅ | 반응형 미디어쿼리 지원 |
| Apple Mail | ✅ | 다크모드 포함 완전 지원 |
| Outlook 2016+ | ⚠️ | border-radius 미지원 → VML 대응 |
| Outlook Web | ✅ | 정상 렌더링 |
| 네이버 메일 | ✅ | 정상 렌더링 |
| 다음 메일 | ✅ | 정상 렌더링 |

---

## 6. 사용법

각 시나리오 템플릿에서 `base-email.html`의 `MAIN CONTENT` 영역을 교체하여 사용합니다.

```
1. base-email.html 복사
2. {{변수}} 값 치환
3. MAIN CONTENT 영역에 시나리오별 콘텐츠 삽입
4. Secondary CTA 필요 시 주석 해제
5. 이메일 발송 도구에 HTML 업로드
```
