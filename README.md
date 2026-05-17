# 🚀 PPT Design Claude Skill

클로드 에이전트를 활용하여 **슬라이드 구성 파일(research.md)만 넣으면 자동으로 PPTX를 생산**해주는 자율형 프레젠테이션 제작 파이프라인입니다.

---

## 📦 설치

### 1. 저장소 클론

```bash
git clone <repo-url>
cd 1_ppt_design_skill
```

### 2. 의존성 설치

```bash
npm install
```

**주요 의존성:**

| 패키지 | 용도 |
|--------|------|
| `pptxgenjs` | PPTX 파일 생성 엔진 |
| `sharp` | 이미지 처리 (SVG → PNG 래스터라이즈) |

### 3. Python 의존성 (QA용)

```bash
pip install "markitdown[pptx]"  # PPTX 텍스트 추출
pip install Pillow               # 썸네일 생성
```

> LibreOffice(`soffice`)와 Poppler(`pdftoppm`)이 설치되어 있으면 슬라이드를 이미지로 변환한 시각적 QA가 가능합니다.

---

## 🎯 사용법

### 핵심 원칙: research.md 하나만 준비하면 끝

1. `outputs/[주제명]/` 폴더를 생성합니다.
2. 그 안에 **`research.md`** 파일을 작성합니다.
3. 클로드에게 다음과 같이 요청합니다:

```
outputs/[주제명]/research.md를 바탕으로
[simple-design-ppt] 디자인 스킬을 사용해서 PPT 만들어줘.
```

### research.md 예시

```markdown
# AI 에이전트 시장 동향 2026

## 핵심 요약
- 전 세계 AI 에이전트 시장 규모: 2026년 기준 450억 달러
- 전년 대비 성장률: 87%

## 주요 트렌드
### 1. 멀티 에이전트 협업
자율 AI 에이전트들이 서로 협력하여 복잡한 태스크를 분산 처리...

### 2. 엔터프라이즈 도입 가속
Fortune 500 기업의 63%가 AI 에이전트 파일럿을 진행 중...

## 결론
에이전트 AI는 단순 자동화를 넘어 의사결정 보조 도구로 진화 중
```

---

## 📂 폴더 구조

```
1_ppt_design_skill/
│
├── .agents/                         # 에이전트 정의 폴더
│   ├── workflows/
│   │   └── organization_agent.md    # 🔑 PPT 자동 생산 워크플로우
│   └── skills/
│       ├── pptx/                    # PPTX 읽기·편집·QA 스킬
│       │   ├── SKILL.md             # 스킬 정의 및 가이드
│       │   └── scripts/             # 썸네일·변환 헬퍼 스크립트
│       └── simple-design-ppt/       # 디자인 테마 스킬 (Tech-Editorial)
│           ├── SKILL.md             # 디자인 시스템 전체 규격
│           ├── engine.js            # PPTEngine 클래스 (슬라이드 생성 엔진)
│           └── scripts/             # 추가 헬퍼 스크립트
│
├── outputs/                         # 생성된 결과물 폴더
│   └── [주제명]/                    # 예: 260517_ai_test
│       ├── research.md              # ✏️ 사용자가 작성하는 슬라이드 구성 파일
│       ├── STORYBOARD.md            # 자동 생성: 슬라이드 기획안
│       ├── generate_ppt.js          # 자동 생성: PPT 빌드 스크립트
│       ├── output.pptx              # 자동 생성: 최종 결과물
│       └── assets/                  # 자동 생성: 이미지 에셋
│           └── *.png / *.jpg
│
├── package.json
├── .env
└── README.md
```

---

## ⚙️ 워크플로우 상세: `organization_agent` 작동 방식

워크플로우 파일: `.agents/workflows/organization_agent.md`

클로드가 `/organization_agent` 워크플로우를 실행하면, 아래 **4개 Phase**가 순차적으로 자동 진행됩니다.

---

### Phase 1 — 데이터 분석 & 스토리보드 자동 작성

`outputs/[주제명]/research.md`를 분석하여 **`STORYBOARD.md`**를 생성합니다.

스토리보드에는 다음이 포함됩니다:
- **슬라이드 유형**: `engine.js`의 함수명과 매칭 (타이틀, 목차, 섹션, 콘텐츠, KPI, 마감 등)
- **데이터 매핑**: 제목(25자 이내), 본문, 강조 데이터를 슬라이드별로 추출
- **이미지 생성 계획**: 각 슬라이드에 적합한 구체적인 이미지 프롬프트 작성

