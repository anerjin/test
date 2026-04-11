# 코드 리뷰 보고서

> **프로젝트**: 명함공방 (Premium Business Card Studio)
> **리뷰 일시**: 2026-04-12
> **리뷰어**: Senior Code Reviewer (AI)
> **대상 파일**: `index.html`, `css/custom.css`, `js/main.js`, `robots.txt`, `sitemap.xml`

---

## 종합 평가

| 카테고리 | 점수 | 등급 |
|----------|------|------|
| **코드 품질** | 8.5 / 10 | A |
| **접근성 (a11y)** | 8.0 / 10 | A- |
| **성능** | 6.5 / 10 | B- |
| **보안** | 7.5 / 10 | B+ |
| **SEO** | 8.5 / 10 | A |
| **다크모드** | 9.0 / 10 | A+ |
| **반응형 디자인** | 8.5 / 10 | A |
| **종합** | **8.1 / 10** | **A-** |

---

## 1. Critical 이슈 (즉시 수정 필요)

### [critical] C-01: Lucide Icons CDN에 버전 고정 없음

**파일**: `index.html` (Line 77)

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

**문제**: `@latest` 태그를 사용하면 메이저 버전 업데이트 시 breaking change로 인해 아이콘이 렌더링되지 않거나 레이아웃이 깨질 수 있습니다. 프로덕션 환경에서는 절대 `@latest`를 사용하지 않아야 합니다.

**개선안**:
```html
<script src="https://unpkg.com/lucide@0.460.0"></script>
```

---

### [critical] C-02: Formspree 엔드포인트 플레이스홀더 사용

**파일**: `index.html` (Line 921)

```html
<form id="contact-form" action="https://formspree.io/f/xzzzzzzz" ...>
```

**문제**: `xzzzzzzz`는 더미 엔드포인트입니다. 실제 배포 시 폼 제출이 모두 실패합니다. 사용자가 정상적으로 접수 양식을 보내도 서버 오류가 발생합니다.

**개선안**: 실제 Formspree 프로젝트 ID로 교체하거나, 자체 백엔드 API 엔드포인트를 설정하세요.

---

### [critical] C-03: Tailwind CSS CDN 프로덕션 사용

**파일**: `index.html` (Line 51)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

**문제**: Tailwind CSS CDN은 **개발 전용**입니다. 프로덕션에서 사용 시:
- 런타임 JS 엔진이 매 페이지 로드마다 CSS를 생성 (성능 저하)
- 초기 로드 시 FOUC(Flash of Unstyled Content) 발생 가능
- CDN 장애 시 전체 스타일링 소실
- gzip 후에도 ~300KB 이상의 불필요한 JavaScript 로드

**개선안**: Tailwind CLI 빌드 파이프라인 도입
```bash
npx tailwindcss -o css/tailwind.min.css --minify
```
```html
<link rel="stylesheet" href="css/tailwind.min.css">
```

---

### [critical] C-04: 파일 업로드 시 서버사이드 검증 부재

**파일**: `index.html` (Line 1030), `js/main.js`

```html
<input type="file" id="designFile" name="designFile" accept=".ai,.pdf,.jpg,.jpeg,.png">
```

**문제**: `accept` 속성은 클라이언트 사이드 힌트일 뿐이며, 악의적 사용자는 쉽게 우회할 수 있습니다. JavaScript에서도 파일 크기/타입 검증이 없습니다. Formspree에서 대용량 파일을 처리하지 못할 수 있으며, 악성 파일 업로드 위험이 있습니다.

**개선안**: JavaScript에서 클라이언트 사이드 검증 추가
```javascript
var designFile = form.querySelector('#designFile');
if (designFile && designFile.files.length > 0) {
  var file = designFile.files[0];
  var maxSize = 10 * 1024 * 1024; // 10MB
  var allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

  if (file.size > maxSize) {
    showError('designFile', '파일 크기는 10MB 이하여야 합니다.');
    return;
  }
  if (!allowedTypes.includes(file.type) && !file.name.endsWith('.ai')) {
    showError('designFile', '허용된 파일 형식: AI, PDF, JPG, PNG');
    return;
  }
}
```

