import { useState, useEffect } from 'react'
import type { ActionData } from '../types/api'

const ACTIONS_API_URL = 'https://mocki.io/v1/dfd12cc0-2698-49e4-a71d-f21839ded396'

export const useActionsData = () => {
  const [actions, setActions] = useState<ActionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActions = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(ACTIONS_API_URL)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setActions(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch actions data')
      } finally {
        setLoading(false)
      }
    }

    fetchActions()
  }, [])

  return { actions, loading, error }
}
