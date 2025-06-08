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
import { transformApiDataToFlow } from '../../utils/flowTransform'
import type { FlowNodeData } from '../../types/api'
import styles from './FlowGraph.module.css'

const FlowGraph = () => {
  const { data, loading, error } = useApiData()

  const { nodes, edges } = useMemo(() => {
    if (data.length === 0) {
      return { nodes: [], edges: [] }
    }
    
    return transformApiDataToFlow(data)
  }, [data])

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
        <p>Interactive workflow graph with {flowNodes.length} nodes and {flowEdges.length} connections</p>
        <p>Raw data length: {data.length}</p>
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
  )
}

export default FlowGraph
