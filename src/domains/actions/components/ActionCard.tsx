import type { ActionData } from '../types'
import styles from './ActionCard.module.css'

interface ActionCardProps {
  action: ActionData
  onActionClick: (action: ActionData) => void
}

const ActionCard = ({ action, onActionClick }: ActionCardProps) => {
  const handleClick = () => onActionClick(action)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onActionClick(action)
    }
  }

  return (
    <button
      className={styles.actionItem}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.actionName}>{action.name}</div>
      <div className={styles.actionMeta}>
        <span className={styles.actionType} data-type={action.type}>
          {action.type}
        </span>
        {action.service && (
          <span className={styles.actionService}>({action.service})</span>
        )}
      </div>
    </button>
  )
}

export default ActionCard
