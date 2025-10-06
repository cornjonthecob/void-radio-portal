'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabaseBrowser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    // Check immediately on mount
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session))
    // Stay in sync on any auth change
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    })
    if (error) setError(error.message)
    else setSent(true)
  }

  // If logged in, don’t show the form
  if (authed) {
    return (
      <div className="mx-auto max-w-sm space-y-3">
        <h1 className="text-xl font-semibold">You’re signed in</h1>
        <p className="text-sm">Head to the portal.</p>
        <Link href="/" className="rounded bg-black px-4 py-2 text-white inline-block">
  Go to dashboard →
</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-semibold">Sign in</h1>
      {sent ? (
        <p>
          Magic link sent to <strong>{email}</strong>. Check your inbox.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block text-sm">
            Email
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="rounded bg-black px-4 py-2 text-white">
            Send magic link
          </button>
        </form>
      )}
      <p className="text-xs text-zinc-500">
        Use the one-time link we email you.
      </p>
    </div>
  )
}