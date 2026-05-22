const { PPTEngine } = require("../../.agents/skills/simple-design-ppt/engine");
const path = require("path");

const engine = new PPTEngine({
  author: "Antigravity",
  footerText: "2026 AI Research Report | NotebookLM vs Claude"
});

// 파일 절대 경로를 위해 path.join과 __dirname 활용
const assetPath = (name) => path.join(__dirname, "assets", name);

async function build() {
  // Slide 1: Title
  engine.addTitleSlide({
    badge: "AI RESEARCH REVOLUTION",
    title: "AI 바이브코딩 시대의 리서치 혁명", // 24자 이내
    sub1: "단순 LLM 검색의 한계 극복과 초정규화 RAG 시너지",
    sub2: "2026년 5월 22일 | 안티그래비티 딥 리서치 에이전트",
    imagePath: assetPath("title_main.png")
  });

  // Slide 2: TOC
  await engine.addIndexSlide({
    items: [
      "RAG 아키텍처와 신뢰성 비교",
      "실전 비즈니스 임팩트와 워크플로우",
      "시장 트렌드 및 시너지 전략"
    ]
  });

  // Slide 3: Section 1 Divider
  engine.addDividerSlide({
    badge: "SECTION 01",
    title: "RAG 아키텍처와 신뢰성 비교",
    subtitle: "엄격한 출처 접지 RAG 엔진과 일반 LLM 브라우징의 구조적 성능 대결"
  }, "03");

  // Slide 4: Editorial Content
  engine.addSubsectionListSlide({
    badge: "ARCHITECTURE COMPARISON",
    title: "Strict RAG와 일반 웹서치의 구조적 차이",
    subtitle: "스탠퍼드 연구 결과 가드레일을 결합한 RAG 시스템은 할루시네이션을 최대 96% 차단",
    items: [
      { title: "Strict Grounding RAG", body: "업로드한 소스 내부 지식 세트에서만 100% 사실 기반 추출" },
      { title: "Contextual Grounding", body: "외부 지식 융합으로 유연하나 subtle hallucination 발생 우려" }
    ],
    imagePath: assetPath("concept_comparison.png")
  }, "04");

  // Slide 5: Feature Head-to-Head
  engine.addCardSlide({
    badge: "PRODUCT SPECIFICATION",
    title: "NotebookLM vs Claude Projects 핵심 기능 대결",
    theme: "minimal",
    cards: [
      { badge: "NOTEBOOKLM", title: "노트북엘엠 (NotebookLM)", body: "무료 티어 500K 단어 수용 및 정확한 문헌 추적이 가능한 클릭형 인라인 인용구 제공" },
      { badge: "CLAUDE", title: "클로드 프로젝트 (Claude)", body: "200K 토큰 컨텍스트 윈도우 기반 정교한 추론 및 코딩, 에디토리얼 Artifacts 기능 최적화" },
      { badge: "PERPLEXITY", title: "퍼플렉시티 (Perplexity Pro)", body: "월 7억 8,000만 쿼리 처리 능력의 실시간 고성능 웹 답변 엔진 및 지식 인덱스 연동" }
    ]
  }, "05");

  // Slide 6: Section 2 Divider
  engine.addDividerSlide({
    badge: "SECTION 02",
    title: "실전 비즈니스 임팩트와 워크플로우",
    subtitle: "매주 25시간을 절감하는 실전 RAG 사례와 3단계 AI 연계 전략"
  }, "06");

  // Slide 7: Table Slide
  engine.addTableSlide({
    badge: "BUSINESS IMPACT & ROI",
    title: "정량적 리서치 성능 데이터 및 합의 성공 사례",
    headers: ["지표 유형", "Legacy Keyword Search", "RAG-LLM 도입 후 성능"],
    rows: [
      ["사내 특허 검색 속도", "평균 23.04초 소요", "18.05초로 단축 완료 (Hit Rate 85%+)"],
      ["수술 준비 문헌 검토", "인간 전문가 10분 소요", "15~20초 완성 (정확도 91.4% 달성)"],
      ["법적 분쟁 증거 검증", "5년치 메일 수천 장 미검증", "5자릿수 달러 화해금 획득 (NotebookLM 증거)"]
    ]
  }, "07");

  // Slide 8: Process Slide (그라데이션 3단 카드)
  engine.addCardSlide({
    badge: "COMPLEMENTARY SYSTEM",
    title: "Perplexity + NotebookLM + Claude 3단계 초시너지",
    theme: "gradation",
    cards: [
      { badge: "STEP 01", title: "Perplexity Pro (수집)", body: "실시간 웹 검색을 통해 최신 벤치마크 점수와 심도 있는 최신 팩트 문헌들을 광범위하게 수집" },
      { badge: "STEP 02", title: "NotebookLM RAG (구조화)", body: "수집 문헌들을 로드하여 strict grounding 기반의 오염 없는 핵심 요약 및 RAG 아웃라인 추출" },
      { badge: "STEP 03", title: "Claude Projects (작성)", body: "구조화된 팩트 아웃라인을 Claude로 연동하여 최고 수준의 비즈니스 톤앤매너로 최종 작성 및 에셋화" }
    ]
  }, "08");

  // Slide 9: Market Summary Slide
  engine.addSummarySlide({
    badge: "MARKET OUTLOOK & COMPETITORS",
    title: "글로벌 AI 리서치 시장 성과 및 미래 전망",
    cards: [
      { title: "글로벌 시장 성장", body: "기업용 검색 시장 2030년 86억 달러 돌파 및 AI 리서치 CAGR 16.1% 성장", tag: "MARKET SIZE", imagePath: assetPath("market_growth.png") },
      { title: "OpenAI ChatGPT Search", body: "ChatGPT Search 출시로 주당 2.5억~5억 쿼리를 독점하며 시장 60.7% 지배", tag: "COMPETITOR", imagePath: assetPath("competitor_openai.png") },
      { title: "구글 RAG 에이전트", body: "NotebookLM에 Deep Research 기능 전면 통합으로 자율적 마켓 인덱싱 완성", tag: "DIFFERENTIATOR", imagePath: assetPath("google_agent.png") }
    ]
  }, "09");

  // Slide 10: Closing Finish Slide
  engine.addFinishSlide({
    badge: "CLOSING",
    title: "AI 자료 리서치의 최고봉, NotebookLM RAG를 통해 생산성 차이를 만드십시오.",
    subtitle: "검증된 출처 기반 지식 자산화가 비즈니스의 초격차 의사결정을 리드합니다."
  }, "10");

  const outputFileName = path.join(__dirname, "NotebookLM_vs_Claude_Research.pptx");
  await engine.save(outputFileName);
  console.log("PPTX Generation Done: " + outputFileName);
}

build().catch(err => {
  console.error("Error building PPTX:", err);
});
