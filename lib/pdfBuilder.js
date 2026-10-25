import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function buildPdfDocument({ title, subtitle, authority, metadata = {}, page1Sections = [], page2Sections = [] }) {
  const doc = await PDFDocument.create();

  // Embed standard Helvetica fonts
  const regularFont = await doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 45;

  const isMultiPage = page2Sections && page2Sections.length > 0;
  const totalPages = isMultiPage ? 2 : 1;

  function renderHeader(page, pTitle, pSub, pAuth, isFirstPage) {
    // Header Banner Background (Deep Navy Blue)
    page.drawRectangle({
      x: 0,
      y: 710,
      width: pageWidth,
      height: 82,
      color: rgb(0.04, 0.28, 0.65)
    });

    // Gold Accent Stripe
    page.drawRectangle({
      x: 0,
      y: 706,
      width: pageWidth,
      height: 4,
      color: rgb(0.95, 0.75, 0.15)
    });

    // Authority Line
    if (pAuth) {
      page.drawText((pAuth || '').toUpperCase().substring(0, 75), {
        x: margin,
        y: 768,
        size: 8.5,
        font: boldFont,
        color: rgb(0.9, 0.95, 1)
      });
    }

    // Title
    page.drawText((pTitle || 'OFFICIAL EXAMINATION DOCUMENT').toUpperCase().substring(0, 52), {
      x: margin,
      y: 746,
      size: 13.5,
      font: boldFont,
      color: rgb(1, 1, 1)
    });

    // Subtitle
    if (pSub) {
      page.drawText((pSub || '').substring(0, 75), {
        x: margin,
        y: 728,
        size: 9,
        font: regularFont,
        color: rgb(0.85, 0.92, 1)
      });
    }

    // Watermark Background
    page.drawText('EXMNOW VERIFIED OFFICIAL ARCHIVE', {
      x: 75,
      y: 380,
      size: 26,
      font: boldFont,
      color: rgb(0.93, 0.95, 0.98),
      rotate: { angle: 30, type: 'degrees' }
    });
  }

  function renderFooter(page, pageNum) {
    // Top separator rule
    page.drawLine({
      start: { x: margin, y: 45 },
      end: { x: pageWidth - margin, y: 45 },
      thickness: 0.8,
      color: rgb(0.85, 0.88, 0.92)
    });

    page.drawText('ExmNow All-India Examination Repository • Digital Verification Code: EXM-TN-2026-CERT', {
      x: margin,
      y: 30,
      size: 7.5,
      font: regularFont,
      color: rgb(0.5, 0.55, 0.65)
    });

    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: pageWidth - margin - 55,
      y: 30,
      size: 8,
      font: boldFont,
      color: rgb(0.04, 0.28, 0.65)
    });
  }

  function renderSections(page, sections, startY) {
    let currentY = startY;

    sections.forEach((sec) => {
      if (currentY < 60) return;

      // Section Heading
      if (sec.heading) {
        // Accent bar under heading
        page.drawRectangle({
          x: margin,
          y: currentY - 2,
          width: pageWidth - 2 * margin,
          height: 1.5,
          color: rgb(0.04, 0.28, 0.65)
        });

        page.drawText(sec.heading.substring(0, 75), {
          x: margin,
          y: currentY + 3,
          size: 9.5,
          font: boldFont,
          color: rgb(0.04, 0.25, 0.55)
        });
        currentY -= 18;
      }

      // Paragraphs
      if (sec.paragraphs && Array.isArray(sec.paragraphs)) {
        sec.paragraphs.forEach((p) => {
          if (currentY < 55) return;
          page.drawText(p.substring(0, 95), {
            x: margin + 4,
            y: currentY,
            size: 8,
            font: regularFont,
            color: rgb(0.15, 0.18, 0.25)
          });
          currentY -= 12.5;
        });
        currentY -= 5;
      }

      // Table
      if (sec.table && Array.isArray(sec.table.rows)) {
        const headers = sec.table.headers || [];
        const colWidth = (pageWidth - 2 * margin - 6) / (headers.length || 1);

        // Header Background
        page.drawRectangle({
          x: margin,
          y: currentY - 14,
          width: pageWidth - 2 * margin,
          height: 16,
          color: rgb(0.92, 0.95, 0.99)
        });

        headers.forEach((h, idx) => {
          const colX = margin + 6 + idx * colWidth;
          page.drawText(h.substring(0, 26), {
            x: colX,
            y: currentY - 10,
            size: 8,
            font: boldFont,
            color: rgb(0.05, 0.2, 0.4)
          });
        });
        currentY -= 16;

        // Table Rows
        sec.table.rows.forEach((row, rowIdx) => {
          if (currentY < 55) return;
          const isEven = rowIdx % 2 === 0;

          page.drawRectangle({
            x: margin,
            y: currentY - 13,
            width: pageWidth - 2 * margin,
            height: 14,
            color: isEven ? rgb(1, 1, 1) : rgb(0.98, 0.98, 0.99),
            borderColor: rgb(0.88, 0.91, 0.95),
            borderWidth: 0.5
          });

          row.forEach((cell, idx) => {
            const colX = margin + 6 + idx * colWidth;
            page.drawText(String(cell || '').substring(0, 32), {
              x: colX,
              y: currentY - 9,
              size: 7.5,
              font: regularFont,
              color: rgb(0.15, 0.18, 0.25)
            });
          });
          currentY -= 14;
        });
        currentY -= 6;
      }
    });
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = doc.addPage([pageWidth, pageHeight]);
  renderHeader(page1, title, subtitle, authority, true);

  // Metadata Box on Page 1
  let currentY = 690;
  const metaKeys = Object.keys(metadata);
  if (metaKeys.length > 0) {
    page1.drawRectangle({
      x: margin,
      y: currentY - 36,
      width: pageWidth - 2 * margin,
      height: 36,
      color: rgb(0.96, 0.97, 0.99),
      borderColor: rgb(0.85, 0.88, 0.93),
      borderWidth: 0.8
    });

    let xOffset = margin + 10;
    metaKeys.slice(0, 4).forEach((key) => {
      page1.drawText(`${key.toUpperCase()}: ${metadata[key]}`.substring(0, 26), {
        x: xOffset,
        y: currentY - 22,
        size: 7.5,
        font: boldFont,
        color: rgb(0.15, 0.25, 0.45)
      });
      xOffset += 130;
    });

    currentY -= 48;
  }

  renderSections(page1, page1Sections, currentY);
  renderFooter(page1, 1);

  // ==========================================
  // PAGE 2 (Multi-page)
  // ==========================================
  if (isMultiPage) {
    const page2 = doc.addPage([pageWidth, pageHeight]);
    renderHeader(page2, title, `${subtitle} (Continued - Part 2)`, authority, false);
    renderSections(page2, page2Sections, 685);
    renderFooter(page2, 2);
  }

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
