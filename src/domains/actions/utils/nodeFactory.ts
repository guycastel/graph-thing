import type { Node } from 'reactflow'
import type { FlowNodeData } from '@/domains/workflow/types'
import type { ActionData } from '../types'

export interface NodeCreationOptions {
  basePosition?: { x: number; y: number }
  randomOffset?: { x: number; y: number }
}

export const createNodeFromAction = (
  action: ActionData,
  options: NodeCreationOptions = {}
): Node<FlowNodeData> => {
  const {
    basePosition = { x: 400, y: 300 },
    randomOffset = { x: 200, y: 200 }
  } = options

  return {
    id: `action-${action.id}-${Date.now()}`,
    type: 'default',
    position: {
      x: basePosition.x + Math.random() * randomOffset.x - randomOffset.x / 2,
      y: basePosition.y + Math.random() * randomOffset.y - randomOffset.y / 2,
    },
    data: {
      label:
        action.type === 'tool' && action.service
          ? `${action.name} (${action.service})`
          : action.name,
      action: action.name,
      templateId: action.id,
      actionType: action.type,
      service: action.service,
    },
  }
}