---

## 2. Major 이슈 (조속히 수정 권장)

### [major] M-01: XSS 취약점 — `innerHTML` 사용

**파일**: `js/main.js` (Line 316, 608, 635)

```javascript
dotsContainer.innerHTML = '';        // Line 316
submitBtn.innerHTML = '<span ...>';  // Line 608
submitBtn.innerHTML = originalBtnHTML; // Line 635
```

**문제**: `innerHTML` 사용은 XSS 공격 벡터가 될 수 있습니다. 현재 코드에서는 사용자 입력이 직접 삽입되지 않지만, 향후 코드 변경 시 위험할 수 있습니다.

**개선안**: `textContent` 또는 `DOM API`(createElement/appendChild)를 사용하세요. 특히 `dotsContainer.innerHTML = ''`는 `dotsContainer.replaceChildren()`으로 대체 가능합니다.

---

### [major] M-02: 이벤트 리스너 누적 (메모리 릭 가능성)

**파일**: `js/main.js` — `showModal()` (Line 645~681)

```javascript
function showModal(modalId) {
  // ...
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', closeModal, { once: true });
  });

  modal.addEventListener('click', function handler(e) { ... });
  document.addEventListener('keydown', function handler(e) { ... });
}
```

**문제**: `showModal()`이 호출될 때마다 `document`에 새로운 `keydown` 이벤트 리스너가 추가됩니다. `modal.classList.contains('open')` 체크가 있지만, 리스너 자체는 `closeModal` 호출 후에만 제거됩니다. ESC 키를 누르지 않고 배경 클릭으로 닫는 경우 `keydown` 리스너가 제거되지 않습니다.

**개선안**: `AbortController`를 사용하거나 `closeModal` 내에서 모든 리스너를 일괄 정리하세요:
```javascript
function showModal(modalId) {
  var controller = new AbortController();

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    controller.abort(); // 모든 리스너 일괄 해제
  }

  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  }, { signal: controller.signal });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  }, { signal: controller.signal });
}
```

---

### [major] M-03: Lightbox `keydown` 이벤트 리스너 전역 등록

**파일**: `js/main.js` (Line 718~722)

```javascript
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});
```

**문제**: 이 리스너는 페이지 전체 수명 동안 매 키 입력마다 실행됩니다. Lightbox가 열려있지 않을 때도 불필요하게 호출됩니다.

**개선안**: Lightbox 열림 시에만 리스너를 등록하고, 닫힘 시 제거하세요.

---

### [major] M-04: 포트폴리오 필터 `setTimeout` 누적

**파일**: `js/main.js` (Line 257, 267)

```javascript
// 숨김 처리 시
setTimeout(function () {
  item.style.display = 'none';
}, 300);
```

**문제**: 필터 버튼을 빠르게 연속 클릭하면 이전 `setTimeout`이 취소되지 않아 아이템이 깜빡이거나 예기치 않은 상태가 됩니다.

**개선안**: `setTimeout` ID를 저장하고 새 필터 적용 전에 `clearTimeout` 처리하세요:
```javascript
var hideTimers = [];

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    hideTimers.forEach(clearTimeout);
    hideTimers = [];
    // ... 나머지 로직
  });
});
```

---

### [major] M-05: 견적 계산기 — `quantity === 'other'` 시 NaN 가능성

**파일**: `js/main.js` (Line 429, 435~436)

```javascript
if (!cardType || !quantity || quantity === 'other') {
  estimateDisplay.classList.add('hidden');
  return;
}
var quantityNum = parseInt(quantity, 10);
var units = quantityNum / 100;
```

**문제**: `'other'`를 `parseInt`하면 `NaN`이 되지만, 현재 코드는 조기 리턴으로 방어하고 있어 현 상태에서는 안전합니다. 다만, 향후 `quantity` 옵션 값이 변경될 경우를 대비해 `isNaN` 체크를 추가하는 것이 안전합니다.

