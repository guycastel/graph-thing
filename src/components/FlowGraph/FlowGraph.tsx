import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useAppContext } from '@/appContext/useAppContext'
import type { AppContextType } from '@/appContext/AppContext'
import styles from './FlowGraph.module.css'

const FlowGraph = () => {
  const { flowNodes, flowEdges, onNodesChange, onEdgesChange, onConnect, loading, error }: AppContextType =
    useAppContext()

  if (loading) {
    return (
      <div className={styles.flowWrapper}>
        <div className={styles.loading}>Loading graph data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.flowWrapper}>
        <div className={styles.error}>
          <h3>Error loading data:</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
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
  )
}

export default FlowGraph
