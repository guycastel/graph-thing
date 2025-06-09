import { useAppContext } from '@/context/useAppContext'
import type { AppContextType } from '@/context/AppContext'
import FlowGraph from '@/domains/workflow/components/FlowGraph'
import ActionPanel from '@/domains/actions/components/ActionPanel'
import styles from './WorkflowPage.module.css'

const WorkflowPage = () => {
  const { actions, handleActionClick, loading, error, stats }: AppContextType = useAppContext()

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading workflow data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error loading data:</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Workflow Graph Visualization</h1>
        <p>
          Interactive workflow graph with {stats.nodesCount} nodes and {stats.edgesCount}{' '}
          connections
        </p>
      </div>
      <div className={styles.mainContent}>
        <ActionPanel actions={actions} onActionClick={handleActionClick} isLoading={loading} />
        <FlowGraph />
      </div>
    </div>
  )
}

export default WorkflowPage
