import type { ActionData } from '@/interfaces/interfaces'
import ActionCard from '@/components/SidePanel/ActionCard'
import styles from './SidePanel.module.css'

interface SidePanelProps {
  actions: ActionData[]
  onActionClick: (action: ActionData) => void
  isLoading?: boolean
}

const SidePanel = ({ actions, onActionClick, isLoading }: SidePanelProps) => {
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

export default SidePanel
