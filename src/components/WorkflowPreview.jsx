import React from 'react'

export default function WorkflowPreview({ workflow }){
  return (
    <div className="mt-6 bg-gray-800 p-4 rounded">
      <h3 className="font-bold">{workflow.name || 'Generated Workflow'}</h3>
      <div className="mt-2 text-xs">
        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(workflow, null, 2)}</pre>
      </div>
    </div>
  )
}