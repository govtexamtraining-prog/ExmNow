// Pure JavaScript PDF-1.4 Generator - Zero External Dependencies
// Produces 100% valid, standards-compliant PDF documents for download

function escapePdfText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' '); // Keep printable characters
}

export function buildPdfDocument({ title, subtitle, metadata = {}, sections = [] }) {
  const contentStream = [];

  // Page dimensions (Letter: 612 x 792 pt)
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 50;

  // Header Background Banner
  contentStream.push('0.05 0.35 0.75 rg'); // Brand deep blue
  contentStream.push(`0 720 ${pageWidth} 72 re f`);

  // Header Title
  contentStream.push('BT');
  contentStream.push('/F2 18 Tf');
  contentStream.push('1 1 1 rg'); // White text
  contentStream.push(`${margin} 755 Td`);
  contentStream.push(`(${escapePdfText(title || 'EXMNOW OFFICIAL DOCUMENT')}) Tj`);
  contentStream.push('ET');

  // Header Subtitle
  if (subtitle) {
    contentStream.push('BT');
    contentStream.push('/F1 10 Tf');
    contentStream.push('0.9 0.95 1 rg'); // Light white-blue text
    contentStream.push(`${margin} 735 Td`);
    contentStream.push(`(${escapePdfText(subtitle)}) Tj`);
    contentStream.push('ET');
  }

  // Watermark
  contentStream.push('q');
  contentStream.push('0.92 0.94 0.97 rg'); // Very light gray-blue
  contentStream.push('BT');
  contentStream.push('/F2 36 Tf');
  contentStream.push('120 400 Td');
  contentStream.push('(EXMNOW VERIFIED ARCHIVE) Tj');
  contentStream.push('ET');
  contentStream.push('Q');

  // Metadata Box
  let currentY = 700;
  const metaKeys = Object.keys(metadata);
  if (metaKeys.length > 0) {
    contentStream.push('0.96 0.97 0.99 rg'); // Light box fill
    contentStream.push('0.85 0.88 0.93 RG'); // Border
    contentStream.push('1 w');
    contentStream.push(`${margin} ${currentY - 45} ${pageWidth - 2 * margin} 45 re B`);

    contentStream.push('BT');
    contentStream.push('/F2 9 Tf');
    contentStream.push('0.15 0.25 0.4 rg');

    let xOffset = margin + 15;
    metaKeys.slice(0, 4).forEach((key) => {
      contentStream.push(`${xOffset} ${currentY - 20} Td`);
      contentStream.push(`(${escapePdfText(key.toUpperCase())}: ${escapePdfText(metadata[key])}) Tj`);
      contentStream.push(`-${xOffset} -${currentY - 20} Td`); // Reset relative positioning
      xOffset += 130;
    });

    contentStream.push('ET');
    currentY -= 65;
  }

  // Body Sections
  sections.forEach((section) => {
    if (currentY < 100) return; // Stop if near footer

    // Section Heading
    if (section.heading) {
      contentStream.push('0.05 0.35 0.75 rg');
      contentStream.push(`${margin} ${currentY - 2} ${pageWidth - 2 * margin} 1.5 re f`);

      contentStream.push('BT');
      contentStream.push('/F2 12 Tf');
      contentStream.push('0.05 0.25 0.55 rg');
      contentStream.push(`${margin} ${currentY + 4} Td`);
      contentStream.push(`(${escapePdfText(section.heading)}) Tj`);
      contentStream.push('ET');
      currentY -= 22;
    }

    // Section Items / Paragraphs
    if (section.paragraphs && Array.isArray(section.paragraphs)) {
      section.paragraphs.forEach((p) => {
        if (currentY < 90) return;
        contentStream.push('BT');
        contentStream.push('/F1 9.5 Tf');
        contentStream.push('0.15 0.18 0.25 rg');
        contentStream.push(`${margin + 5} ${currentY} Td`);
        contentStream.push(`(${escapePdfText(p)}) Tj`);
        contentStream.push('ET');
        currentY -= 14;
      });
      currentY -= 8;
    }

    // Section Table (if provided)
    if (section.table && Array.isArray(section.table.rows)) {
      const headers = section.table.headers || [];
      const colWidth = (pageWidth - 2 * margin - 10) / (headers.length || 1);

      // Table Header Row
      contentStream.push('0.92 0.95 0.99 rg');
      contentStream.push(`${margin} ${currentY - 14} ${pageWidth - 2 * margin} 18 re f`);

      contentStream.push('BT');
      contentStream.push('/F2 9 Tf');
      contentStream.push('0.1 0.2 0.35 rg');
      headers.forEach((h, idx) => {
        const colX = margin + 8 + idx * colWidth;
        contentStream.push(`${colX} ${currentY - 10} Td`);
        contentStream.push(`(${escapePdfText(h)}) Tj`);
        contentStream.push(`-${colX} -${currentY - 10} Td`);
      });
      contentStream.push('ET');
      currentY -= 18;

      // Table Body Rows
      section.table.rows.forEach((row, rowIdx) => {
        if (currentY < 90) return;
        const bg = rowIdx % 2 === 0 ? '1 1 1 rg' : '0.98 0.98 0.99 rg';
        contentStream.push(bg);
        contentStream.push(`${margin} ${currentY - 12} ${pageWidth - 2 * margin} 15 re f`);

        // Row border
        contentStream.push('0.9 0.92 0.95 RG');
        contentStream.push('0.5 w');
        contentStream.push(`${margin} ${currentY - 12} ${pageWidth - 2 * margin} 15 re S`);

        contentStream.push('BT');
        contentStream.push('/F1 8.5 Tf');
        contentStream.push('0.15 0.18 0.25 rg');
        row.forEach((cell, idx) => {
          const colX = margin + 8 + idx * colWidth;
          contentStream.push(`${colX} ${currentY - 8} Td`);
          contentStream.push(`(${escapePdfText(cell)}) Tj`);
          contentStream.push(`-${colX} -${currentY - 8} Td`);
        });
        contentStream.push('ET');
        currentY -= 15;
      });
      currentY -= 10;
    }
  });

  // Footer
  contentStream.push('0.85 0.88 0.92 RG');
  contentStream.push('1 w');
  contentStream.push(`${margin} 45 ${pageWidth - 2 * margin} 45 m ${pageWidth - margin} 45 l S`);

  contentStream.push('BT');
  contentStream.push('/F1 8 Tf');
  contentStream.push('0.5 0.55 0.65 rg');
  contentStream.push(`${margin} 30 Td`);
  contentStream.push('(Generated by ExmNow Intelligence Engine - Official Academic Repository Document) Tj');
  contentStream.push('ET');

  contentStream.push('BT');
  contentStream.push('/F2 8 Tf');
  contentStream.push('0.1 0.4 0.8 rg');
  contentStream.push(`${pageWidth - margin - 140} 30 Td`);
  contentStream.push('(Verified Digital Copy) Tj');
  contentStream.push('ET');

  const streamData = contentStream.join('\n');
  const streamLength = Buffer.byteLength(streamData, 'utf-8');

  // PDF Objects
  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj`);
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  objects.push(`6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamData}\nendstream\nendobj`);

  // Assemble PDF with accurate cross-reference table (xref)
  let offset = 9; // length of "%PDF-1.4\n"
  const xref = ['xref', '0 7', '0000000000 65535 f '];

  const fullPdfChunks = ['%PDF-1.4\n'];

  objects.forEach((obj, idx) => {
    const objOffset = offset;
    const padded = String(objOffset).padStart(10, '0') + ' 00000 n ';
    xref.push(padded);

    const chunk = obj + '\n';
    fullPdfChunks.push(chunk);
    offset += Buffer.byteLength(chunk, 'utf-8');
  });

  const startxref = offset;
  const xrefSection = xref.join('\n') + '\n';
  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  fullPdfChunks.push(xrefSection);
  fullPdfChunks.push(trailer);

  return Buffer.from(fullPdfChunks.join(''), 'utf-8');
}
