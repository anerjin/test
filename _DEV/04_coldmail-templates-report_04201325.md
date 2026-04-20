# 콜드메일 HTML 템플릿 구현 보고서 (2차 - 5개 템플릿)

> **작성일**: 2026-04-20
> **참조**: `_PLAN/neowave-design-analysis_04201304.md`, `_PLAN/coldmail-template-scenarios_04201315.md`
> **베이스 템플릿**: `templates/base-email.html`

---

## 1. 구현 개요

공통 베이스 템플릿의 디자인 시스템을 활용하여 5개의 콜드메일 HTML 템플릿을 제작했습니다.

| # | 템플릿명 | 파일 | 용도 | 라인 수 |
|---|----------|------|------|---------|
| 6 | 감사/Thank You | `templates/thankyou.html` | 미팅/프로젝트 완료 후 감사 | 365 |
| 7 | 이벤트/웨비나 초대 | `templates/event-invite.html` | 웨비나, 세미나, 워크숍 초대 | 460 |
| 8 | 케이스 스터디 공유 | `templates/case-study.html` | 성공 사례 공유를 통한 신뢰 구축 | 383 |
| 9 | 가격/견적 안내 | `templates/pricing.html` | 맞춤 견적서 전달 | 411 |
| 10 | 미팅 요청 | `templates/meeting-request.html` | 온/오프라인 미팅 요청 | 377 |

---

## 2. 공통 디자인 시스템

모든 템플릿은 베이스 템플릿의 디자인 토큰을 100% 준수합니다.

### 색상 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| Body 배경 | `#F5F0EB` | 이메일 바깥 배경 |
| 컨테이너 배경 | `#FFFFFF` | 메일 본문 영역 |
| 헤더/CTA | `#3D3229` (Deep Mocha) | 헤더 배경, 버튼 |
| 카드 배경 | `#E8E0D8` (Warm Cream) | 콘텐츠 카드, 푸터 |
| 본문 텍스트 | `#3C1E1E` (Dark Espresso) | 주요 본문 |
| 보조 텍스트 | `#6B5B4E` (Warm Gray) | 부가 설명 |
| 구분선 | `#D4C9BD` | Divider, 테이블 보더 |

### 다크 모드

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| email-bg | `#F5F0EB` | `#2A2118` |
| content-bg | `#FFFFFF` | `#1A1510` |
| card-bg | `#E8E0D8` | `#2A2118` |
| dark-text | `#3C1E1E` | `#F5F0EB` |
| secondary-text | `#6B5B4E` | `#C4B9AD` |

### 레이아웃

- 컨테이너: max-width `600px`, border-radius `16px`
- 카드: border-radius `12px`, padding `24px 28px`
- CTA 버튼: border-radius `8px`, padding `14px 32px`
- 모바일 반응형: `@media max-width: 620px`

---

## 3. 템플릿별 상세

### 6. 감사/Thank You (thankyou.html)

**톤앤매너**: Warm-Professional (따뜻함 우선)

**고유 섹션**:
- 감사 Hero 메시지 (구체적 감사 맥락)
- 논의 내용 요약 카드 (체크마크 + Next Step)
- 공유 자료 링크 카드 (아이콘 + 제목 + 다운로드)
- Dual CTA: 다음 미팅 일정 잡기 + 공유 자료 다운로드

**변수 플레이스홀더**:
- `{{thankyou_context}}` - 감사 맥락 설명
- `{{meeting_impression}}` - 미팅에서 인상 깊었던 점
- `{{discussion_point_1~3}}` - 논의 포인트 3개
- `{{next_step}}` - 다음 단계
- `{{resource_title}}`, `{{resource_description}}`, `{{resource_url}}` - 공유 자료

---

### 7. 이벤트/웨비나 초대 (event-invite.html)

**톤앤매너**: Professional-Inviting (초대하는 느낌)

**고유 섹션**:
- 이벤트 타입 배지 (pill 스타일, 헤더 우측)
- 다크 Hero 영역 (헤더 연장, `#3D3229` 배경)
- 이벤트 정보 카드 (일시/장소/소요시간/참가비 - 이모지 아이콘)
- 프로그램 안내 (번호 뱃지 + 세션명 + 연사)
- 추천 대상 카드 (보더 스타일)
- Dual CTA: 무료 등록하기 + 캘린더 추가

**변수 플레이스홀더**:
- `{{event_type}}` - Webinar / Workshop / Seminar
- `{{event_title}}`, `{{event_subtitle}}` - 이벤트 타이틀
- `{{event_date}}`, `{{event_location}}`, `{{event_duration}}`, `{{event_price}}`
- `{{session_1~3_title}}`, `{{session_1~3_speaker}}`, `{{session_1~3_time}}`
- `{{target_audience_1~3}}` - 추천 대상

---

### 8. 케이스 스터디 공유 (case-study.html)

**톤앤매너**: Professional-Narrative (스토리텔링)

