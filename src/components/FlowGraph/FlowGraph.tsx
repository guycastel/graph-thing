import { useCallback, useMemo, useEffect } from 'react'
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlowProvider
} from 'reactflow'
import type { Connection } from 'reactflow'
import 'reactflow/dist/style.css'
import { useApiData } from '../../hooks/useApiData'
import { useActionsData } from '../../hooks/useActionsData'
import { transformApiDataToFlow } from '../../utils/flowTransform'
import type { FlowNodeData } from '../../types/api'
import styles from './FlowGraph.module.css'

const FlowGraph = () => {
  const { data, loading: nodesLoading, error: nodesError } = useApiData()
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

  // Update flow state when data changes
  useEffect(() => {
    setFlowNodes(nodes)
    setFlowEdges(edges)
  }, [nodes, edges, setFlowNodes, setFlowEdges])

  const onConnect = useCallback(
    (params: Connection) => setFlowEdges((eds) => addEdge(params, eds)),
    [setFlowEdges]
  )

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading graph data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error loading data:</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Workflow Graph Visualization</h1>
        <p>
          Interactive workflow graph with {flowNodes.length} nodes and {flowEdges.length}{' '}
          connections
        </p>
        <p>
          Nodes data: {data.length} items | Actions data: {actions.length} items
        </p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <h3>Available Actions</h3>
          <div className={styles.actionsList}>
            {actions.map((action) => (
              <div key={action.id} className={styles.actionItem}>
                <div className={styles.actionName}>{action.name}</div>
                <div className={styles.actionMeta}>
                  <span className={styles.actionType} data-type={action.type}>
                    {action.type}
                  </span>
                  {action.service && (
                    <span className={styles.actionService}>({action.service})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.flowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              attributionPosition="bottom-left"
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  )
}

export default FlowGraph
