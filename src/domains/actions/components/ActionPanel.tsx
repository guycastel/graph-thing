import type { ActionData } from '../types'
import ActionCard from './ActionCard'
import styles from './ActionPanel.module.css'

interface ActionPanelProps {
  actions: ActionData[]
  onActionClick: (action: ActionData) => void
  isLoading?: boolean
}

const ActionPanel = ({ actions, onActionClick, isLoading }: ActionPanelProps) => {
  if (isLoading) {
    return (
      <div className={styles.sidebar}>
        <h3>Available Actions</h3>
        <div className={styles.loading}>Loading actions...</div>
      </div>
    )
  }

  return (
    <div className={styles.sidebar}>
      <h3>Available Actions ({actions.length})</h3>
      <p className={styles.sidebarDescription}>
        Click on any action below to add it to the graph
      </p>
      <div className={styles.actionsList}>
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            onActionClick={onActionClick}
          />
        ))}
      </div>
    </div>
  )
}

export default ActionPanel
