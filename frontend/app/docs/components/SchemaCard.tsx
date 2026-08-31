"use client"
import React, { useState } from 'react'
import { getAccentForName } from './methodStyles'

export default function SchemaCard({ name, def }: { name: string; def: string }) {
  const [copied, setCopied] = useState(false)
  const accent = getAccentForName(name)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(def)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <div
      className="rounded-lg border bg-white p-4"
      style={{ borderColor: '#E5E5E1', borderLeftWidth: '3px', borderLeftColor: accent }}
    >
      <div className="flex items-center gap-2">
        <strong className="font-mono text-sm text-[#1A1A18]">{name}</strong>
        <button
          onClick={copy}
          aria-label={`Copy ${name} schema`}
          className="ml-auto flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-[#6B6B65] hover:bg-[#F1F1EE] hover:text-[#1A1A18]"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="11" height="11" rx="1.5" strokeWidth="2" />
                <path strokeWidth="2" strokeLinecap="round" d="M5 15V5a2 2 0 012-2h10" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap break-words rounded-md border border-[#EDEDE9] bg-[#FAFAF8] p-3 font-mono text-sm text-[#1A1A18]">
        {def}
      </pre>
    </div>
  )
}