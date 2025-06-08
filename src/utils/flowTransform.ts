import type { Node, Edge } from 'reactflow'
import type { NodeData, FlowNodeData } from '../types/api'

export const transformApiDataToFlow = (apiData: NodeData[]): { nodes: Node<FlowNodeData>[], edges: Edge[] } => {
  const nodes: Node<FlowNodeData>[] = apiData.map((item) => ({
    id: item.id,
    position: item.position,
    data: {
      label: item.action,
      action: item.action,
      templateId: item.templateId
    },
    type: 'default',
    draggable: true,
    selectable: true
  }))

  const edges: Edge[] = []
  
  apiData.forEach((item) => {
    item.children.forEach((childId) => {
      edges.push({
        id: `${item.id}-${childId}`,
        source: item.id,
        target: childId,
        type: 'default'
      })
    })
  })

  return { nodes, edges }
}
