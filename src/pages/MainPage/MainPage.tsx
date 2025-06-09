import { useAppContext } from '@/appContext/useAppContext'
import type { AppContextType } from '@/appContext'
import FlowGraph from '@/components/FlowGraph'
import SidePanel from '@/components/SidePanel'
import styles from './MainPage.module.css'

const MainPage = () => {
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
        <SidePanel actions={actions} onActionClick={handleActionClick} isLoading={loading} />
        <FlowGraph />
      </div>
    </div>
  )
}

export default MainPage
