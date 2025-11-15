const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY

export async function generateWorkflowWithClaude(userPrompt){
  if(!CLAUDE_API_KEY) throw new Error('Claude API key missing in .env')

  const systemPrompt = `SEN BIR N8N WORKFLOW UZMANISIN. Kullanıcı isteğini analiz edip sadece JSON formatında production-ready n8n workflow döndür.`

  const res = await fetch('https://api.anthropic.com/v1/messages',{ 
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'x-api-key': CLAUDE_API_KEY
    },
    body: JSON.stringify({ model:'claude-3-5-sonnet-20241022', messages:[{ role:'user', content: systemPrompt + '\n\nKULLANICI: ' + userPrompt }], max_tokens:2000 })
  })

  if(!res.ok){ const err = await res.text(); throw new Error('Claude API error: '+err) }
  const data = await res.json()
  // find text block
  let text = ''
  if(Array.isArray(data.content)){
    for(const b of data.content){ if(b.type === 'text'){ text = b.text; break } }
  } else if(data.output_text) text = data.output_text

  const match = text.match(/\{[\s\S]*\}/)
  if(!match) throw new Error('AI returned no JSON')
  return JSON.parse(match[0])
}