**개선안**:
```javascript
var quantityNum = parseInt(quantity, 10);
if (isNaN(quantityNum) || quantityNum <= 0) {
  estimateDisplay.classList.add('hidden');
  return;
}
```

---

## 3. Minor 이슈 (개선 권장)

### [nit] N-01: CSS `!important` 사용

**파일**: `css/custom.css` (Line 181, 188, 1048~1052, 1067~1073)

```css
.nav-scrolled {
  background-color: rgba(255, 255, 255, 0.92) !important;
}
```

`!important`가 4곳에서 사용됩니다. `.nav-scrolled`의 경우 Tailwind 인라인 스타일과의 특이도 충돌 때문에 어쩔 수 없지만, 과도한 사용은 유지보수를 어렵게 합니다.

**개선안**: Tailwind CDN의 인라인 스타일 대신 CSS-first 접근으로 전환하면 `!important`를 줄일 수 있습니다.

---

### [nit] N-02: `var` 대신 `let/const` 사용 권장

**파일**: `js/main.js` (전체)

코드 전반에서 `var`를 사용하고 있습니다. IIFE로 감싸져 있어 전역 오염은 방지되지만, `let`/`const`를 사용하면 블록 스코프로 인한 예측 가능성이 높아집니다.

**개선안**: `const`를 기본으로, 재할당이 필요한 경우만 `let` 사용.

---

### [nit] N-03: Favicon에 이모지 SVG 사용

**파일**: `index.html` (Line 38)

```html
<link rel="icon" ... href="data:image/svg+xml,...📇...">
```

이모지 기반 favicon은 OS/브라우저별 렌더링이 다릅니다. 프리미엄 브랜드 이미지와 맞지 않습니다.

**개선안**: 브랜드에 맞는 커스텀 SVG 또는 PNG favicon을 제작하세요.

---

### [nit] N-04: CSS에서 하드코딩된 색상 값

**파일**: `css/custom.css`

```css
.hero-gradient {
  background: linear-gradient(140deg, #0c0c1d 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%);
}
```

다크모드용 색상 변수 시스템(`--color-*`)을 잘 구축했지만, Hero 그라데이션 등 일부 곳에서 하드코딩된 HEX 값이 있습니다.

**개선안**: 추가 CSS 변수로 정의하여 테마 일관성을 유지하세요.

---

### [nit] N-05: 동일 SVG 아이콘 중복

**파일**: `index.html` (Line 163~166, 1307~1309, 1321, 1443)

카카오톡 SVG 아이콘이 footer와 플로팅 버튼에서 중복됩니다. 로고 SVG도 header와 footer에 중복됩니다.

**개선안**: `<svg>` 요소를 `<defs>` + `<use>`로 재사용하거나, SVG 스프라이트를 도입하세요.

---

### [nit] N-06: `document.write()` 사용

**파일**: `index.html` (Line 1383)

```html
<script>document.write(new Date().getFullYear())</script>
```

`document.write()`는 레거시 API이며 비동기 스크립트 환경에서 문제가 될 수 있습니다.

**개선안**: JavaScript에서 `textContent`로 교체
```html
<span id="year"></span>
<script>document.getElementById('year').textContent = new Date().getFullYear();</script>
```

---

### [nit] N-07: 폼 `novalidate` 사용 시 커스텀 검증 의존

**파일**: `index.html` (Line 921)

```html
<form ... novalidate>
```

브라우저 네이티브 검증을 비활성화하고 커스텀 JS 검증에 의존합니다. JS가 비활성화된 환경에서는 검증이 전혀 작동하지 않습니다.

**개선안**: `novalidate`를 유지하되, `<noscript>` 태그로 JS 비활성화 안내 메시지를 추가하세요.

---

## 4. 접근성 (a11y) 리뷰

### 잘된 점 (Positive)

