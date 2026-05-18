import type { Metadata } from 'next'
import { JetBrains_Mono, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// 1. Mono and Sans Fonts Configuration
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: '--font-mono' 
})

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: '--font-sans' 
})

// 2. SEO & Application Metadata Platform Header Configuration
export const metadata: Metadata = {
  title: 'AetherRecon | Cybersecurity Reconnaissance Dashboard',
  description: 'Advanced OSINT and reconnaissance platform for offensive security teams',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

// 3. Main Master Layout Frame
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /* 🔥 CRITICAL EXTRA FIXES:
      - suppressHydrationWarning ko html aur body DONO tags par enforce kiya hai.
      - Is se ColorZilla ya baki extensions ke inject kiye huve arbitrary properties ('cz-shortcut-listen') console errors trigger nahi karengi.
    */
    <html lang="en" className={`${jetbrainsMono.variable} ${dmSans.variable} bg-[#020617]`} suppressHydrationWarning>
      <body className="font-mono antialiased text-slate-200" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}