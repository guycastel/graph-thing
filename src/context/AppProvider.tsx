import { useCallback, useMemo, useEffect } from 'react'
import { useNodesState, useEdgesState, addEdge } from 'reactflow'
import type { Connection } from 'reactflow'
import { useGraphData } from '@/domains/workflow/hooks/useGraphData'
import { useActionsData } from '@/domains/actions/hooks/useActionsData'
import { transformApiDataToFlow } from '@/domains/workflow/utils/flowTransform'
import { createNodeFromAction } from '@/domains/actions/utils/nodeFactory'
import type { FlowNodeData } from '@/domains/workflow/types'
import type { ActionData } from '@/domains/actions/types'
import { AppContext, type AppContextType } from './AppContext'

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
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