- **skip-link**: `본문으로 건너뛰기` 링크가 최상단에 배치됨
- **aria-label**: 45개 이상의 요소에 적절한 aria-label 적용
- **aria-expanded**: 모바일 메뉴 토글에 상태 표시
- **aria-describedby**: 폼 에러 메시지와 입력 필드 연결
- **role="alert" + aria-live="polite"**: 실시간 에러 표시에 스크린리더 지원
- **role="dialog" + aria-modal**: 모달에 올바른 역할 부여
- **aria-hidden="true"**: 장식 요소에 스크린리더 숨김 처리
- **focus-visible 스타일**: CSS에서 키보드 포커스 링 제공
- **prefers-reduced-motion**: 모션 감소 설정 존중

### 개선 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| A-01 | 포트폴리오 아이템 키보드 접근 | Medium | `<div>` 요소에 `click` 이벤트가 있으나 `tabindex`, `role="button"`, `onkeydown` 없음 |
| A-02 | 모달 포커스 트랩 불완전 | Medium | `showModal()`에서 첫 요소에 포커스하지만, Tab 키로 모달 밖으로 나갈 수 있음 |
| A-03 | 캐러셀 라이브 리전 | Low | 캐러셀 슬라이드 변경 시 스크린리더에 알림 없음 (`aria-live` 부재) |
| A-04 | `<details>` 요소의 id 부재 | Low | FAQ 아코디언에 개별 id가 없어 딥링크 불가 |
| A-05 | 필수 표시 `*`의 `aria-label` | Low | `<span aria-label="필수">*</span>` — 올바르지만 `aria-required="true"`도 input에 추가 권장 |

---

## 5. CSS 리뷰

### 잘된 점 (Positive)

- **CSS 변수 시스템**: 체계적인 디자인 토큰 (색상, 그림자, radius, z-index, transition)
- **다크모드 구현**: `.dark` 클래스 기반으로 CSS 변수만 교체하는 깔끔한 구조
- **커스텀 이징**: `ease-out-expo`, `ease-spring` 등 물리적 자연스러운 애니메이션
- **`prefers-reduced-motion`**: 접근성을 위한 모션 감소 처리
- **Print 스타일**: 불필요한 UI 요소 숨김 처리
- **`font-variant-numeric: tabular-nums`**: 숫자 레이아웃 안정성
- **z-index 체계**: 변수로 관리 (nav: 50, modal: 60, toast: 70, float: 40)

### 개선 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| S-01 | `transition: all` 남용 | Low | `.value-card`, `.filter-btn` 등에서 `all` 사용 — 불필요한 속성까지 전환되어 성능 저하 가능 |
| S-02 | 하드코딩 다크모드 색상 | Low | `dark:bg-[#0f1117]`, `dark:bg-[#161822]` 등 Tailwind 임의값 반복 — CSS 변수로 통합 가능 |
| S-03 | Stagger 자식 6개 제한 | Low | `.stagger-children`가 `:nth-child(6)`까지만 지원 — 7번째 이후 자식은 애니메이션 없음 |

---

## 6. JavaScript 리뷰

### 잘된 점 (Positive)

- **IIFE 패턴**: 전역 스코프 오염 방지
- **`'use strict'`**: 엄격 모드 활성화
- **`requestAnimationFrame`**: 스크롤 이벤트 최적화
- **`{ passive: true }`**: 터치/스크롤 이벤트 리스너 성능 최적화
- **`IntersectionObserver` 폴백**: 미지원 브라우저를 위한 graceful degradation
- **`unobserve()`**: 한 번 보인 요소는 관찰 해제하여 메모리 절약
- **리사이즈 디바운스**: 캐러셀에서 250ms 디바운스 적용
- **허니팟 스팸 방지**: `_gotcha` 필드로 봇 차단
- **시스템 테마 감지**: `matchMedia` + `change` 이벤트로 OS 테마 변경 실시간 반영
- **`localStorage` 테마 저장**: 사용자 선택 유지

