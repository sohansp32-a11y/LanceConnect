"use client"
import React, { useMemo, useState } from 'react'
import SearchBar from './SearchBar'
import RouteCard from './RouteCard'
import SchemaCard from './SchemaCard'

type AuthFilter = 'all' | 'auth' | 'public'

const FILTERS: { key: AuthFilter; label: string }[] = [
  { key: 'all', label: 'All routes' },
  { key: 'auth', label: 'Requires auth' },
  { key: 'public', label: 'Public' },
]

function formatDate(value: string) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function DocsApp({ initialDocs }: { initialDocs: any }) {
  const [query, setQuery] = useState('')
  const [authFilter, setAuthFilter] = useState<AuthFilter>('all')

  const routes = initialDocs.routes || []
  const schemas = initialDocs.schemas || {}
  const schemaEntries = Object.entries(schemas)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return routes.filter((r: any) => {
      if (authFilter === 'auth' && r.auth !== 'yes') return false
      if (authFilter === 'public' && r.auth === 'yes') return false
      if (!q) return true
      const hay = [r.path, r.method, r.description, r.bodySchema, JSON.stringify(r.sampleBody)].join(' ').toLowerCase()
      return hay.includes(q)
    })
  }, [routes, query, authFilter])

  const authCount = routes.filter((r: any) => r.auth === 'yes').length
  const hasActiveFilters = query.trim().length > 0 || authFilter !== 'all'

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A18]">{initialDocs.title}</h1>
          {initialDocs.notes ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B6B65]">{initialDocs.notes}</p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <StatChip label={`${routes.length} route${routes.length === 1 ? '' : 's'}`} />
            <StatChip label={`${authCount} require auth`} />
            <StatChip label={`${schemaEntries.length} schema${schemaEntries.length === 1 ? '' : 's'}`} />
            {initialDocs.generated_at ? (
              <StatChip label={`Updated ${formatDate(initialDocs.generated_at)}`} muted />
            ) : null}
          </div>
        </header>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="md:flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-[#E5E5E1] bg-white p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setAuthFilter(f.key)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  authFilter === f.key ? 'bg-[#1A1A18] text-white' : 'text-[#6B6B65] hover:bg-[#F1F1EE]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {filtered.length === 0 ? (
              <EmptyState
                hasActiveFilters={hasActiveFilters}
                onReset={() => {
                  setQuery('')
                  setAuthFilter('all')
                }}
              />
            ) : (
              filtered.map((r: any) => <RouteCard key={r.method + r.path} route={r} />)
            )}
          </div>

          {schemaEntries.length > 0 && (
            <aside>
              <div className="sticky top-8 space-y-3">
                <h2 className="text-sm font-medium text-[#6B6B65]">Schemas</h2>
                <div className="space-y-3">
                  {schemaEntries.map(([name, def]: any) => (
                    <SchemaCard key={name} name={name} def={String(def)} />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

function StatChip({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
        muted ? 'border-[#EDEDE9] text-[#9B9B94]' : 'border-[#E5E5E1] text-[#6B6B65]'
      }`}
    >
      {label}
    </span>
  )
}

function EmptyState({ hasActiveFilters, onReset }: { hasActiveFilters: boolean; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#E5E5E1] bg-white py-16 text-center">
      <svg className="h-8 w-8 text-[#D6D6D1]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m0 6v4a2 2 0 002 2h4m6 0h4a2 2 0 002-2v-4m0-6V5a2 2 0 00-2-2h-4" />
      </svg>
      <p className="mt-4 text-sm font-medium text-[#1A1A18]">No routes match your filters</p>
      <p className="mt-1 text-sm text-[#6B6B65]">Try a different search term or filter.</p>
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="mt-4 rounded-md border border-[#E5E5E1] bg-white px-3 py-1.5 text-sm font-medium text-[#1A1A18] hover:bg-[#F1F1EE]"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}