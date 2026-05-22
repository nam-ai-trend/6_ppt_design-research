---
name: research
description: NotebookLM MCP를 연결하여 주어진 주제에 대해 심층 리서치(Deep Research)를 수행하고 소스를 연동하여 지정된 슬라이드 분량의 고품질 마크다운 보고서(research.md)를 생성합니다.
---

# 딥 리서치 에이전트 스킬 (Research Skill)

이 스킬은 **NotebookLM MCP** 및 심층 검색 도구들을 연동하여 주어진 주제에 대해 깊이 있는 리서치(Deep Research)를 수행하고, 지정된 슬라이드 개수(기본 10장)에 완벽하게 1:1 대응되는 구조화된 리서치 보고서(research.md)를 자동으로 작성합니다. 

이 스킬로 생성된 research.md 파일은 simple-design-ppt 스킬이 즉시 파싱하여 최고 수준의 프레젠테이션 PPTX 파일로 빌드할 수 있는 핵심 가교 역할을 합니다.

---

## 1. 수행 절차 및 에이전트 행동 지침 (Step-by-Step Instructions)

### [1단계] 주제 분석 및 안티그래비티 지능형 쿼리 재구성 (Query Reconstruction by Antigravity)
1. 사용자가 단순하거나 압축된 키워드로 요청하더라도, **안티그래비티(나 자신)의 풍부한 AI 두뇌 지능을 활용하여 배경 맥락을 깊이 분석하고, 스스로 살을 대폭 붙여 정교한 쿼리로 전면 재구성**합니다.
   - **맥락 파악 및 쿼리 확장 5대 원칙**:
     - 1) **개념 및 작동 원리**: 해당 기술/비즈니스의 핵심 정의와 핵심 기능적 특징
     - 2) **최신 통계 및 시장 데이터**: 2026년 기준의 시장 점유율, 도입률, 성장률 수치
     - 3) **경쟁 구도 및 대표 툴 비교**: 업계를 선도하는 Top 3~5개 기업/솔루션 비교
     - 4) **아키텍처 및 핵심 기술 트렌드**: 내부 설계 구조, 트렌디한 해결 방식(RAG, Agentic 등)
     - 5) **한계점 및 해결 과제**: 보안, 비용, 신뢰성 이슈와 함께 2026년 이후의 미래 전망
   - **글로벌 영문 쿼리 변환 (필수)**: 최고의 학술 및 산업 데이터를 확보하기 위해, 사용자의 한글 주문을 맥락이 꽉 찬 **고품질 영문 쿼리**로 변환 및 확장하여 입력해야 합니다.

2. **안티그래비티 지능형 '인사이트 확장 4대 고정 질문' 필수 결합**:
   단순 사실 정보 수집을 넘어 비즈니스 의사 결정에 즉각 기여할 수 있도록, 쿼리 재구성 시 안티그래비티 두뇌가 설계한 아래의 **4대 고정 확장 질문**을 무조건 쿼리나 리서치 분석 프롬프트에 추가 결합합니다.
   - **질문 A (Business Impact & ROI)**: "What are the tangible financial and operational benefits, productivity gains, or cost-saving impacts of this technology/trend for businesses?" (이 기술이 가져다주는 구체적인 비즈니스 효과와 비용 절감 임팩트는 무엇인가?)
   - **질문 B (Real-world Case Studies)**: "What are the actual real-world success stories or failure cases of leading enterprises implementing this?" (선도 기업들의 실제 성공 사례나 시행착오 사례는 어떤 것들이 있는가?)
   - **질문 C (Strategic Action Plan)**: "What are the immediate, actionable strategic recommendations and execution steps for decision-makers looking to adopt this?" (이 기술을 도입하려는 의사 결정권자가 당장 취해야 할 구체적인 전략적 실행 방안은 무엇인가?)
   - **질문 D (Market Size & Competitor Analysis)**: "What is the current global/domestic market size, expected growth rate (CAGR) up to 2030, and who are the key competitors with their respective market share and technological differentiators?" (현재 국내외 시장 규모와 2030년까지의 예상 성장률은 어떻게 되며, 주요 경쟁사들의 시장 점유율 및 기술적 차별점은 무엇인가?)

