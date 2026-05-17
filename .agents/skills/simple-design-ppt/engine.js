const pptxgen = require("pptxgenjs");
const fs = require("fs");
const sharp = require("sharp");

// ── 디자인 상수 ──
const COLORS = {
  white: "FFFFFF", black: "000000", bgSection: "1A1A1A",
  cardBgLight: "F4F4F5", cardBgMinimal: "F9F9F9", cardBgDark: "18181B",
  primaryBlue: "2563EB", accentBlue: "0000FF", accentGray: "9B9B9B",
  textBody: "374151", textMuted: "9B9B9B", border: "E5E7EB",
};
const IMAGE_STYLES = {
  tech_editorial: "High-fidelity 3D presentation graphics, clean UI/UX elements, abstract glassmorphism, professional tech-editorial style, white background, sleek corporate aesthetic",
  academic: "Academic illustration, IEEE/CVPR paper style, schematic, clean lines, technical diagram, white background"
};
const FONT = "Black Han Sans";
const CONTENT_W = 4.35;

// ── 유틸리티 함수 ──
async function svgToPngB64(svgStr, size = 256) {
  const buf = await sharp(Buffer.from(svgStr)).resize(size, size).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function splitTitle(fullTitle, maxChars = 15) {
  const words = fullTitle.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(word => {
    if ((currentLine + word).replace(/\s/g, "").length > maxChars) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

// ── 엔진 클래스 ──
class PPTEngine {
  constructor(options = {}) {
    this.pres = new pptxgen();
    this.pres.layout = "LAYOUT_16x9";
    this.author = options.author || "Antigravity";
    this.footerText = options.footerText || "2026 AI Research Report";
  }

  // 프롬프트 고도화 유틸리티 (1:1 비율 및 스타일 적용)
  static getEnhancedPrompt(basePrompt, style = "tech_editorial") {
    const styleToken = IMAGE_STYLES[style] || IMAGE_STYLES.tech_editorial;
    return `${basePrompt}. Style: ${styleToken}. Specs: 1:1 square aspect ratio, centered composition, high resolution.`;
  }

  // 0. 공통 요소 (배지, 푸터)
  addBadge(slide, text, x = 0.55, y = 0.6, isSection = false) {
    const badgeText = (text || "CONCEPT").toUpperCase();
    const badgeW = badgeText.length * 0.12 + 0.5; // 패딩 여유 확보를 위해 0.12로 상향

    slide.addText(badgeText, {
      shape: this.pres.shapes.ROUNDED_RECTANGLE,
      x, y, w: badgeW, h: 0.28,
      fill: isSection ? { type: "none" } : { color: "18181B" },
      line: isSection ? { color: "FFFFFF", pt: 1.5 } : { type: "none" },
      rectRadius: 0.05,
      fontSize: 12, color: COLORS.white, fontFace: FONT, align: "center", valign: "middle", margin: 0
    });
  }

  addFooter(slide, pageNum) {
    slide.addShape(this.pres.shapes.LINE, { x: 0.25, y: 5.15, w: 9.5, h: 0, line: { color: COLORS.border, pt: 0.5 } });
    slide.addText(this.footerText, {
      x: 0.25, y: 5.25, w: 4, h: 0.3,
      fontSize: 9, color: COLORS.textMuted, fontFace: FONT, margin: 0
    });
    slide.addText(pageNum, {
      x: 4.5, y: 5.25, w: 1, h: 0.3,
      fontSize: 10, color: COLORS.textMuted, fontFace: FONT, align: "center", margin: 0
    });
  }

  addHeader(slide, badge, title) {
    const badgeText = badge || "RESEARCH";
    const badgeW = badgeText.length * 0.12 + 0.5;
    this.addBadge(slide, badgeText, 0.55, 0.6);
    slide.addText(title, {
      x: 0.55 + badgeW + 0.3, y: 0.6, w: 9.45 - (0.55 + badgeW + 0.3), h: 0.28,
      fontSize: 24, color: COLORS.black, fontFace: FONT, valign: "middle", margin: 0
    });
  }

  // 1. 타이틀 슬라이드 템플릿 (SKILL.md 준수: 흰배경 + 우측이미지 Bleed)
  createTitleSlide(data) {
    const slide = this.pres.addSlide();
    // 배경: 흰색
    slide.addShape(this.pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: COLORS.white } });
    // 이미지: 우측 절반 Bleed (x=5.25, y=0, w=4.75, h=5.625) - Y축 전체 덮기
    if (data.imagePath && fs.existsSync(data.imagePath)) {
      slide.addImage({ path: data.imagePath, x: 5.25, y: 0, w: 4.75, h: 5.625 });
    }
    // 뱃지 (x=0.55, y=0.6)
    this.addBadge(slide, data.badge || "AI TRENDS", 0.55, 0.6);
    // 대제목: 줄바꿈 없이 최대 24자 강제 제한 (Serious QA 대응)
    const shortTitle = (data.title || "").substring(0, 24);
    slide.addText(shortTitle, {
      x: 0.55, y: 1.1, w: 4.5, h: 1.0,
      fontSize: 40, color: COLORS.black, fontFace: FONT, valign: "top", margin: 0,
      wrap: false, shrinkText: true
    });
    // 부제목 16pt 블루 (y=3.3)
    slide.addText(data.sub1 || "", {
      x: 0.55, y: 3.3, w: 4.5, h: 0.35,
      fontSize: 16, color: COLORS.accentBlue, fontFace: FONT, valign: "middle", margin: 0,
    });
    // 날짜 14pt 그레이 (y=4.2)
    slide.addText(data.sub2 || "", {
      x: 0.55, y: 4.2, w: 4.5, h: 0.25,
      fontSize: 14, color: COLORS.accentGray, fontFace: FONT, valign: "middle", margin: 0,
    });
    this.addFooter(slide, "01");
  }

  // 2. 목차 슬라이드 템플릿 (SKILL.md 준수: Our Contents 좌측 + 번호배지 우측)
  async createIndexSlide(data) {
    const slide = this.pres.addSlide();
    this.addFooter(slide, "02");
    // 좌측: "Our Contents" 45pt
    slide.addText("Our Contents", {
      x: 0.55, y: 2.38, w: 3.8, h: 1.2,
      fontSize: 45, color: COLORS.black, fontFace: FONT, valign: "middle", margin: 0,
    });
    // 좌측 하단 화살표 아이콘 (사용자 요청: y: 4.0)
    const arrowFillSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,7.71-5,5L9.29,13.3,13.59,9H10V7h7V14H15V10.41Z"/></svg>`;
    const arrowPng = await svgToPngB64(arrowFillSvg, 128);
    slide.addImage({ data: arrowPng, x: 0.55, y: 4.0, w: 0.4, h: 0.4 });
    // 우측 목록: 동적 y축 센터링
    const n = data.items.length;
    const ROW_HEIGHT = 0.55;
    const startY = (1.0 + 5.1) / 2 - (n * ROW_HEIGHT) / 2;
    data.items.forEach((item, i) => {
      const y = startY + i * ROW_HEIGHT;
      // 번호 배지 (ROUNDED_RECTANGLE, h=0.22, w=0.38)
      slide.addShape(this.pres.shapes.ROUNDED_RECTANGLE, {
        x: 4.7, y, w: 0.38, h: 0.22,
        fill: { color: "18181B" }, line: { color: "18181B" }, rectRadius: 0.05
      });
      slide.addText(String(i + 1).padStart(2, "0"), {
        x: 4.7, y, w: 0.38, h: 0.22,
        fontSize: 10, color: COLORS.white, fontFace: FONT, align: "center", valign: "middle", margin: 0
      });
      // 항목 텍스트 16pt
      slide.addText(item, {
        x: 5.17, y: y - 0.02, w: 4.3, h: 0.32,
        fontSize: 16, color: COLORS.black, fontFace: FONT, valign: "middle", margin: 0,
      });
      // 구분선
      slide.addShape(this.pres.shapes.LINE, { x: 4.7, y: y + 0.35, w: 4.77, h: 0, line: { color: COLORS.border, pt: 0.5 } });
    });
  }

  // 3. 서브섹션 리스트 슬라이드 템플릿
  createSubsectionSlide(data, pageNum) {
    const slide = this.pres.addSlide();
    this.addHeader(slide, data.badge, data.title);
    this.addFooter(slide, pageNum);

    slide.addText(data.subtitle || "", {
      x: 0.55, y: 1.25, w: CONTENT_W, h: 0.35,
      fontSize: 17, color: COLORS.accentBlue, fontFace: FONT, valign: "middle", margin: 0,
    });

    data.items.forEach((item, i) => {
      const y = 1.6 + i * 1.0;
      // 소제목 16pt, x=0.55 (SKILL.md 동기화)
      slide.addText(item.title, {
        x: 0.55, y, w: CONTENT_W, h: 0.35,
        fontSize: 16, color: COLORS.black, fontFace: FONT, valign: "middle", margin: 0,
      });
      // 인용 엑센트 바 3pt, #374151, h=0.3
      slide.addShape(this.pres.shapes.LINE, { x: 0.55, y: y + 0.45, w: 0, h: 0.3, line: { color: COLORS.textBody, pt: 3 } });
      // 인용 텍스트 12pt, #374151, x=0.75
      slide.addText(item.body, {
        x: 0.75, y: y + 0.45, w: CONTENT_W - 0.2, h: 0.3,
        fontSize: 12, color: COLORS.textBody, fontFace: FONT, valign: "middle", margin: 0,
      });
    });

    if (data.imagePath && fs.existsSync(data.imagePath)) {
      slide.addImage({
        path: data.imagePath, x: 5.25, y: 1.28, w: 3.5, h: 3.5,
        sizing: { type: 'contain', w: 3.5, h: 3.5 }
      });
    } else {
      slide.addShape(this.pres.shapes.RECTANGLE, {
        x: 5.25, y: 1.28, w: 4.2, h: 3.5, fill: { color: COLORS.cardBgLight },
      });
      slide.addText("Visual Concept (Tech-Editorial)", {
        x: 5.25, y: 1.28, w: 4.2, h: 3.5,
        align: "center", valign: "middle", color: COLORS.textMuted, fontFace: FONT, fontSize: 14,
      });
    }
  }

  // 3-1. 섹션 간지(Divider) 템플릿 (SKILL.md 준수: 60pt, 16pt, 배지 테두리만)
  createDividerSlide(data, pageNum) {
    const slide = this.pres.addSlide();
    slide.addShape(this.pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: COLORS.bgSection } });
    // 배지: fill 없음, 흰 테두리만 (isSection=true)
    this.addBadge(slide, data.badge || "SECTION", 0.55, 0.6, true);
    this.addFooter(slide, pageNum || "--");
    // 섹션 제목 40pt (사용자 요청 반영)
    slide.addText(data.title, {
      x: 0.55, y: 2.0, w: 9, h: 1.5,
      fontSize: 40, color: COLORS.white, fontFace: FONT, valign: "top", margin: 0,
    });

    // 서브타이틀 16pt (제목 박스 아래 고정 배치)
    slide.addText(data.subtitle || "", {
      x: 0.55, y: 3.5, w: 9, h: 0.4,
      fontSize: 16, color: COLORS.accentGray, fontFace: FONT, valign: "middle", margin: 0,
    });
  }

  // 4. 카드형 슬라이드 템플릿
  createCardSlide(data, pageNum) {
    const slide = this.pres.addSlide();
    this.addHeader(slide, data.badge, data.title);
    this.addFooter(slide, pageNum);

    const cardW = 2.77;
    const theme = data.theme || 'minimal'; // 기본값은 일관된 'minimal'

    data.cards.forEach((card, i) => {
      const x = 0.55 + i * (cardW + 0.3);
      
      // 테마에 따른 배경색 결정
      let bg = COLORS.cardBgMinimal;
      let isDark = false;

      if (theme === 'dark') {
        bg = COLORS.cardBgDark;
        isDark = true;
      } else if (theme === 'gradation') {
        // 3단 그라데이션 (의도적인 디자인)
        const shades = [COLORS.cardBgLight, "#E5E7EB", "#D1D5DB"];
        bg = shades[i % shades.length];
        isDark = (i === 2); // 마지막 카드만 어둡게 처리할 경우 등
      }

      const textMain = isDark ? COLORS.white : COLORS.black;
      const textSub = isDark ? COLORS.accentGray : COLORS.textMuted;

      slide.addShape(this.pres.shapes.RECTANGLE, { x, y: 1.28, w: cardW, h: 3.5, fill: { color: bg }, rectRadius: 0.05 });
      this.addBadge(slide, card.badge || "INFO", x + 0.25, 1.55, isDark);
      slide.addText(card.title, {
        x: x + 0.25, y: 2.0, w: cardW - 0.5, h: 0.6,
        fontSize: 18, color: textMain, fontFace: FONT, valign: "middle", margin: 0,
      });
      slide.addText(card.body, {
        x: x + 0.25, y: 2.65, w: cardW - 0.5, h: 1.5,
        fontSize: 12, color: textSub, fontFace: FONT, valign: "top", margin: 0,
      });
    });
  }

  // 5. 데이터 테이블 슬라이드 템플릿
  createTableSlide(data, pageNum) {
    const slide = this.pres.addSlide();
    this.addHeader(slide, data.badge, data.title);
    this.addFooter(slide, pageNum);

    const rows = [data.headers.map(h => ({ text: h, options: { fill: COLORS.black, color: COLORS.white, fontFace: FONT, fontSize: 12, align: "center" } }))];
    data.rows.forEach(row => {
      rows.push(row.map(cell => ({ text: cell, options: { fontSize: 11, fontFace: FONT, align: "center", border: { type: 'solid', color: COLORS.border, pt: 0.5 } } })));
    });

    slide.addTable(rows, { x: 0.55, y: 1.5, w: 8.9, h: 3.2, border: { type: 'none' }, valign: "middle" });
  }

  // 6. 요약 요약 템플릿 (3단 카드 + 태그 + 이미지 지원)
  createSummarySlide(data, pageNum) {
    const slide = this.pres.addSlide();
    this.addHeader(slide, data.badge, data.title);
    this.addFooter(slide, pageNum);

    const cardW = 2.77;
    const imgY = 3.25; // 모든 이미지가 동일한 Y축에 배치되도록 고정
    const imgH = 1.15;

    data.cards.forEach((card, i) => {
      const x = 0.55 + i * (cardW + 0.3);
      slide.addShape(this.pres.shapes.RECTANGLE, { x, y: 1.28, w: cardW, h: 3.69, fill: { color: COLORS.cardBgMinimal } });
      
      // 카드 타이틀
      slide.addText(card.title, {
        x: x + 0.3, y: 1.55, w: cardW - 0.6, h: 0.38,
        fontSize: 16, color: COLORS.black, fontFace: FONT, valign: "middle", margin: 0,
      });
      
      // 구분선
      slide.addShape(this.pres.shapes.LINE, { x: x + 0.3, y: 2.0, w: cardW - 0.6, h: 0, line: { color: COLORS.border, pt: 1 } });
      
      // 본문 텍스트 (높이를 줄여서 이미지 공간 확보)
      slide.addText(card.body, {
        x: x + 0.3, y: 2.1, w: cardW - 0.6, h: 1.1,
        fontSize: 12, color: COLORS.textMuted, fontFace: FONT, valign: "top", margin: 0,
      });

      // 이미지 삽입 (card.imagePath가 있을 경우)
      if (card.imagePath && fs.existsSync(card.imagePath)) {
        slide.addImage({
          path: card.imagePath,
          x: x + 0.3, y: imgY, w: cardW - 0.6, h: imgH,
          sizing: { type: 'contain', w: cardW - 0.6, h: imgH }
        });
      }

      // 하단 태그
      if (card.tag) {
        slide.addText(card.tag, {
          x: x + 0.3, y: 4.55, w: cardW - 0.6, h: 0.25,
          fontSize: 10, color: COLORS.textMuted, fontFace: FONT, valign: "middle", margin: 0,
        });
      }
    });
  }

  // 7. 피니시 슬라이드 템플릿
  createFinishSlide(data, pageNum) {
    const slide = this.pres.addSlide();
    slide.addShape(this.pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: COLORS.bgSection } });
    this.addBadge(slide, data.badge || "THANK YOU", 0.55, 0.6, true);
    this.addFooter(slide, pageNum || "--");

    slide.addText(data.title, {
      x: 0.55, y: 2.0, w: 9, h: 1.0,
      fontSize: 48, color: COLORS.white, fontFace: FONT, valign: "middle", margin: 0,
    });
    slide.addText(data.subtitle || "", {
      x: 0.55, y: 3.2, w: 9, h: 0.4,
      fontSize: 18, color: COLORS.accentBlue, fontFace: FONT, valign: "middle", margin: 0,
    });
  }

  async save(fileName) {
    await this.pres.writeFile({ fileName });
    console.log(`✅ 생성 완료: ${fileName}`);
  }

  // ── Alias (주문서 작성을 더 편하게) ──
  addTitleSlide(data) { return this.createTitleSlide(data); }
  async addIndexSlide(data) { return await this.createIndexSlide(data); }
  addDividerSlide(data, p) { return this.createDividerSlide(data, p); }
  addSubsectionListSlide(data, p) { return this.createSubsectionSlide(data, p); }
  addCardSlide(data, p) { return this.createCardSlide(data, p); }
  addTableSlide(data, p) { return this.createTableSlide(data, p); }
  addSummarySlide(data, p) { return this.createSummarySlide(data, p); }
  addFinishSlide(data, p) { return this.createFinishSlide(data, p); }
}

module.exports = {
  PPTEngine,
  COLORS
};
