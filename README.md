# 🚀 PPT Design Claude Skill

클로드 에이전트를 활용하여 **슬라이드 구성 파일(research.md)만 넣으면 자동으로 PPTX를 생산**해주는 자율형 프레젠테이션 제작 파이프라인입니다.

> **NEW 🚀**: 이제 **NotebookLM MCP 기반의 딥 리서치 스킬(`/research`)**과 **GitHub 원클릭 공개 배포 스킬(`/github`)**이 완전히 결합되어, 주제 한 줄만 입력하면 리서치, PPT 생성, 저장소 생성 및 푸시까지 완벽히 자동화됩니다!

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

## 🎯 사용법 (End-to-End Workflow)

본 프로젝트는 자료 리서치부터 PPTX 빌드, 깃허브 배포까지 전 과정이 체계적인 3단계 파이프라인으로 연결되어 있습니다. 아래 순서대로 실행해 보세요!

---

### Step 1: 🔍 NotebookLM 딥 리서치 기동 (진정한 첫 출발선! 🚀)
가장 먼저 발표하고자 하는 주제를 입력하여 심층 자료 조사 결과물인 `research.md`를 자율적으로 생성합니다.
```bash
/research [원하는 발표 주제]
```
*   **YYMMDD_{주제} 자동 명명 규칙 및 폴더 개설**:
    - 리서치 스킬을 기동하면, 현재 시스템 날짜(`YYMMDD` 형태)와 사용자가 입력한 주제의 영문 소문자 키워드(띄어쓰기는 `_`로 대체)를 조합하여 **`outputs/YYMMDD_{주제}`** 형식의 고유 폴더를 자동으로 생성합니다.
    - **예시**: 오늘이 2026년 5월 22일이고 주제가 "NotebookLM vs Claude"인 경우, 자동으로 `outputs/260522_notebooklm_vs_claude` 폴더를 개설합니다.
*   **인사이트 확장**: 안티그래비티 AI가 쿼리를 한/영 다각화하여 시장 규모, 경쟁사 분석, ROI, 실사례, 구체적 행동 방안까지 정밀 추출하여 `outputs/YYMMDD_{주제}/research.md`로 자동 정규화 빌드합니다.

*(참고: 만약 이미 준비된 연구 자료가 있다면, 해당 규칙에 맞춰 `outputs/YYMMDD_{주제}/research.md` 경로에 수동으로 직접 작성하여 기동할 수도 있습니다. 양식은 아래의 [research.md 예시]를 참고하세요.)*

---

### Step 2: 🎨 PPTX 및 시각 에셋 자율 생산 기동
생성된 `research.md` 파일을 지정하여 스토리보드 설계, 이미지 에셋 생성, 최종 PPTX 슬라이드 빌드까지 한 번에 수행합니다.
```bash
/organization_agent outputs/[주제명]/research.md
```
*   **Phase 1**: `STORYBOARD.md` 자율 설계 및 레이아웃 매핑
*   **Phase 2**: 3D Tech-Editorial 스타일의 고품질 이미지 에셋(정사각형 및 Bleed형) 5장 자율 생성 및 `assets/` 복사
*   **Phase 3**: PPTEngine 동적 참조형 전용 빌더인 `generate_ppt.js` 작성
*   **Phase 4**: 로컬 node 구동을 통한 `output.pptx` 무결성 최종 렌더링 (약 3.5MB)

---

### Step 3: 🚀 GitHub 공개 저장소 원클릭 배포 기동
생성 완료된 슬라이드와 연구 폴더 전체를 GitHub 공개(Public) 저장소로 즉시 업로드합니다.
```bash
/github [원하는 저장소 이름]
```
*   **동작**: 특수문자(예: `+`)를 대시`-`로 치환 정규화하여 저장소 생성 실패를 방지하고, `nam-ai-trend` 조직/계정 하위에 공개(Public) 레포지토리를 API로 신규 생성한 뒤 모든 결과물 코드를 메인 브랜치로 즉시 푸시(Push) 배포 완료합니다.

---

### 📝 research.md 예시 (수동 작성 시 참고)

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
│       ├── research/                # 🔍 NotebookLM MCP 딥 리서치 스킬
│       │   └── SKILL.md             # 고정 질문 및 초정규화 룰
│       └── simple-design-ppt/       # 디자인 테마 스킬 (Tech-Editorial)
│           ├── SKILL.md             # 디자인 시스템 전체 규격
│           ├── engine.js            # PPTEngine 클래스 (슬라이드 생성 엔진)
│           └── scripts/             # 추가 헬퍼 스크립트
│
├── outputs/                         # 생성된 결과물 폴더
│   └── YYMMDD_{주제}/               # 📌 자동 생성 규칙 적용 폴더 (예: 260522_notebooklm_vs_claude)
│       ├── research.md              # ✏️ 딥 리서치 결과 보고서 (슬라이드 구성 파일)
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

