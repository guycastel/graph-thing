export interface NodeData {
  id: string
  children: string[]
  position: {
    x: number
    y: number
  }
  templateId: string
  action: string
}

export interface FlowNodeData {
  label: string
  action: string
  templateId: string
}
