'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseBrowser'

export default function AuthButton() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') window.location.href = '/login'
  }

  if (!email) return null

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-zinc-600">{email}</span>
      <button onClick={signOut} className="rounded border px-2 py-1">Sign out</button>
    </div>
  )
}