```markdown
# [프로젝트명] 기획안
**사용 디자인 스킬**: simple-design-ppt
**산출물 경로**: outputs/[주제명]/

## 슬라이드 01: AI 에이전트 시장 동향 2026
- **타입**: addTitleSlide
- **이미지 프롬프트**: "futuristic AI neural network, 3D render, dark background..."
- **데이터**: { title: "AI 에이전트 시장 동향", subtitle: "2026 연간 보고서", ... }
```

---

### Phase 2 — 이미지 에셋 자동 생성

`simple-design-ppt` 스킬의 **이미지 생성 3단계 프로토콜**을 따릅니다:

1. **에이전트 내장 `generate_image` 툴** 우선 사용
2. 쿼터 초과 시 외부 API 폴백으로 전환
3. 생성된 이미지는 `outputs/[주제명]/assets/`에 저장

**이미지 규격:**
| 슬라이드 타입 | 규격 | 위치 |
|-------------|------|------|
| 타이틀 / 마감 | Bleed (w=4.75", h=5.625") | 우측 절반 전체 |
| 콘텐츠 (기본형) | 1:1 정사각형 (~4"×4") | 우측 영역 |

---

### Phase 3 — `generate_ppt.js` 자동 작성

주제 폴더 내에 **`generate_ppt.js`**를 생성합니다. 이 스크립트는:

- `engine.js`(`PPTEngine` 클래스)를 동적으로 참조: `require('../../.agents/skills/simple-design-ppt/engine')`
- 스토리보드의 데이터를 슬라이드별 함수 호출로 변환
- 모든 경로를 `__dirname` 기준으로 처리하여 이식성 확보

---

### Phase 4 — 최종 빌드 & QA 검증

```bash
node outputs/[주제명]/generate_ppt.js
```

스크립트 실행 후:
1. `output.pptx` 생성 확인
2. `pptx` 스킬이 자동 트리거되어 파일 무결성 검토
3. 콘텐츠 QA (`markitdown`으로 텍스트 추출 검증)
4. 시각적 QA (슬라이드를 이미지로 변환 후 레이아웃 검토)

---

## 🎨 디자인 시스템: `simple-design-ppt`

**Tech-Editorial & Academic 하이브리드** 스타일. 엔터프라이즈 AI/기술 발표 자료에 최적화.

### 슬라이드 타입 8종

| # | 타입 | 설명 |
|---|------|------|
| 1 | **타이틀** | 좌측 대형 타이틀 + 우측 Bleed 실사 이미지 |
| 2 | **목차** | 번호 뱃지 + 동적 Y축 센터링 목록 |
| 3 | **섹션 전환 (Divider)** | 다크 배경(`#1A1A1A`) 전환 슬라이드 |
| 4 | **콘텐츠 - 기본 1:1 이미지형** | 좌측 텍스트 + 우측 정사각형 이미지 |
| 5 | **콘텐츠 - 카드형** | 2~5단 카드 그리드 (라이트/다크 혼합) |
| 6 | **콘텐츠 - 비교/스텝형** | AS-IS vs TO-BE 비교, Step 1→2→3 |
| 7 | **데이터/KPI형** | 대형 숫자 KPI 블록 + 테이블 |
| 8 | **마감 (Closing)** | 핵심 메시지 + 연락처 + 우측 이미지 |

### 핵심 디자인 원칙

- **컬러**: 흰(`#FFFFFF`) 배경 기본, 다크 강조(`#18181B`), 블루 액센트(`#2563EB`)
- **폰트**: `Black Han Sans` (없으면 Arial → Calibri 폴백)
- **레이아웃**: 슬라이드 크기 10" × 5.625" (16:9)
- **공통 요소**: 모든 슬라이드에 상단 뱃지 + 하단 구분선 + 페이지 번호 적용

---

## 📝 출력 예시

```
outputs/
└── 260517_ai_test/
    ├── research.md        ← 사용자 작성 (입력)
    ├── STORYBOARD.md      ← Phase 1 자동 생성
    ├── assets/
    │   ├── title.png
    │   ├── slide03.png
    │   └── ...
    ├── generate_ppt.js    ← Phase 3 자동 생성
    └── output.pptx        ← Phase 4 최종 결과물 ✅
```

---

**Powered by Antigravity Design Team**
