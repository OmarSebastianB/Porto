'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-photo'

export function PhotoPicker({ initialPhoto = '' }: { initialPhoto?: string }) {
  const [src, setSrc] = useState<string>(initialPhoto)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setSrc(saved)
  }, [])

  const savePhoto = useCallback((dataUrl: string) => {
    setSrc(dataUrl)
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl)
    } catch {
      // quota exceeded or disabled
    }
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file?.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => {
        const data = reader.result
        if (typeof data === 'string') savePhoto(data)
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    [savePhoto]
  )

  const handleClick = () => inputRef.current?.click()

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Choose photo"
      />
      <button
        type="button"
        onClick={handleClick}
        className="w-28 h-28 shrink-0 border-2 border-[var(--border)] bg-[var(--card-bg)] overflow-hidden flex items-center justify-center text-[var(--muted)] text-xs text-center p-2 cursor-pointer hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-white"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>Click to choose photo</span>
        )}
      </button>
    </>
  )
}
