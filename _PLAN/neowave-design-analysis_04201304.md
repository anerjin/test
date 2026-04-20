# Neowave 디자인 컨셉 분석 & 콜드메일 템플릿 디자인 가이드라인

> **분석 대상**: https://neowave.one/
> **목적**: 콜드메일 HTML 템플릿에 적용할 디자인 가이드라인 수립
> **작성일**: 2026-04-20

---

## 1. 색상 팔레트 (Color Palette)

### 1.1 Core Colors

| 역할 | 색상명 | HEX | RGB | 용도 |
|------|--------|-----|-----|------|
| **Primary BG** | Warm Cream | `#E8E0D8` | 232, 224, 216 | 메일 본문 배경, 카드 배경 |
| **Secondary BG** | Soft Ivory | `#F5F0EB` | 245, 240, 235 | 메일 외곽 배경 (body) |
| **Dark Accent** | Deep Mocha | `#3D3229` | 61, 50, 41 | 헤더, CTA 버튼, 강조 텍스트 |
| **Text Primary** | Dark Espresso | `#3C1E1E` | 60, 30, 30 | 본문 텍스트 |
| **Text Secondary** | Warm Gray | `#6B5B4E` | 107, 91, 78 | 보조 설명, 캡션 |
| **Point Color** | Kakao Yellow | `#FEE500` | 254, 229, 0 | 액센트, 하이라이트 (제한적 사용) |
| **White** | Pure White | `#FFFFFF` | 255, 255, 255 | 카드 내부, 버튼 텍스트 |
| **Border** | Subtle Tan | `#D4C9BD` | 212, 201, 189 | 구분선, 카드 보더 |

### 1.2 이메일 적용 컬러 매핑

```
Body 배경 ─────────── #F5F0EB (Soft Ivory)
  └─ 메일 컨테이너 ── #FFFFFF (White) 또는 #E8E0D8 (Warm Cream)
      ├─ 헤더 영역 ── #3D3229 (Deep Mocha) + #FFFFFF 텍스트
      ├─ 본문 영역 ── #FFFFFF 배경 + #3C1E1E 텍스트
      ├─ 강조 카드 ── #E8E0D8 배경 + #3D3229 텍스트
      ├─ CTA 버튼 ── #3D3229 배경 + #FFFFFF 텍스트
      └─ 푸터 영역 ── #E8E0D8 배경 + #6B5B4E 텍스트
```

### 1.3 색상 사용 비율

| 색상 | 비율 | 적용 영역 |
|------|------|-----------|
| Warm Cream / Ivory | **60%** | 배경, 여백 |
| White | **20%** | 카드 내부, 콘텐츠 영역 |
| Deep Mocha | **15%** | 헤더, 버튼, 강조 요소 |
| Point Yellow | **5%** | 하이라이트, 배지 (극히 제한적) |

---

## 2. 타이포그래피 (Typography)

### 2.1 폰트 시스템

이메일 호환성을 위해 웹세이프 폰트 기반으로 구성합니다.

```css
/* 한글 중심 폰트 스택 */
font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;

/* 영문 보조 폰트 스택 */
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;

/* 이메일 Fallback (웹폰트 미지원 클라이언트) */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
```

### 2.2 타입 스케일

| 요소 | 크기 (px) | 굵기 | 행간 | 용도 |
|------|-----------|------|------|------|
| **Hero Heading** | 28-32px | Bold (700) | 1.3 | 메일 상단 핵심 메시지 |
| **Section Title** | 22-24px | SemiBold (600) | 1.4 | 섹션 구분 제목 |
| **Sub Heading** | 18-20px | SemiBold (600) | 1.4 | 소제목, 강조 문구 |
| **Body Text** | 15-16px | Regular (400) | 1.6 | 본문 텍스트 |
| **Small Text** | 13-14px | Regular (400) | 1.5 | 캡션, 푸터 텍스트 |
| **CTA Button** | 15-16px | SemiBold (600) | 1.0 | 버튼 텍스트 |

### 2.3 한글-영문 혼합 스타일

Neowave의 핵심 톤은 **한글과 영문을 자연스럽게 혼합**하는 선언적 문장 구조입니다.

**스타일 특징:**
- 한글 본문 중 핵심 키워드를 영문으로 표기 (예: "AI 시대의 **Creative Partner**")
- 강조 구문에 이탤릭 + 밑줄 조합 사용
- 짧고 임팩트 있는 선언형 문장 (2-3줄 이내)
- 서비스명/브랜드명은 영문 유지

