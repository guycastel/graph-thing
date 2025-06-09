import { useState, useEffect } from 'react'
import type { GraphNodeData } from '../types'

const GRAPH_API_URL = 'https://mocki.io/v1/dc0ff690-cc05-4f84-b1d7-e96d354994a2'

export const useGraphData = () => {
  const [graphNodes, setGraphNodes] = useState<GraphNodeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(GRAPH_API_URL)
        
        // simulate delay for testing
        // await new Promise(resolve => setTimeout(resolve, 3000))
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setGraphNodes(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch graph data')
      } finally {
        setLoading(false)
      }
    }

    fetchGraph()
  }, [])

  return { data: graphNodes, loading, error }
}
