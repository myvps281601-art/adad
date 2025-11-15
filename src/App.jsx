import React, { useState } from 'react'
import WorkflowGenerator from './components/WorkflowGenerator'

export default function App(){
  const [dark] = useState(true)
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">⚡ N8N AI Builder (MVP)</h1>
        <p className="text-sm text-gray-300 mt-1">Prompt -> production-ready n8n workflow JSON</p>
      </header>
      <main className="max-w-6xl mx-auto">
        <WorkflowGenerator darkMode={dark} />
      </main>
    </div>
  )
}