**고유 섹션**:
- 클라이언트 정보 배지 (Client + Industry 좌우 배치)
- Before/After 카드 (좌: Warm Cream `#E8E0D8` / 우: Dark `#3D3229`)
- 핵심 성과 수치 3열 (32px Bold 숫자 + 라벨)
- 고객 인용문 (좌측 3px 보더라인 스타일)
- Dual CTA: 전체 케이스 스터디 읽기 + 우리 회사도 상담 받기

**변수 플레이스홀더**:
- `{{client_name}}`, `{{client_industry}}`
- `{{before_point_1~2}}`, `{{after_point_1~2}}`
- `{{stat_1~3_value}}`, `{{stat_1~3_label}}`
- `{{client_quote}}`, `{{client_quote_author}}`, `{{client_quote_title}}`

---

### 9. 가격/견적 안내 (pricing.html)

**톤앤매너**: Professional-Clear (격식+명료)

**고유 섹션**:
- 헤더 고객사 표시 (`{{client_company}} 견적 안내`)
- 견적 요약 테이블 (항목/금액 2열, 합계 행 다크 배경)
- 포함 사항 카드 (체크마크 리스트)
- 유효기간 & 결제 조건 카드 (보더 스타일, 2행)
- Triple CTA: 견적 승인하기 + PDF 다운로드 + 문의하기

**변수 플레이스홀더**:
- `{{client_company}}` - 고객사명
- `{{pricing_context}}` - 견적 배경 설명
- `{{item_1~3_name}}`, `{{item_1~3_price}}`, `{{total_price}}`
- `{{included_1~5}}` - 포함 사항 5개
- `{{quote_validity}}`, `{{payment_terms}}`
- `{{cta_pdf_url}}`, `{{sender_phone}}`, `{{sender_email}}`

---

### 10. 미팅 요청 (meeting-request.html)

**톤앤매너**: Professional-Respectful (존중하는 격식)

**고유 섹션**:
- 심플 헤더 (로고만, 태그라인 없음)
- 미팅 목적 3단 구성 (자기소개/미팅 이유/제공 가치)
- 미팅 아젠다 카드 (번호 뱃지 + 항목 + 시간 + 총 소요)
- 시간 제안 2열 (Option A / Option B 카드)
- Dual CTA: 미팅 일정 선택하기 + 다른 시간 제안하기 (mailto)

**변수 플레이스홀더**:
- `{{self_intro}}` - 간결한 자기소개
- `{{meeting_reason}}`, `{{meeting_value}}`
- `{{agenda_1~4}}`, `{{agenda_1~4_time}}`
- `{{meeting_duration}}` - 총 소요 시간
- `{{slot_a_date}}`, `{{slot_a_time}}`, `{{slot_b_date}}`, `{{slot_b_time}}`

---

## 4. 이메일 클라이언트 호환성

| 기능 | Gmail | Outlook | Apple Mail | 한메일/네이버 |
|------|-------|---------|------------|-------------|
| 라운드 보더 | O | VML fallback | O | O |
| 다크 모드 | O | 제한적 | O | X |
| 반응형 | O | 제한적 | O | O |
| 인라인 CSS | O | O | O | O |
| CTA 버튼 | O | VML roundrect | O | O |

### 호환성 처리 기법

- **Outlook VML**: `<!--[if mso]>` 조건문으로 CTA 버튼 VML roundrect 대체
- **다크 모드**: `@media (prefers-color-scheme: dark)` + 클래스 기반 오버라이드
- **반응형**: `@media max-width: 620px` + 모바일 전용 클래스
- **Apple Mail**: `a[x-apple-data-detectors]` 리셋으로 자동 링크 방지
- **포맷 감지 방지**: `format-detection` 메타로 전화/이메일 자동 감지 차단

---

## 5. 디자인 변형 규칙 준수

| 템플릿 | 헤더 크기 | 카드 수 | CTA 수 | 메일 길이 | 개인화 |
|--------|----------|---------|--------|----------|--------|
| 감사 | 표준 | 2 | 2 (Primary + Secondary) | 중간 | 높음 |
| 이벤트 초대 | 확장 (다크 Hero) | 3 | 2 (Primary + Secondary) | 긴편 | 중간 |
| 케이스 스터디 | 표준 | 2 | 2 (Primary + Secondary) | 긴편 | 중간 |
| 가격/견적 | 표준 | 2 | 3 (Primary + Secondary + Tertiary) | 긴편 | 높음 |
| 미팅 요청 | 심플 (로고만) | 1 + 시간카드 | 2 (Primary + Secondary) | 짧은편 | 높음 |

---

## 6. 파일 구조

```
templates/
├── base-email.html          (공통 베이스 - 이전 커밋)
├── thankyou.html             ← NEW (365 lines)
├── event-invite.html         ← NEW (460 lines)
├── case-study.html           ← NEW (383 lines)
├── pricing.html              ← NEW (411 lines)
└── meeting-request.html      ← NEW (377 lines)
```

총 1,996 lines의 프로덕션 레디 HTML 이메일 템플릿.

---

*모든 템플릿은 neowave.one 디자인 컨셉(Warm Premium)을 기반으로 하며, 100% 인라인 CSS로 이메일 클라이언트 호환성을 확보합니다.*
