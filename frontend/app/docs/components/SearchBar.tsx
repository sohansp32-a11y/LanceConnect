"use client"
import React, { useEffect, useRef } from 'react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (e.key === '/' && !isTyping) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B9B94]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
        <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search routes, schemas, or keywords"
        className="w-full rounded-lg border border-[#E5E5E1] bg-white py-3 pl-11 pr-11 text-sm text-[#1A1A18] placeholder-[#9B9B94] transition-shadow focus:outline-none focus:ring-2 focus:ring-[#1A1A18]/15"
      />

      {value ? (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#9B9B94] hover:bg-[#F1F1EE] hover:text-[#1A1A18]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[#E5E5E1] bg-[#FAFAF8] px-1.5 py-0.5 font-mono text-[11px] text-[#9B9B94]">
          /
        </kbd>
      )}
    </div>
  )
}