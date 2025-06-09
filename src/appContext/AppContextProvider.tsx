import { useCallback, useMemo, useEffect } from 'react'
import { useNodesState, useEdgesState, addEdge } from 'reactflow'
import type { Connection } from 'reactflow'
import { useGraphData } from '@/hooks/useGraphData'
import { useActionsData } from '@/hooks/useActionsData'
import { transformApiDataToFlow } from '@/utils/flowTransform'
import { createNodeFromAction } from '@/utils/nodeFactory'
import type { FlowNodeData, ActionData } from '@/interfaces/interfaces'
import { AppContext, type AppContextType } from './AppContext'

interface AppContextProviderProps {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { data, loading: nodesLoading, error: nodesError } = useGraphData()
  const { actions, loading: actionsLoading, error: actionsError } = useActionsData()

  const loading = nodesLoading || actionsLoading
  const error = nodesError ?? actionsError

  const { nodes, edges } = useMemo(() => {
    if (data.length === 0) {
      return { nodes: [], edges: [] }
    }
    return transformApiDataToFlow(data, actions)
  }, [data, actions])

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState<FlowNodeData>(nodes)
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges)

  useEffect(() => {
    setFlowNodes(nodes)
    setFlowEdges(edges)
  }, [nodes, edges, setFlowNodes, setFlowEdges])

  const onConnect = useCallback(
    (params: Connection) => setFlowEdges((eds) => addEdge(params, eds)),
    [setFlowEdges]
  )

  const handleActionClick = useCallback(
    (action: ActionData) => {
      const newNode = createNodeFromAction(action)
      setFlowNodes((nodes) => [...nodes, newNode])
    },
    [setFlowNodes]
  )

  const stats = useMemo(() => ({
    nodesCount: flowNodes.length,
    edgesCount: flowEdges.length,
    dataItemsCount: data.length,
    actionsCount: actions.length,
  }), [flowNodes.length, flowEdges.length, data.length, actions.length])

  const value: AppContextType = useMemo(() => ({
    flowNodes,
    flowEdges,
    actions,
    loading,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleActionClick,
    stats,
  }), [
    flowNodes,
    flowEdges,
    actions,
    loading,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleActionClick,
    stats,
  ])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
