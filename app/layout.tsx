import Link from 'next/link';
import NavLinks from './components/NavLinks'
export const metadata = { title: "Void Radio Portal" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        {/* Desktop top nav */}
        <header className="sticky top-0 z-10 border-b bg-white">
          <nav className="mx-auto hidden max-w-5xl items-center justify-between p-4 md:flex">
            <Link href="/" className="font-semibold">Void Radio</Link>
            <NavLinks />
          </nav>
          {/* Mobile bottom tabs */}
          <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t bg-white p-2 text-xs md:hidden">
            <NavLinks />
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4 pb-16 md:pb-4">{children}</main>
        <footer className="mx-auto max-w-5xl p-4 text-xs text-zinc-500">
          Void Radio Portal (MVP)
        </footer>
      </body>
    </html>
  );
}