### 개선 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| J-01 | 에러 핸들링 미흡 | Medium | `fetch` 호출에서 네트워크 에러와 서버 에러를 구분하지 않음. `catch`에서 모든 에러를 동일 처리 |
| J-02 | 타임아웃 미설정 | Medium | 폼 제출 `fetch`에 타임아웃이 없어 무한 대기 가능 |
| J-03 | 캐러셀 autoplay cleanup | Low | 페이지 이탈/탭 비활성화 시 `setInterval`이 계속 실행됨. `visibilitychange`로 제어 필요 |
| J-04 | `lucide.createIcons()` 무조건 호출 | Low | Line 637에서 `window.lucide` 체크 후 호출하지만, finally 블록 실행 시점에 DOM이 준비되지 않을 수 있음 |
| J-05 | `parseInt` radix 일관성 | Low | `data-index` 파싱 시 `parseInt(this.getAttribute('data-index'), 10)` 올바르게 사용 중 (양호) |

---

## 7. SEO 리뷰

### 잘된 점 (Positive)

- **Open Graph + Twitter Card**: 완전한 소셜 미디어 메타 태그
- **Canonical URL**: 중복 콘텐츠 방지
- **JSON-LD 구조화 데이터**: LocalBusiness + FAQPage 스키마
- **시맨틱 HTML**: `<nav>`, `<main>`, `<section>`, `<footer>` 적절 사용
- **`robots.txt`**: 크롤링 규칙 설정
- **`sitemap.xml`**: 사이트맵 제공
- **`meta description`**: 적절한 길이와 키워드 포함
- **Heading 계층**: h1 → h2 → h3 → h4 순서 준수

### 개선 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| E-01 | OG 이미지 미존재 가능 | Medium | `og-image.png`가 실제 존재하는지 확인 필요 |
| E-02 | 포트폴리오 이미지 부재 | Medium | `data-lightbox=""` — lightbox 소스가 비어있어 의미 없는 라이트박스 열림 |
| E-03 | `hreflang` 태그 미사용 | Low | 한국어 단일 사이트이지만, `hreflang="ko"` 명시 권장 |
| E-04 | JSON-LD `sameAs` 빈 배열 | Low | 소셜 미디어 프로필이 없어 검색엔진 연결 불가 |

---

## 8. 성능 리뷰

### 잘된 점 (Positive)

- **Font preconnect**: CDN에 미리 연결
- **FOUC 방지**: 다크모드 초기화 스크립트가 `<head>`에 위치
- **rAF 스크롤**: 불필요한 리플로우 방지
- **`passive: true`**: 터치/스크롤 성능 최적화
- **IntersectionObserver**: 뷰포트 진입 시에만 애니메이션 실행

### 개선 필요 (가장 큰 영향)

| # | 이슈 | 심각도 | 예상 영향 |
|---|------|--------|----------|
| P-01 | Tailwind CDN (런타임 CSS 생성) | **Critical** | LCP +500ms~1s, TBT 증가 |
| P-02 | Lucide @latest (미캐시) | High | 매 방문 시 새 버전 체크, FCP 지연 |
| P-03 | Font @import (CSS 내부) | Medium | 렌더 블로킹 체인: HTML → CSS → Font CSS → Font 파일 |
| P-04 | 이미지 없이 CSS 그래디언트만 사용 | Low | 실제 이미지 최적화 이슈 없음 (양호) |
| P-05 | `body` 전체 transition | Low | `background-color`, `color` 전환이 모든 자식에 영향 |

**`P-03` 개선안**: CSS `@import` 대신 HTML `<link>` + `preload`
```html
<link rel="preload" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" onload="this.onload=null;this.rel='stylesheet'">
```

---

## 9. 보안 리뷰

### 잘된 점 (Positive)

- **허니팟 스팸 방지**: 봇 필드 숨김 처리
- **클라이언트 폼 검증**: 정규식 기반 입력 검증
- **`novalidate` + JS 검증**: 이중 검증 의도 (서버 검증은 Formspree 의존)
- **XSS 직접 위험 없음**: 사용자 입력이 DOM에 직접 삽입되지 않음
- **`dangerouslySetInnerHTML` 미사용**: (React 아니므로 해당 없음)

### 개선 필요

