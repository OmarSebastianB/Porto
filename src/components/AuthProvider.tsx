'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type AuthContextType = { canEdit: boolean | null; refetch: () => void }

const AuthContext = createContext<AuthContextType>({ canEdit: null, refetch: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [canEdit, setCanEdit] = useState<boolean | null>(null)

  const refetch = useCallback(async () => {
    try {
      const res = await fetch('/api/can-edit')
      const data = await res.json()
      setCanEdit(!!data.canEdit)
    } catch {
      setCanEdit(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <AuthContext.Provider value={{ canEdit, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
