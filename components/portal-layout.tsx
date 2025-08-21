"use client"

import type { ReactNode } from "react"

interface PortalLayoutProps {
  children: ReactNode
}

export function PortalLayout({ children }: PortalLayoutProps) {
  return <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>
}