**콜드메일 적용 예시:**
```
새 제품을 만들거나,
지금을 AI로 바꾸거나.

Neowave는 Research + Build + Evolve
세 단계로 고객의 비전을 실현합니다.
```

---

## 3. 레이아웃 (Layout)

### 3.1 전체 구조

Neowave 사이트는 **미니멀 + 따뜻한 프리미엄** 톤을 유지합니다.

```
┌─────────────────────────────────────┐
│         Body BG: #F5F0EB            │
│  ┌─────────────────────────────┐    │
│  │    메일 컨테이너 (600px)     │    │
│  │    border-radius: 16px      │    │
│  │                             │    │
│  │  ┌───────────────────────┐  │    │
│  │  │   헤더 (로고 + 인사)   │  │    │
│  │  │   BG: #3D3229         │  │    │
│  │  │   radius: 16px 16px   │  │    │
│  │  │          0     0      │  │    │
│  │  └───────────────────────┘  │    │
│  │                             │    │
│  │  ┌───────────────────────┐  │    │
│  │  │   핵심 메시지 영역     │  │    │
│  │  │   Hero Statement      │  │    │
│  │  └───────────────────────┘  │    │
│  │                             │    │
│  │  ┌───────────────────────┐  │    │
│  │  │   제안 내용 카드       │  │    │
│  │  │   BG: #E8E0D8         │  │    │
│  │  │   radius: 12px        │  │    │
│  │  └───────────────────────┘  │    │
│  │                             │    │
│  │  ┌───────────────────────┐  │    │
│  │  │   CTA 버튼 영역       │  │    │
│  │  └───────────────────────┘  │    │
│  │                             │    │
│  │  ┌───────────────────────┐  │    │
│  │  │   푸터                 │  │    │
│  │  │   BG: #E8E0D8         │  │    │
│  │  │   radius: 0 0 16px    │  │    │
│  │  │              16px     │  │    │
│  │  └───────────────────────┘  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 3.2 간격 시스템 (Spacing)

| 단위 | 크기 | 용도 |
|------|------|------|
| **XS** | 8px | 인라인 요소 간격 |
| **SM** | 16px | 텍스트 블록 간 간격 |
| **MD** | 24px | 섹션 내부 패딩 |
| **LG** | 32px | 섹션 간 구분 |
| **XL** | 48px | 주요 섹션 간 여백 |

### 3.3 컨테이너 규격

| 속성 | 값 | 설명 |
|------|-----|------|
| **메일 최대 너비** | 600px | 이메일 표준 호환 |
| **콘텐츠 패딩** | 32px 좌우 | 모바일: 24px |
| **섹션 간 간격** | 32-48px | 시각적 호흡감 확보 |

---

## 4. 라운드 박스 스타일 (Rounded Box Guide)

### 4.1 Border-Radius 시스템

| 요소 | border-radius | 사용처 |
|------|---------------|--------|
| **메일 컨테이너** | `16px` | 전체 메일 외곽 |
| **콘텐츠 카드** | `12px` | 제안 내용, 서비스 설명 카드 |
| **CTA 버튼** | `8px` | 주요 행동 유도 버튼 |
| **인라인 배지** | `20px` (pill) | 태그, 라벨 |
| **아바타/아이콘** | `50%` (원형) | 프로필, 아이콘 컨테이너 |

### 4.2 그림자 (Box Shadow)

```css
/* 카드 기본 그림자 - 따뜻한 톤 */
box-shadow: 0 4px 16px rgba(61, 50, 41, 0.08);

/* 카드 호버/강조 그림자 */
box-shadow: 0 6px 20px rgba(61, 50, 41, 0.12);

/* 버튼 그림자 */
box-shadow: 0 2px 8px rgba(61, 50, 41, 0.10);
```

> **핵심**: 그림자 색상에 `rgba(0,0,0,...)` 대신 Deep Mocha 톤(`rgba(61,50,41,...)`)을 사용하여 따뜻한 느낌 유지

### 4.3 카드 컴포넌트 스타일

```css
/* 기본 콘텐츠 카드 */
.card-default {
    background-color: #E8E0D8;
    border-radius: 12px;
    padding: 24px 28px;
    border: none;
    box-shadow: none; /* 플랫 스타일 */
}

/* 강조 콘텐츠 카드 (흰색 배경) */
.card-highlight {
    background-color: #FFFFFF;
    border-radius: 12px;
    padding: 24px 28px;
    border: 1px solid #D4C9BD;
    box-shadow: 0 4px 16px rgba(61, 50, 41, 0.08);
}

