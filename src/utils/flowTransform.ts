import type { Node, Edge } from 'reactflow'
import type { NodeData, FlowNodeData, ActionData } from '../types/api'

export const transformApiDataToFlow = (
  apiData: NodeData[], 
  actions: ActionData[] = []
): { nodes: Node<FlowNodeData>[], edges: Edge[] } => {
  // Create a map of templateId to action data for quick lookup
  const actionMap = new Map<string, ActionData>()
  actions.forEach(action => {
    actionMap.set(action.id, action)
  })

  const nodes: Node<FlowNodeData>[] = apiData.map((item) => {
    // Get the action data from the mapping
    const actionData = actionMap.get(item.templateId)
    
    let actionName = item.action // fallback to original action field
    
    if (actionData) {
      if (actionData.type === 'tool' && actionData.service) {
        // For tools, include the service name: "Action Name (Service)"
        actionName = `${actionData.name} (${actionData.service})`
      } else {
        // For regular actions, just use the name
        actionName = actionData.name
      }
    }
    
    return {
      id: item.id,
      position: item.position,
      data: {
        label: actionName,
        action: item.action,
        templateId: item.templateId,
        actionType: actionData?.type,
        service: actionData?.service
      },
      type: 'default',
      draggable: true,
      selectable: true
    }
  })

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
