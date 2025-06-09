import { AppProvider } from '@/context/AppProvider'
import WorkflowPage from '@/pages/WorkflowPage'

function App() {
  return (
    <AppProvider>
      <WorkflowPage />
    </AppProvider>
  )
}

export default App
