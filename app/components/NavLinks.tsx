'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabaseBrowser'

export default function NavLinks() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  if (!authed) return null

  return (
    <div className="flex gap-4 text-sm">
      <Link href="/schedule" className="hover:underline">Full Schedule</Link>
      <Link href="/template" className="hover:underline">8-Week Schedule</Link>
      <Link href="/profile" className="hover:underline">Profile</Link>
      <Link href="/artists" className="hover:underline">Artist Database</Link>
    </div>
  )
}
