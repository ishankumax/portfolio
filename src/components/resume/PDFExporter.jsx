import React, { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import html2pdf from 'html2pdf.js'

export default function PDFExporter({ targetId, filename }) {
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = async () => {
    setIsExporting(true)
    
    const element = document.getElementById(targetId)
    
    // Configure html2pdf options
    const opt = {
      margin: [0, 0, 0, 0], // Top, Left, Bottom, Right
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('Failed to generate PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isExporting}
      aria-label="Download PDF"
      className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
      style={{
        backgroundColor: 'var(--accent)',
        color: '#000', // Ensure text is visible on accent
        opacity: isExporting ? 0.7 : 1,
        cursor: isExporting ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)'
      }}
    >
      {isExporting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Download size={18} />
      )}
      {isExporting ? 'Generating...' : 'Download PDF'}
    </button>
  )
}
