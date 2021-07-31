import './sass/main.scss'
import { Routes } from './Routes'
import { AuthenticationProvider } from './context/AuthenticationContext'
import { DailyDataProvider } from './context/DailyDataContext'

function App() {
  return (
    <div className="App">
      <AuthenticationProvider>
        <DailyDataProvider>
          <Routes />
        </DailyDataProvider>
      </AuthenticationProvider>
    </div>
  )
}

export default App
