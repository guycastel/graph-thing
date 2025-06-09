import { AppContextProvider } from '@/appContext'
import MainPage from '@/pages/MainPage'

function App() {
  return (
    <AppContextProvider>
      <MainPage />
    </AppContextProvider>
  )
}

export default App
