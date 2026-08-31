import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import DocsApp from './components/DocsApp'

async function fetchDocs() {
  const file = path.join(process.cwd(), 'public', 'docs.json')
  const content = await fs.readFile(file, 'utf8')
  return JSON.parse(content)
}

export default async function DocsPage() {
  const docs = await fetchDocs()

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <DocsApp initialDocs={docs} />
    </div>
  )
}
