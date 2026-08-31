"use client"
import React, { useState } from 'react'
import { getMethodStyle } from './methodStyles'

export default function RouteCard({ route }: { route: any }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const method = getMethodStyle(route.method)
  const isAuth = route.auth === 'yes'

  const copySample = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(route.sampleBody, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <div
      className="overflow-hidden rounded-lg border bg-white transition-colors"
      style={{ borderColor: '#E5E5E1', borderLeftWidth: '3px', borderLeftColor: method.text }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A18]/15"
      >
        <span
          className="mt-0.5 shrink-0 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tracking-wide"
          style={{ color: method.text, backgroundColor: method.bg, borderColor: method.border }}
        >
          {route.method}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="truncate font-mono text-[15px] font-medium text-[#1A1A18]">{route.path}</h3>
            <span className="flex items-center gap-1.5 text-xs text-[#6B6B65]">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: isAuth ? '#B45309' : '#0F766E' }}
              />
              {isAuth ? 'Requires auth' : 'Public'}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B65]">{route.description}</p>
        </div>

        <svg
          className={`mt-1.5 h-4 w-4 shrink-0 text-[#9B9B94] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 gap-4 border-t border-[#EDEDE9] p-4 md:grid-cols-2">
            <div>
              <div className="text-xs font-medium text-[#6B6B65]">Body schema</div>
              <div className="mt-2 rounded-md border border-[#EDEDE9] bg-[#FAFAF8] p-3 font-mono text-sm text-[#1A1A18]">
                {route.bodySchema || '—'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#6B6B65]">
                Sample body
                <button
                  onClick={copySample}
                  className="ml-auto rounded px-1.5 py-0.5 text-[#6B6B65] hover:bg-[#F1F1EE] hover:text-[#1A1A18]"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="mt-2 overflow-auto rounded-md border border-[#EDEDE9] bg-[#FAFAF8] p-3 font-mono text-sm text-[#1A1A18]">
                {JSON.stringify(route.sampleBody, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}