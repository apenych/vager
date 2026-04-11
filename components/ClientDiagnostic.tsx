'use client'

import { useEffect, useState } from 'react'

export default function ClientDiagnostic() {
  const [status, setStatus] = useState('...')

  useEffect(() => {
    setStatus('OK: React hydrated ✓')
    // Show a visible indicator for 10 seconds
    const el = document.createElement('div')
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#006600;color:white;padding:8px;font-size:12px;text-align:center;pointer-events:none;'
    el.textContent = '✓ React работает нормально (уберём после диагностики)'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 8000)
  }, [])

  return null
}
