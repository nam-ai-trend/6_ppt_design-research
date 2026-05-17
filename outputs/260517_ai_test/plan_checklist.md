# 작업 체크리스트 (Plan Checklist)

**주제**: AI 테스트 리서치 기반 PPT 생성
**경로**: `outputs/260517_ai_test/`

## Phase 1: 데이터 분석 및 기획안 자율 작성 ✅ (2026-05-17 22:22)
- [x] `research.md` 파일 분석
- [x] `STORYBOARD.md` 생성 (슬라이드 유형, 데이터 매핑, 이미지 프롬프트 포함)


## Phase 2: 이미지 에셋 생성 ✅ (2026-05-17 22:27)
- [x] `STORYBOARD.md`의 프롬프트를 기반으로 이미지 생성 (`generate_image`)
- [x] 생성된 이미지를 `outputs/260517_ai_test/assets/`에 저장


## Phase 3: 전용 실행기(generate_ppt.js) 작성 ✅ (2026-05-17 22:28)
- [x] `outputs/260517_ai_test/generate_ppt.js` 작성
- [x] `PPTEngine` 클래스 및 동적 경로 설정 확인


## Phase 4: 최종 빌드 및 검증 ✅ (2026-05-17 22:29)
- [x] `node outputs/260517_ai_test/generate_ppt.js` 실행하여 PPTX 생성
- [x] PPTX 파일 무결성 검토 (자동 트리거 확인)

