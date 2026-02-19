import { Download, Code } from 'lucide-react'
import type { MyResumeItem } from '../../lib/api'

interface ResumeCardProps {
  resume: MyResumeItem
}

export default function ResumeCard({ resume }: ResumeCardProps) {
  const handleDownload = (format: 'pdf' | 'html') => {
    const url = format === 'pdf' ? resume.download_links.pdf : resume.download_links.html
    if (url) {
      window.open(url, '_blank')
    }
  }

  const hasPdf = !!resume.download_links.pdf
  const hasHtml = !!resume.download_links.html

  return (
    <div className="glass-card group relative flex flex-col overflow-hidden rounded-lg">
      {/* Cover thumbnail */}
      <div className="relative flex h-48 items-center justify-center bg-bg-elevated/50">
        <img
          src={resume.resume_cover}
          alt="Resume cover"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Download buttons */}
      {(hasPdf || hasHtml) && (
        <div className="flex gap-2 p-4">
          {hasPdf && (
            <button
              onClick={() => handleDownload('pdf')}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-bg-elevated px-3 py-2 text-body-s font-medium text-text-tertiary transition-all hover:bg-bg-subtle hover:text-text-primary"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </button>
          )}
          {hasHtml && (
            <button
              onClick={() => handleDownload('html')}
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-bg-elevated px-3 py-2 text-body-s font-medium text-text-tertiary transition-all hover:bg-bg-subtle hover:text-text-primary"
            >
              <Code className="h-3.5 w-3.5" />
              HTML
            </button>
          )}
        </div>
      )}
    </div>
  )
}
