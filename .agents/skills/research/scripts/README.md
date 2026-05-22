# Scripts Directory (실행 스크립트 보관소)

본 디렉토리는 `research` 스킬이 리서치 데이터 수집, 가공 및 API 호출을 자동화하는 실제 코딩 스크립트들을 보관하는 영역입니다.

## 보관 대상 스크립트 예시 (Candidate Scripts)
1. **`parsing_helper.py`**: 생성된 `research.md`를 분석하여 슬라이드 단위 객체(JSON)로 파싱해주는 파이썬 헬퍼 라이브러리.
2. **`notebooklm_api.py`**: MCP 도구를 거치지 않고 직접 로컬 셸 스크립트를 통해 NotebookLM CLI(`/Users/gwn/.local/bin/nlm`)를 백그라운드로 실행하고 모니터링하는 배치 코드.
3. **`diagram_generator.py`**: `Visual Spec`에 명시된 영어 이미지 프롬프트를 에이전트 내장 도구와 연동하여 자동으로 다운로드받고 `outputs/assets/` 폴더에 매핑해주는 자동화 스크립트.

*추후 자동화 파이프라인 확장 시, 실제 구동할 Python/JS 스크립트를 여기에 추가하여 관리합니다.*
