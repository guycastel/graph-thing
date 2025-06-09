export interface GraphNodeData {
  id: string
  children: string[]
  position: {
    x: number
    y: number
  }
  templateId: string
  action: string
}

export interface ActionData {
  id: string
  name: string
  type: string
  service?: string
}

export interface FlowNodeData {
  label: string
  action: string
  templateId: string
  actionType?: string
  service?: string
}