3. **목표 폴더 생성 및 명명 규칙 (YYMMDD_{주제})**:
   - 리서치 및 PPTX 빌드 결과물을 저장할 폴더는 반드시 **`outputs/YYMMDD_{주제}`** 형식으로 자동 생성합니다.
     - `YYMMDD`: 현재 시스템 날짜 기준 연도(2자리), 월(2자리), 일(2자리) 포맷 (예: 오늘이 2026년 5월 22일이면 `260522`).
     - `{주제}`: 사용자가 제시한 주제를 직관적으로 나타내는 영문 소문자 형태의 키워드 (단어 간 띄어쓰기는 언더바 `_`로 대체).
     - **예시**: 주제가 "NotebookLM vs Claude"인 경우, `outputs/260522_notebooklm_vs_claude` 폴더를 새로 생성하고 그 안에 `research.md`를 저장합니다.
4. 사용자가 사전에 명시한 PPT 슬라이드 개수(페이지 수)를 확인합니다. 
   - **중요**: 만약 사용자가 페이지 수를 언급하지 않았다면 **10페이지(디폴트)**로 설정합니다.

### [2단계] NotebookLM 기반 심층 리서치 (Deep Research Mode)
1. **노트북 생성**: notebook_create 도구를 사용하여 분석용 노트북을 신규 생성합니다.
2. **딥 리서치 기동**: research_start 도구를 사용해 재구성된 정교한 쿼리를 던집니다.
   - **모드 지정**: 별도 요청이 없는 한 항상 mode="deep"을 사용하여 딥 리서치를 기동합니다.
   - **소스 지정**: 웹 상의 광범위하고 깊이 있는 고품질 데이터 수집을 위해 source="web"으로 설정합니다.
3. **진행 상태 폴링**: research_status 도구를 사용하여 딥 리서치가 완벽하게 완료될 때까지 상태를 모니터링(폴링)합니다.
4. **소스 가져오기 및 동기화**: 리서치 상태가 completed가 되면 research_import 도구를 기동하여 수집 및 마이닝된 다수의 핵심 소스(Source) 문서들을 해당 노트북으로 연동 및 가져오기 처리를 진행합니다.

### [3단계] 내용 정밀 추출 (Sub-Querying & Extracting Data)
1. 가져온 노트북의 전체 소스를 대상으로 notebook_query 도구를 개별 가동합니다.
2. 앞서 정의한 **4대 인사이트 확장 고정 질문**을 각각 Sub-Query로 실행하여, 노트북 내에 수집된 수많은 문서로부터 구체적인 수치 데이터, 실증적 기업 사례, 시사점을 정밀하게 마이닝합니다.
3. 사용자가 추가로 주문한 핵심 요구 사항이나 기술적 디테일이 있다면 이 단계에서 개별 Sub-Query를 추가로 실행하여 세부 내용을 빈틈없이 확보합니다.

### [4단계] 구조화된 보고서 (research.md) 작성 및 저장
- 수집 및 분석한 데이터를 바탕으로 지정된 결과물 폴더에 research.md 파일을 생성합니다.
- 에이전트는 작성 시 반드시 스킬 내의 디렉토리 에셋들을 참조하여 최고 수준의 가독성과 정규화를 구현해야 합니다:
  - **assets/tone_and_prompt.md**에 기록된 비즈니스 톤앤매너와 전문 용어 영문 병기 규칙을 철저히 준수합니다.
  - **references/template_guide.md**에 기록된 **초정규화된 슬라이드 Blueprint 마크다운 규격**을 100% 한 치의 오차도 없이 엄격히 준수하여 보고서 하단 부록을 작성합니다.

---

## 2. 보고서 표준 마크다운 형식 (research.md)

