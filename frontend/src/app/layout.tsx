import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MazeQuest AI - AI-Powered Maze Generator & Pathfinder',
  description: 'Watch Artificial Intelligence solve its own mazes with stunning visualizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
