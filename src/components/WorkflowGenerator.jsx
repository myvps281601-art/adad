import React, { useState } from 'react'
import WorkflowPreview from './WorkflowPreview'
import { generateWorkflowWithClaude } from '../utils/claudeApi'

export default function WorkflowGenerator({ darkMode }){
  const [prompt, setPrompt] = useState('')
  const [workflow, setWorkflow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate(){
    if(!prompt.trim()){ setError('Lütfen detaylı bir prompt girin'); return }
    setLoading(true); setError('')
    try{
      const wf = await generateWorkflowWithClaude(prompt)
      setWorkflow(wf)
    }catch(e){ setError(e.message || 'AI hatası') }
    setLoading(false)
  }

  return (
    <div>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ne yapmak istiyorsun? Çok detaylı yazın..." className="w-full h-40 p-4 rounded-lg bg-gray-800 text-white" />
      <div className="flex gap-3 mt-4">
        <button onClick={handleGenerate} disabled={loading} className="px-6 py-3 bg-purple-600 rounded-lg">{loading? 'Oluşturuluyor...':'Workflow Oluştur'}</button>
        <button onClick={()=>{ setPrompt(''); setWorkflow(null); setError('') }} className="px-6 py-3 bg-gray-700 rounded-lg">Temizle</button>
      </div>
      {error && <div className="mt-4 p-3 bg-red-600 rounded">{error}</div>}
      {workflow && <WorkflowPreview workflow={workflow} />}
    </div>
  )
}