```markdown
# [주제] 딥 리서치 보고서

## 1. 개요 및 배경 (Overview)
- 정의 및 현 시장 상황에 대한 학술적/산업적 분석
- 리서치 배경 및 주요 당면 과제(Challenge)

## 2. 핵심 인사이트 (Key Insights)
- 이번 심층 리서치를 통해 도출된 3~5가지 핵심 포인트
- 각 포인트별 상세 근거 및 글로벌 트렌드 비교

## 3. 주요 기술/성능 데이터 (Technical Data)
- 신뢰할 수 있는 수치 데이터, 성능 벤치마크 점수, 통계 지표
- 프레젠테이션 차트나 네이티브 테이블(표)로 시각화하기 좋은 구체적인 수치 데이터

## 4. 트렌드 및 전망 (Trends & Outlook)
- 2026년 이후의 미래 예측, 기술적 진화 방향 및 시장 전망

## 5. 참고 문헌 및 소스 (Sources)
- 리서치 과정에서 NotebookLM 및 웹 탐색을 통해 수집한 실제 출처 리스트 (URL, 리포트명, 발행 기관명 등)

---

## [부록: 슬라이드 구성 Blueprint (총 N장)]
> 본 부록 is 이 보고서를 바탕으로 'simple-design-ppt' 등 디자인 스킬이 100% 기계적 파싱을 통해 PPTX를 즉시 자동 빌드할 수 있도록 초정규화(Highly Normalized)한 상세 슬라이드 단위 기획서입니다.
> (작성 양식은 반드시 references/template_guide.md에 기술된 구조적 Key-Value bullet 방식을 엄격하게 준수하여 작성하십시오.)

### Slide 1: Title
- **Type**: `Title`
- **Badge**: [상단 다크 뱃지 텍스트 - 영문 대문자 권장]
- **Main Title**: [대제목 - 줄바꿈 없이 최대 24자 이내]
- **Sub Title**: [부제목 - 블루 액센트용]
- **Author Info**: [날짜 및 작성자/조직 정보]
- **Visual Spec**: [우측 대형 실사 이미지 생성용 정밀 영어 프롬프트]

### Slide 2: Table of Contents
- **Type**: `TOC`
- **Badge**: `CONTENTS`
- **Main Title**: [슬라이드 제목 - 예: 발표 목차]
- **List Items**:
  - 01: [섹션 1 제목]
  - 02: [섹션 2 제목]
  - 03: [섹션 3 제목]
  - ... (전체 슬라이드 흐름에 맞춰 유연하게 구성)

### Slide 3: Section Divider
- **Type**: `Divider`
- **Badge**: [섹션 번호 - 예: SECTION 01]
- **Main Title**: [섹션 대제목 - 다크 배경 60pt 타이틀용]
- **Sub Title**: [섹션 부제목 - 16pt 그레이 텍스트]

### Slide 4: [슬라이드 식별명]
- **Type**: `Editorial_Image`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Accent Message**: [중앙 본문 상단 블루 강조 결론 문장]
- **Bullet Points**:
  - [불릿 항목 1: 소제목 - 핵심 설명문]
  - [불릿 항목 2: 소제목 - 핵심 설명문]
- **Visual Spec**: [우측 1:1 정사각형 배치용 Academic Diagram 또는 실사 이미지 프롬프트]

### Slide 5: [슬라이드 식별명]
- **Type**: `Card_Grid`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Accent Message**: [중앙 본문 상단 블루 강조 결론 문장]
- **Cards**:
  - Card 1: `[[카드 1 제목]]` [카드 1 내용 상세 기술] (Icon: [아이콘 유형])
  - Card 2: `[[카드 2 제목]]` [카드 2 내용 상세 기술] (Icon: [아이콘 유형])
  - Card 3 (Highlight): `[[카드 3 강조 제목]]` [카드 3 다크 카드 내용 기술] (Icon: [아이콘 유형])

### Slide 6: [슬라이드 식별명]
- **Type**: `Step_Process`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Steps**:
  - Step 1: `[[STEP 01]]` [스텝 1 제목] - [상세 설명]
  - Step 2: `[[STEP 02]]` [스텝 2 제목] - [상세 설명]
  - Step 3 (Highlight): `[[STEP 03]]` [스텝 3 강조 제목] - [상세 설명]

... (지정된 N장 수에 맞게 Slide N-1까지 반복 구성. 같은 레이아웃을 3장 이상 연속 사용하지 않도록 설계)

### Slide N: 마무리 (Closing Slide)
- **Type**: `Closing`
- **Main Message**: [중앙 정렬 대형 마무리 메시지]
- **Sub Message**: [전략적 시사점 코멘트]
- **Contact Info**: [조직명, 연락처, 이메일 등]
```

---

## 3. 리서치 신뢰도 및 품질 가이드라인

- **출처 우선순위**: 
  1. 정부 부처 및 공식 기관 (예: Gartner, IDC, McKinsey, 세계은행 등)
  2. 글로벌 빅테크 및 전문 기술 매체 (예: TechCrunch, VentureBeat 등)
- **전문 용어 병기**: 리서치 보고서 내의 중요 기술 용어 및 고유 명사는 반드시 영어 원어를 괄호 `()` 안에 함께 표기하여 슬라이드의 전문성을 높입니다.
- **도구 절대 경로**: NotebookLM MCP를 직접 셸(Shell)이나 코드로 제어할 때, 명령어는 반드시 `/Users/gwn/.local/bin/nlm` 절대 경로를 명시해야 합니다.
- **동기화 신뢰성**: 리서치가 완료될 때까지 상태를 반드시 검증하며, 중도 실패나 타임아웃 발생 시 원인을 구체적으로 파악하고 해결책을 제시합니다.
- **모드**: 별도 요청이 없는 한 항상 `--mode deep`을 사용하여 딥 리서치를 기동합니다.
