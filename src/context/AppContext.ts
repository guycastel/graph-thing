import { createContext } from 'react'
import type { Node, Edge, Connection, NodeChange, EdgeChange } from 'reactflow'
import type { FlowNodeData } from '@/domains/workflow/types'
import type { ActionData } from '@/domains/actions/types'

export interface AppContextType {
  // Data
  flowNodes: Node<FlowNodeData>[]
  flowEdges: Edge[]
  actions: ActionData[]
  
  // State
  loading: boolean
  error: string | null
  
  // Flow handlers
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  
  // Actions
  handleActionClick: (action: ActionData) => void
  
  // Stats
  stats: {
    nodesCount: number
    edgesCount: number
    dataItemsCount: number
    actionsCount: number
  }
}

export const AppContext = createContext<AppContextType | null>(null)
