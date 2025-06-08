import ReactFlow, { Controls, MiniMap, Background, BackgroundVariant, ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'

const testNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Test Node 1' },
    type: 'default'
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Test Node 2' },
    type: 'default'
  }
]

const testEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    type: 'default'
  }
]

const TestFlow = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={testNodes}
          edges={testEdges}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  )
}

export default TestFlow
