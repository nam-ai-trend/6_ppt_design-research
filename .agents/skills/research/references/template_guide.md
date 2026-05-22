# Highly Normalized Slide Blueprint Specification (정규화 명세서)

이 문서는 `research.md` 보고서 하단 부록인 **슬라이드 구성 Blueprint**를 마크다운 파서(Parser)가 정규표현식이나 문법 분석기로 100% 에러 없이 파싱할 수 있도록 초정규화(Highly Normalized)한 표준 템플릿 규격서입니다. 

에이전트는 `research.md`를 생성할 때, 부록의 슬라이드 기술 형식을 아래의 엄격한 Key-Value bullet 구조로만 작성해야 합니다.

---

## 1. 슬라이드 타입별 정규화 명세 (Normalized Structures)

### Type 1: Title (타이틀 슬라이드)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Title`
- **Badge**: [상단 다크 뱃지 텍스트 - 영문 대문자 권장]
- **Main Title**: [대제목 - 줄바꿈 없이 최대 24자 이내]
- **Sub Title**: [부제목 - 블루 액센트용]
- **Author Info**: [날짜 및 작성자/조직 정보]
- **Visual Spec**: [우측 대형 실사 이미지 생성용 정밀 영어 프롬프트]
```

### Type 2: TOC (목차 슬라이드)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `TOC`
- **Badge**: `CONTENTS`
- **Main Title**: [슬라이드 제목 - 예: 발표 목차]
- **List Items**:
  - 01: [섹션 1 제목]
  - 02: [섹션 2 제목]
  - 03: [섹션 3 제목]
  - 04: [섹션 4 제목]
```

### Type 3: Divider (섹션 전환 슬라이드)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Divider`
- **Badge**: [섹션 번호 - 예: SECTION 01]
- **Main Title**: [섹션 대제목 - 다크 배경 60pt 타이틀용]
- **Sub Title**: [섹션 부제목 - 16pt 그레이 텍스트]
```

### Type 4: Editorial_Image (기본 1:1 이미지 콘텐츠형)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Editorial_Image`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Accent Message**: [중앙 본문 상단 블루 강조 결론 문장]
- **Bullet Points**:
  - [불릿 항목 1: 소제목 - 핵심 설명문]
  - [불릿 항목 2: 소제목 - 핵심 설명문]
- **Visual Spec**: [우측 1:1 정사각형 배치용 Academic Diagram 또는 실사 이미지 프롬프트]
```

### Type 5: Card_Grid (카드 그리드 콘텐츠형)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Card_Grid`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Accent Message**: [중앙 본문 상단 블루 강조 결론 문장]
- **Cards**:
  - Card 1: `[[카드 1 제목]]` [카드 1 내용 상세 기술] (Icon: [아이콘 유형])
  - Card 2: `[[카드 2 제목]]` [카드 2 내용 상세 기술] (Icon: [아이콘 유형])
  - Card 3 (Highlight): `[[카드 3 강조 제목]]` [카드 3 다크 카드 내용 기술] (Icon: [아이콘 유형])
```

### Type 6: Editorial_Table (에디토리얼 테이블 콘텐츠형)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Editorial_Table`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Table Spec**:
  - Headers: [열1 이름] | [열2 이름] | [열3 이름]
  - Row 1: [데이터1] | [데이터2] | [데이터3]
  - Row 2: [데이터1] | [데이터2] | [데이터3]
  - Row 3: [데이터1] | [데이터2] | [데이터3]
```

### Type 7: Step_Process (비교 및 스텝 프로세스형)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Step_Process`
- **Badge**: [상단 다크 뱃지 텍스트]
- **Main Title**: [슬라이드 대제목]
- **Steps**:
  - Step 1: `[[STEP 01]]` [스텝 1 제목] - [상세 설명]
  - Step 2: `[[STEP 02]]` [스텝 2 제목] - [상세 설명]
  - Step 3 (Highlight): `[[STEP 03]]` [스텝 3 강조 제목] - [상세 설명]
```

### Type 8: Closing (마감 슬라이드)
```markdown
### Slide [번호]: [슬라이드 식별명]
- **Type**: `Closing`
- **Main Message**: [중앙 정렬 대형 마무리 메시지]
- **Sub Message**: [전략적 시사점 코멘트]
- **Contact Info**: [조직명, 연락처, 이메일 등]
```

---

## 2. 정규화 작성 주의 사항 (Strict Constraints)
1. **Key-Value 매칭**: 모든 속성은 `- **Key**: Value` 형태를 칼같이 유지합니다. 콜론 `:` 앞뒤 띄어쓰기에 주의하세요.
2. **대괄호 및 따옴표 최소화**: 불필요한 이중 괄호나 따옴표는 기계 파싱의 오류 원인이 되므로, 제공된 템플릿에 명시된 괄호 체계(`[[카드제목]]` 등) 이외에는 사용을 엄격히 자제합니다.
3. **가독성 & 기계친화성**: 이 명세에 따라 생성된 보고서는 사람이 읽기에도 완벽하고, 코딩 파서가 한 줄씩 읽어서 객체로 변환하기에도 최적의 상태가 됩니다.