## 🚀 추가 스킬: GitHub 원클릭 배포 (`/github`)
빌드가 완료된 프레젠테이션과 자료 전체를 GitHub 원격 저장소에 즉시 업로드하고 배포를 끝마칩니다.
```bash
/github [원하는 저장소 이름]
```
*   **특수문자 정규화**: 깃허브 정책 상 생성 불가능한 특수문자 `+`를 대시`-`로 치환하여 (`6_ppt_design-research`) 에러 없이 안전하게 생성합니다.
*   **공개(Public) 배포**: 지정된 계정/조직(`nam-ai-trend`) 하위에 공개(Public) 레포지토리를 API로 신규 생성하고 `git init`, `add`, `commit -m "research 및 ppt 연동 완료"`를 거쳐 메인 브랜치로 즉시 푸시 배포합니다.

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
└── YYMMDD_{주제}/         ← 📌 자동 개설되는 고유 경로 (예: 260522_notebooklm_vs_claude)
    ├── research.md        ← 🔍 Step 1: 리서치 스킬로 자동 추출 (수동 작성 가능)
    ├── STORYBOARD.md      ← Step 2: Phase 1 자동 생성
    ├── assets/
    │   ├── title.png
    │   ├── slide03.png
    │   └── ...
    ├── generate_ppt.js    ← Phase 3 자동 생성
    └── output.pptx        ← Phase 4 최종 결과물 ✅
```

---

---

## 🔍 실증 사례 연구 (Case Study): NotebookLM vs Claude (웹서치)

본 프로젝트의 첫 번째 실증 연구 결과물은 **`outputs/260522_notebooklm_vs_claude/`**에 안전하게 보존되어 있으며, PPTX 및 연구 자료가 GitHub 저장소에 최종 탑재되어 있습니다.

### 1. 왜 자료 조사는 NotebookLM이 최고인가? (Fact Sheet)
*   **완벽한 소스 그라운딩(Source-grounding)**: 대형 언어 모델의 최대 약점인 할루시네이션(환각)을 극도로 제한합니다. 답변의 모든 문장에 원문 출처(Citation) 링크가 1:1로 매핑되어 팩트 체크가 즉각적으로 가능합니다.
*   **초대형 멀티모달 컨텍스트 소화**: 최대 50만 단어 이상의 복잡한 PDF, 기술 사양서, 유튜브 스크립트, 구글 드라이브 소스를 단 30초 만에 분석하여 일목요연하게 핵심 구조를 요약합니다.
*   **Deep Research의 탐색 범위**: 단순한 표층 검색을 넘어 수십 개의 신뢰도 높은 웹 레퍼런스를 심층 교차 검증하여 초정규화된 팩트 기반 문서를 형성합니다.

### 2. 왜 코드와 빌드는 Claude(바이브코딩)가 최강인가?
*   **직관적인 논리 구조 설계**: 자연어 지시 사항의 행간을 파악하여 실시간으로 실행 가능한 빌드 코드와 레이아웃 스크립트를 구현하는 유연성이 가장 뛰어납니다.
*   **Vibe Coding의 탁월함**: 개발자가 엄밀한 문법을 일일이 지시하지 않아도 컨텍스트와 아키텍처 규칙을 스스로 분석하여 완벽한 컴포넌트 단위나 풀스택 스크립트로 번역해 줍니다.

### 3. 하이브리드 협업 모델 (시너지 전략)
*   **자료 수집 및 검증**: **NotebookLM**이 철저한 팩트 체크와 초정규화된 보고서 작성을 전담합니다.
*   **설계, 빌드 및 배포**: **Claude(안티그래비티)**가 그 팩트 시트를 바탕으로 스토리보드 시각화 설계, 3D 이미지 에셋 생성, PPTX 렌더링 코드 개발, 깃허브 배포를 자율 수행합니다.
*   **결과**: 이 결합을 통해 수작업으로 3일이 걸리던 PPT 제작 및 연구 과정을 단 **3분**으로 극단적으로 단축하며 생산성을 무한대로 극대화합니다!

---

**Powered by Antigravity Design Team & NAM AI TREND**

