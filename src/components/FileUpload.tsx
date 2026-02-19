import { useState, useRef, useCallback } from 'react'
import { Check, Upload } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  file: File | null
}

export default function FileUpload({ onFileSelect, file }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const droppedFile = e.dataTransfer.files?.[0]
      if (droppedFile && droppedFile.type === 'application/pdf') {
        onFileSelect(droppedFile)
      }
    },
    [onFileSelect]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        onFileSelect(selectedFile)
      }
    },
    [onFileSelect]
  )

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div>
      <label className="mb-3 block text-body-s font-medium text-text-secondary">
        PDF do LinkedIn
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300 ${
          dragActive
            ? 'border-accent-secondary bg-accent-subtle'
            : file
              ? 'border-success/30 bg-success-subtle'
              : 'border-border-faint bg-bg-elevated hover:border-border-default hover:bg-bg-overlay'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        {file ? (
          <>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-subtle">
              <Check className="h-6 w-6 text-success" />
            </div>
            <p className="mb-1 text-body-m font-medium text-text-primary">{file.name}</p>
            <p className="text-body-s text-text-tertiary">{formatFileSize(file.size)}</p>
            <p className="mt-2 text-body-s text-text-disabled">
              Clique para trocar o arquivo
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated">
              <Upload className="h-6 w-6 text-text-tertiary" />
            </div>
            <p className="mb-1 text-body-m font-medium text-text-secondary">
              Arraste seu PDF aqui ou clique para selecionar
            </p>
            <p className="text-body-s text-text-disabled">
              Exporte seu perfil do LinkedIn como PDF
            </p>
          </>
        )}
      </div>
    </div>
  )
}
