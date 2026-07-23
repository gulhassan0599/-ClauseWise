import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates and triggers a download of a professional PDF report.
 * @param {Object} data - The contract analysis JSON data
 */
export const generatePdfReport = (data) => {
  // Create a new PDF document (Portrait, A4)
  const doc = new jsPDF();
  
  // Set up branding colors
  const primaryColor = [37, 99, 235]; // #2563eb
  const textColor = [30, 41, 59]; // slate-800
  const mutedColor = [100, 116, 139]; // slate-500

  // Helper to add standardized text
  const addText = (text, x, y, size, color, isBold = false, isItalic = false) => {
    doc.setFontSize(size);
    doc.setTextColor(...color);
    let style = 'normal';
    if (isBold) style = 'bold';
    if (isItalic) style = 'italic';
    doc.setFont('helvetica', style);
    doc.text(text, x, y);
  };

  // --- HEADER ---
  // Simple Box Logo placeholder
  doc.setFillColor(...primaryColor);
  doc.rect(14, 15, 8, 8, 'F');
  
  // App Name
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('ClauseWise', 25, 22);

  // Report Title
  addText('Contract Analysis Report', 14, 38, 16, textColor, true);
  
  // Date
  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  addText(`Generated on: ${dateStr}`, 14, 45, 10, mutedColor);

  // --- EXECUTIVE SUMMARY ---
  let currentY = 55;
  addText('Executive Summary', 14, currentY, 14, textColor, true);
  currentY += 8;

  // Stat badges (Text format)
  doc.setFontSize(11);
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  doc.text(`Document Type:`, 14, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.documentType || 'N/A', 48, currentY);
  
  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text(`Overall Risk:`, 14, currentY);
  doc.setFont('helvetica', 'normal');
  // Color code the risk
  if (data.overallRisk?.level === 'High') doc.setTextColor(220, 53, 69);
  else if (data.overallRisk?.level === 'Medium') doc.setTextColor(255, 193, 7);
  else doc.setTextColor(25, 135, 84);
  doc.text(data.overallRisk?.level || 'N/A', 40, currentY);
  
  currentY += 6;
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'bold');
  doc.text(`Confidence:`, 14, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.analysisConfidence?.level || 'N/A', 38, currentY);

  // Summary Text
  currentY += 10;
  doc.setFontSize(10);
  doc.setTextColor(...textColor);
  const splitSummary = doc.splitTextToSize(data.summary || 'No summary provided.', 180);
  doc.text(splitSummary, 14, currentY);
  currentY += (splitSummary.length * 5) + 5;

  if (data.overallRisk?.reason) {
    doc.setFont('helvetica', 'bold');
    doc.text('Risk Reason:', 14, currentY);
    doc.setFont('helvetica', 'normal');
    const splitReason = doc.splitTextToSize(data.overallRisk.reason, 180);
    doc.text(splitReason, 14, currentY + 5);
    currentY += (splitReason.length * 5) + 12;
  } else {
    currentY += 5;
  }

  // --- RISKY CLAUSES TABLE ---
  addText('Risky Clauses', 14, currentY, 14, textColor, true);
  currentY += 4;

  if (data.riskyClauses && data.riskyClauses.length > 0) {
    const riskyTableData = data.riskyClauses.map(c => [
      c.title,
      c.severity,
      c.explanation,
      c.whyItMatters
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Title', 'Severity', 'Explanation', 'Why it matters']],
      body: riskyTableData,
      theme: 'grid',
      headStyles: { fillColor: [220, 53, 69] }, // Danger red header
      styles: { fontSize: 9, cellPadding: 4, textColor: textColor },
      columnStyles: {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 20 },
        2: { cellWidth: 65 },
        3: { cellWidth: 62 }
      },
      didParseCell: (dataInfo) => {
        if (dataInfo.section === 'body' && dataInfo.column.index === 1) {
           if (dataInfo.cell.raw === 'High') {
             dataInfo.cell.styles.textColor = [220, 53, 69]; // Red
             dataInfo.cell.styles.fontStyle = 'bold';
           } else if (dataInfo.cell.raw === 'Medium') {
             dataInfo.cell.styles.textColor = [200, 150, 0]; // Dark yellow/orange
             dataInfo.cell.styles.fontStyle = 'bold';
           }
        }
      }
    });
    currentY = doc.lastAutoTable.finalY + 15;
  } else {
    currentY += 5;
    addText('No significant risky clauses detected.', 14, currentY, 10, mutedColor);
    currentY += 15;
  }

  // Check page break for important clauses
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }

  // --- IMPORTANT CLAUSES TABLE ---
  addText('Important Clauses', 14, currentY, 14, textColor, true);
  currentY += 4;

  if (data.importantClauses && data.importantClauses.length > 0) {
    const importantTableData = data.importantClauses.map(c => [
      c.title,
      c.explanation
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Title', 'Explanation']],
      body: importantTableData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor },
      styles: { fontSize: 9, cellPadding: 4, textColor: textColor },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 132 }
      }
    });
    currentY = doc.lastAutoTable.finalY + 15;
  } else {
    currentY += 5;
    addText('No specific important clauses highlighted.', 14, currentY, 10, mutedColor);
    currentY += 15;
  }

  // --- FOOTER DISCLAIMER ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 282, 196, 282);
    
    // Disclaimer text
    doc.setFontSize(8);
    doc.setTextColor(...mutedColor);
    doc.setFont('helvetica', 'italic');
    const disclaimer = data.disclaimer || 'This analysis is for informational purposes only and does not constitute legal advice.';
    const splitDisclaimer = doc.splitTextToSize(disclaimer, 160);
    doc.text(splitDisclaimer, 14, 287);
    
    // Page number
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount}`, 180, 287);
  }

  // Generate safe filename
  const filenameDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  doc.save(`ClauseWise_Report_${filenameDate}.pdf`);
};
