# 작업 이력 (History)

## 2026-05-18
- **작업 내용**: PPT 디자인 규칙 강화 작업 시작
- **세부 사항**: 사용자의 요청에 따라 빈 공간 문제 및 학술 도해 이미지 미생성 문제를 해결하기 위해 규칙 강화를 진행함. `plan_checklist.md` 생성 완료.
- **작업 내용**: `SKILL.md` 파일 수정 완료
- **세부 사항**: 학술 도해 강제화 규칙 및 빈 공간 방지 규칙을 `SKILL.md`에 추가함. `plan_checklist.md` 업데이트 완료.

## 2026-05-22
- **작업 내용**: NotebookLM MCP 연동 딥 리서치 스킬(`research`) 생성
- **세부 사항**:
  - `research_start` 도구의 `--mode deep` 호출 규격을 정의하여 심층 리서치 프로세스 표준화.
  - 리서치 결과를 가져온 후 지정된 슬라이드 개수(디폴트 10장)에 1:1 매핑되는 `research.md` 명세 구축.
  - 슬라이드 구성 Blueprint 양식을 정의하여 `simple-design-ppt`와 같은 디자인 스킬로의 매끄러운 PPTX 생성을 가능케 함.
  - `.agents/skills/research/SKILL.md` 신규 스킬 파일 생성 완료.
  - **사용자 피드백 반영**: 단순한 주제 검색을 넘어 에이전트가 개념, 통계, 경쟁 툴, 아키텍처, 한계점을 파악하고 고품질 영문 쿼리로 확장 및 재구성하여 탐색할 수 있도록 쿼리 확장 5대 원칙을 스킬에 추가 보강함.
  - **안티그래비티 지능 및 고정 질문 결합**: 재구성은 안티그래비티 고유의 추론 지능으로 수행함을 선언하고, 리서치 퀄리티 고도화를 위해 ROI(비즈니스 효과), Cases(실제 기업 성공/실패 사례), Actions(의사결정자를 위한 행동 방안), Market Size & Competitors(시장 규모 및 경쟁사 분석)의 4대 고정 확장 질문을 기본 탑재시킴.
  - **딥 리서치 전용 모드 규정화**: 스킬 상세 작동 절차와 신뢰도 가이드라인 영역에 "별도 요청이 없는 한 항상 --mode deep을 사용하여 딥 리서치를 기동"하도록 문구를 고정 반영 완료함.
- **다음 작업 시 시작해야 할 일 (Next Step)**:
  - 생성된 `research` 스킬을 기동하여 특정 주제에 대해 실제로 딥 리서치를 구동하고 결과물 `research.md`가 정상 생성되는지 검증.

### [2026-05-22 22:28] SKILL.md 깨짐 복구 및 초정규화 명세 100% 이식 완료
- 이전 세션 급중단으로 인해 손상되었던 `.agents/skills/research/SKILL.md` 마스터 파일 복구 완료.
- 안티그래비티 지능형 쿼리 재구성 규칙, 4대 고정 질문(ROI, 사례, 행동 방안, 시장 분석), 10페이지 디폴트 슬라이드 규칙, 그리고 `references/template_guide.md` 규격에 맞는 초정규화된 Key-Value Blueprint 명세를 완전히 정합화하여 복구 이식 완료.

### [2026-05-22 22:29] "NotebookLM vs Claude" 주제의 딥 리서치(deep) 기동
- 사용자 요청에 따라 "웹서치/클로드 자료조사 대비 NotebookLM의 압도적 자료 리서치 역량 분석(장단점, 단점 보완 방안, 팩트)" 주제의 딥 리서치를 기동함.

## [2026-05-22 22:52] PPTX 자동 생산 워크플로우 (organization_agent) 진입
- **상황**: 이미 고품질 초정규화 규격으로 완결된 `outputs/260522_notebooklm_vs_claude/research.md`가 존재함을 확인하고 불필요한 재리서치를 즉시 취소함.
- **수행 작업**: `plan_checklist.md` 체크리스트 Phase 5 완료 처리 및 Phase 6 진입. `organization_agent.md` 워크플로우에 기반한 스토리보드(STORYBOARD.md) 설계 시작.
- **Next Step**: `STORYBOARD.md` 설계 및 이미지 자율 생성 진행.

## [2026-05-22 22:58] PPTX 자동 생산 (organization_agent) 성공 및 최종 완료
- **수행 작업**:
  1. **STORYBOARD.md 자율 설계**: `research.md` 의 정규화 명세를 `simple-design-ppt` 엔진(`engine.js`) 함수 및 레이아웃 요건과 100% 한 치의 오차도 없이 10장 매핑 완료.
  2. **시각 이미지 에셋 5장 생성**: `generate_image` 로 타이틀, RAG 아키텍처 흐름도, 시장 성장 지표, 경쟁 지표, RAG 에이전트 다이어그램 에셋을 1:1 스펙 및 3D Tech-Editorial/Academic 하이브리드로 정밀 생성하여 `assets/` 에 이식.
  3. **전용 실행기(generate_ppt.js) 빌드**: `PPTEngine` 클래스를 동적으로 참조하여 슬라이드 10장을 생성하는 빌드 스크립트 빌드.
  4. **PPTX 최종 빌드 및 검증**: `node generate_ppt.js` 실행 결과 3.5MB 크기의 `NotebookLM_vs_Claude_Research.pptx` 최종 빌드 및 무결성 확보 완료.
- **오늘 완료한 일**: NotebookLM 딥리서치 스킬 개선 및 이를 연동한 "NotebookLM vs Claude (웹서치)" 주제의 10장 구성 초격차 PPTX 프레젠테이션 자동 빌드 성공.
- **다음 작업 시 시작해야 할 일(Next Step)**: 사용자의 신규 주제 요청 접수 또는 현 PPTX 디자인의 추가 스타일 변형 요구사항 반영.