/* 다크 카드 (헤더/CTA 영역) */
.card-dark {
    background-color: #3D3229;
    border-radius: 12px;
    padding: 28px 32px;
    color: #FFFFFF;
}
```

### 4.4 CTA 버튼 스타일

```css
/* Primary CTA */
.btn-primary {
    background-color: #3D3229;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 14px 32px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
}

/* Secondary CTA */
.btn-secondary {
    background-color: transparent;
    color: #3D3229;
    border: 1.5px solid #3D3229;
    border-radius: 8px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
}
```

---

## 5. 디자인 톤 & 무드 (Design Tone)

### 5.1 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| **Warm Premium** | 차갑지 않은 프리미엄. 베이지/크림 톤으로 접근성 있는 고급감 |
| **Minimal Confidence** | 과장 없이 핵심만 전달하는 자신감 있는 미니멀리즘 |
| **Human-Centered Tech** | AI/기술을 이야기하되 따뜻하고 인간적인 톤 유지 |
| **Bilingual Elegance** | 한글-영문 혼합이 자연스럽고 세련된 브랜드 표현 |

### 5.2 DO & DON'T

| DO (권장) | DON'T (지양) |
|-----------|-------------|
| 따뜻한 베이지/크림 배경 사용 | 순백색(#FFF) 단독 배경 |
| 라운드된 부드러운 카드 형태 | 직각(0px radius) 박스 |
| 짧고 선언적인 문장 | 장문의 설명형 문장 |
| Deep Mocha 단일 강조색 | 다수의 원색 동시 사용 |
| 충분한 여백 (breathing room) | 정보 과밀 배치 |
| 한글+영문 자연스러운 혼합 | 영문 전용 또는 한글 전용 |
| 따뜻한 톤의 그림자 (brown-tinted) | 차가운 회색/검정 그림자 |

### 5.3 브랜드 보이스 (콜드메일 톤앤매너)

```
[격식 스펙트럼]
격식적 ──────────●───── 캐주얼
                ↑
            여기 (Professional-Friendly)

[어조]
- 자신감 있되 겸손한
- 전문적이되 딱딱하지 않은
- 간결하되 따뜻한
- 제안하되 강요하지 않는
```

---

## 6. 이메일 클라이언트 호환성 노트

### 6.1 border-radius 지원

| 클라이언트 | border-radius 지원 | 대응 방안 |
|-----------|-------------------|-----------|
| Gmail (Web/App) | O | 정상 렌더링 |
| Apple Mail | O | 정상 렌더링 |
| Outlook (2016+) | X (무시됨) | VML 라운드 테이블 사용 |
| Outlook (Web) | O | 정상 렌더링 |
| 네이버 메일 | O | 정상 렌더링 |
| 다음 메일 | O | 정상 렌더링 |

### 6.2 Outlook 대응 코드

```html
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
  style="height:44px;v-text-anchor:middle;width:200px;"
  arcsize="18%"
  fillcolor="#3D3229">
  <w:anchorlock/>
  <center style="color:#ffffff;font-size:15px;font-weight:600;">
    미팅 요청하기
  </center>
</v:roundrect>
<![endif]-->
```

### 6.3 웹폰트 Fallback

```html
<!-- Google Fonts (지원 클라이언트용) -->
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700&display=swap" rel="stylesheet">

<!-- Fallback은 font-family 스택으로 자동 처리 -->
```

---

## 7. 콜드메일 템플릿 적용 요약

### 체크리스트

- [ ] 전체 컨테이너: `border-radius: 16px`, max-width: 600px
- [ ] 배경색: Body `#F5F0EB`, 컨테이너 `#FFFFFF`
- [ ] 헤더: `#3D3229` 배경, 흰색 로고/텍스트
- [ ] 본문: `#3C1E1E` 텍스트, 15-16px, 행간 1.6
- [ ] 제안 카드: `#E8E0D8` 배경, `border-radius: 12px`, 패딩 24px
- [ ] CTA 버튼: `#3D3229` 배경, 흰색 텍스트, `border-radius: 8px`
- [ ] 푸터: `#E8E0D8` 배경, `#6B5B4E` 텍스트
- [ ] 그림자: warm-tinted `rgba(61,50,41,0.08)`
- [ ] 여백: 섹션 간 32-48px 간격
- [ ] 한글-영문 혼합 톤앤매너 적용

---

*이 가이드라인은 neowave.one 웹사이트 디자인 분석을 기반으로 작성되었으며, 콜드메일 HTML 템플릿 제작의 디자인 기준 문서로 활용됩니다.*