| # | 이슈 | 심각도 | 설명 |
|---|------|--------|------|
| S-01 | CSP 헤더 미설정 | Medium | Content Security Policy가 없어 인라인 스크립트/외부 리소스 제어 불가 |
| S-02 | 외부 CDN 의존 (SRI 없음) | Medium | `unpkg.com`, `cdn.tailwindcss.com`에 Subresource Integrity 없음 |
| S-03 | `target="_blank"` 미사용이지만 href="#" 링크 다수 | Low | 소셜 링크가 `href="#"`로 되어있어 실제 외부 링크 연결 시 `rel="noopener noreferrer"` 필수 |
| S-04 | 이메일 정규식 불완전 | Low | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` — `test@.com` 같은 잘못된 이메일도 통과 |

---

## 10. 다크모드 리뷰

### 잘된 점 (Positive)

- **시스템 테마 연동**: `prefers-color-scheme` 자동 감지
- **사용자 선택 우선**: `localStorage`에 테마 저장
- **FOUC 방지**: `<head>`에서 동기적으로 `dark` 클래스 추가
- **meta theme-color**: 라이트/다크 각각 설정
- **CSS 변수 전환**: `.dark` 클래스로 변수만 교체하는 효율적 구조
- **아이콘 전환 애니메이션**: 해/달 아이콘 회전+스케일 전환

### 개선 필요

| # | 이슈 | 심각도 |
|---|------|--------|
| D-01 | 다크모드에서 `<select>` 드롭다운 내부 스타일이 브라우저 기본값을 따름 | Low |
| D-02 | `.hero-gradient` 색상이 다크/라이트 동일 | Low |
| D-03 | Footer 다크모드 배경 하드코딩 `#0a0b12` | Low |

---

## 11. 종합 소견

### 강점

1. **체계적인 디자인 시스템**: CSS 변수 기반의 토큰 시스템이 잘 구축됨
2. **다크모드 완성도**: 거의 모든 요소에 다크모드가 적용되어 있으며, 시스템 테마 연동까지 지원
3. **접근성 의식**: skip-link, aria 속성, focus-visible, reduced-motion 등 웹 접근성 주요 항목 대부분 충족
4. **코드 구조**: IIFE + strict mode + 함수 분리로 깔끔한 코드 구조
5. **UX 디테일**: 견적 계산기 실시간 업데이트, 캐러셀 터치 지원, 폼 실시간 검증 등 사용자 경험 배려
6. **SEO**: 구조화 데이터, OG 태그, 시맨틱 HTML 등 검색 최적화 기본기 충실

### 즉시 조치 필요 (Before Deploy)

| 우선순위 | 항목 | 예상 소요 |
|----------|------|----------|
| 1 | Tailwind CSS 빌드 파이프라인 전환 (P-01, C-03) | 1~2시간 |
| 2 | Lucide 버전 고정 (C-01) | 5분 |
| 3 | Formspree 엔드포인트 교체 (C-02) | 5분 |
| 4 | 파일 업로드 클라이언트 검증 추가 (C-04) | 30분 |
| 5 | SRI 해시 추가 (S-02) | 30분 |

### 배포 후 개선 (Post-Deploy Backlog)

1. 이벤트 리스너 메모리 릭 수정 (M-02, M-03)
2. 포트폴리오 필터 setTimeout 누적 수정 (M-04)
3. Font 로딩 최적화 (P-03)
4. 포트폴리오 키보드 접근성 (A-01)
5. 모달 포커스 트랩 완성 (A-02)

---

## 부록: 파일별 이슈 요약

| 파일 | Critical | Major | Minor | Total |
|------|----------|-------|-------|-------|
| `index.html` | 3 | 0 | 4 | 7 |
| `css/custom.css` | 0 | 0 | 3 | 3 |
| `js/main.js` | 1 | 5 | 2 | 8 |
| `robots.txt` | 0 | 0 | 0 | 0 |
| `sitemap.xml` | 0 | 0 | 0 | 0 |
| **합계** | **4** | **5** | **9** | **18** |

---

*Report generated by Senior Code Reviewer*
*Review date: 2026-04-12*
