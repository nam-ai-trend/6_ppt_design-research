const { PPTEngine, COLORS } = require('../../.agents/skills/simple-design-ppt/engine');
const fs = require('fs');
const path = require('path');

async function main() {
  const engine = new PPTEngine({
    author: "Antigravity AI",
    footerText: "2026 AI Agents Research Report"
  });

  // 1. 타이틀 슬라이드
  engine.addTitleSlide({
    title: "빅테크 에이전트 전략과 Antigravity",
    sub1: "자율형 에이전트 패러다임과 인프라 헷지(Hedge) 전략",
    sub2: "2026-05-17 | Antigravity AI Research",
    badge: "AI TRENDS",
    imagePath: path.join(__dirname, 'assets/title_image.png')
  });

  // 2. 목차 슬라이드
  await engine.addIndexSlide({
    items: [
      "빅테크 3강의 차별화된 AI 에이전트 전략",
      "Google Antigravity의 '미션 컨트롤' 비전과 현실",
      "구글의 400억 달러 투자와 전략적 헷지",
      "결론 및 시사점"
    ]
  });

  // 3. 파트 1 간지
  engine.addDividerSlide({
    badge: "SECTION 01",
    title: "빅테크 에이전트 전략",
    subtitle: "OpenAI, Anthropic, Google의 차별화된 접근법"
  }, "03");

  // 4. OpenAI와 Anthropic (커스텀 2단 카드)
  const slide4 = engine.pres.addSlide();
  engine.addHeader(slide4, "COMPETITION", "OpenAI vs Anthropic 접근법");
  engine.addFooter(slide4, "04");

  // Card 1 (Light)
  slide4.addShape(engine.pres.shapes.RECTANGLE, { x: 0.55, y: 1.28, w: 4.3, h: 3.69, fill: { color: COLORS.cardBgLight }, rectRadius: 0.05 });
  slide4.addText("OpenAI (수직적 통합)", { x: 0.85, y: 1.58, w: 3.7, h: 0.4, fontSize: 19, color: COLORS.black, fontFace: "Black Han Sans" });
  slide4.addText("GPT-5.5 Codex 필두. 풀스택 전략으로 모델, API, 개발자 생태계 장악. 터미널 환경 실행력 강조.", { x: 0.85, y: 2.1, w: 3.7, h: 2.0, fontSize: 13, color: COLORS.textBody, fontFace: "Black Han Sans", valign: "top" });

  // Card 2 (Dark)
  slide4.addShape(engine.pres.shapes.RECTANGLE, { x: 5.15, y: 1.28, w: 4.3, h: 3.69, fill: { color: COLORS.cardBgDark }, rectRadius: 0.05 });
  slide4.addText("Anthropic (안전성 & 개방)", { x: 5.45, y: 1.58, w: 3.7, h: 0.4, fontSize: 19, color: COLORS.white, fontFace: "Black Han Sans" });
  slide4.addText("최소 권한 및 안전 우선 철학. MCP 개방형 표준 확산 주도. Claude 4.7 딥 리즈닝 강점.", { x: 5.45, y: 2.1, w: 3.7, h: 2.0, fontSize: 13, color: COLORS.textMuted, fontFace: "Black Han Sans", valign: "top" });

  // 5. Google과 인프라 위기 (커스텀 1:1 이미지형)
  const slide5 = engine.pres.addSlide();
  engine.addHeader(slide5, "GOOGLE & INFRA", "구글의 플랫폼 통합과 인프라 위기");
  engine.addFooter(slide5, "05");

  const items5 = [
    "Gemini 3.1 Pro의 100만 토큰 컨텍스트 및 실시간 검색 그라운딩",
    "Google Workspace와의 강력한 네이티브 통합이 핵심 경쟁력",
    "AI 업계의 극심한 컴퓨팅 자원 부족 및 Anthropic의 토큰 고갈 위기"
  ];

  slide5.addText(
    items5.map((text, i, arr) => ({
      text,
      options: { bullet: { indent: 12 }, breakLine: i < arr.length - 1 }
    })),
    { x: 0.55, y: 1.28, w: 4.35, h: 3.5, fontFace: "Black Han Sans", fontSize: 14, color: COLORS.textBody, valign: "top", margin: 0, paraSpaceAfter: 10 }
  );

  const imgPath5 = path.join(__dirname, 'assets/infra_image.png');
  if (fs.existsSync(imgPath5)) {
    slide5.addImage({ path: imgPath5, x: 5.25, y: 1.28, w: 3.5, h: 3.5 });
  }

  // 6. 파트 2 간지
  engine.addDividerSlide({
    badge: "SECTION 02",
    title: "Antigravity 비전과 현실",
    subtitle: "미션 컨트롤 패러다임과 치명적인 한계"
  }, "06");

  // 7. Antigravity 비전 (커스텀 1:1 이미지형)
  const slide7 = engine.pres.addSlide();
  engine.addHeader(slide7, "VISION", "Antigravity 미션 컨트롤 비전");
  engine.addFooter(slide7, "07");

  const items7 = [
    "에이전트가 코드를 작성하고 개발자는 관리하는 새로운 차원의 IDE",
    "200만 토큰 컨텍스트로 저장소 전체를 메모리에 유지",
    "리팩토링, 인프라, 검증 등 전문 에이전트가 개발 업무 80% 자동화"
  ];

  slide7.addText(
    items7.map((text, i, arr) => ({
      text,
      options: { bullet: { indent: 12 }, breakLine: i < arr.length - 1 }
    })),
    { x: 0.55, y: 1.28, w: 4.35, h: 3.5, fontFace: "Black Han Sans", fontSize: 14, color: COLORS.textBody, valign: "top", margin: 0, paraSpaceAfter: 10 }
  );

  const imgPath7 = path.join(__dirname, 'assets/vision_image.png');
  if (fs.existsSync(imgPath7)) {
    slide7.addImage({ path: imgPath7, x: 5.25, y: 1.28, w: 3.5, h: 3.5 });
  }

  // 8. Antigravity 오류 (커스텀 2단 카드)
  const slide8 = engine.pres.addSlide();
  engine.addHeader(slide8, "CRISIS", "Antigravity의 치명적 오류");
  engine.addFooter(slide8, "08");

  // Card 1 (Light)
  slide8.addShape(engine.pres.shapes.RECTANGLE, { x: 0.55, y: 1.28, w: 4.3, h: 3.69, fill: { color: COLORS.cardBgLight }, rectRadius: 0.05 });
  slide8.addText("자율성의 폭주", { x: 0.85, y: 1.58, w: 3.7, h: 0.4, fontSize: 19, color: COLORS.black, fontFace: "Black Han Sans" });
  slide8.addText("보안 모드 우회 버그 발생. 사용자의 승인 없이 터미널 명령을 무단 실행하는 심각한 보안 결함 노출.", { x: 0.85, y: 2.1, w: 3.7, h: 2.0, fontSize: 13, color: COLORS.textBody, fontFace: "Black Han Sans", valign: "top" });

  // Card 2 (Dark)
  slide8.addShape(engine.pres.shapes.RECTANGLE, { x: 5.15, y: 1.28, w: 4.3, h: 3.69, fill: { color: COLORS.cardBgDark }, rectRadius: 0.05 });
  slide8.addText("운영상 한계", { x: 5.45, y: 1.58, w: 3.7, h: 0.4, fontSize: 19, color: COLORS.white, fontFace: "Black Han Sans" });
  slide8.addText("하이엔드 PC에서도 심각한 리소스 소모. 하드 캡 초과 시 유료 사용자도 7일간 서비스 차단(Lockout).", { x: 5.45, y: 2.1, w: 3.7, h: 2.0, fontSize: 13, color: COLORS.textMuted, fontFace: "Black Han Sans", valign: "top" });

  // 9. 파트 3 간지
  engine.addDividerSlide({
    badge: "SECTION 03",
    title: "구글의 400억 달러 투자",
    subtitle: "파트너십을 가장한 고도의 방어 전략"
  }, "09");

  // 10. 결론 (커스텀 1:1 이미지형)
  const slide10 = engine.pres.addSlide();
  engine.addHeader(slide10, "CONCLUSION", "구글의 전략적 헷지 (Hedge)");
  engine.addFooter(slide10, "10");

  const items10 = [
    "Anthropic에 100억 달러 현금 투자 및 조건부 300억 달러 추가 투자",
    "향후 5년간 5GW의 막대한 컴퓨팅 파워 제공 합의",
    "Claude의 우세에 대비한 방어 전략이며, 인프라(TPU) 수익 창출 구조 완성"
  ];

  slide10.addText(
    items10.map((text, i, arr) => ({
      text,
      options: { bullet: { indent: 12 }, breakLine: i < arr.length - 1 }
    })),
    { x: 0.55, y: 1.28, w: 4.35, h: 3.5, fontFace: "Black Han Sans", fontSize: 14, color: COLORS.textBody, valign: "top", margin: 0, paraSpaceAfter: 10 }
  );

  const imgPath10 = path.join(__dirname, 'assets/hedge_image.png');
  if (fs.existsSync(imgPath10)) {
    slide10.addImage({ path: imgPath10, x: 5.25, y: 1.28, w: 3.5, h: 3.5 });
  }

  // 11. 마감 슬라이드
  engine.addFinishSlide({
    title: "Thank You",
    subtitle: "Antigravity AI Research | info@antigravity.ai",
    badge: "THANK YOU"
  }, "11");

  // 저장
  const outputFileName = path.join(__dirname, 'output.pptx');
  await engine.save(outputFileName);
}

main().catch(err => {
  console.error("에러 발생:", err);
});
