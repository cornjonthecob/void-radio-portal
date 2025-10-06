'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseBrowser'

export default function DebugBadge() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [mw, setMw] = useState<string | null>(null)

  useEffect(() => {
    // Check auth
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
      setEmail(data.session?.user?.email ?? null)
    })
    // Read middleware header if present
    // (We can't read response headers of the current page,
    // so do a tiny ping to the same origin to capture it.)
    fetch('/', { method: 'HEAD' })
      .then(r => setMw(r.headers.get('x-mw')))
      .catch(() => setMw(null))
  }, [])

  return (
    <div className="fixed bottom-2 left-2 z-50 rounded bg-black/80 text-white px-2 py-1 text-xs shadow">
      <div>MW: {mw ? 'active' : '—'}</div>
      <div>Auth: {authed === null ? 'loading' : authed ? 'yes' : 'no'}</div>
      {email && <div className="truncate max-w-[200px]">{email}</div>}
    </div>
  )
}