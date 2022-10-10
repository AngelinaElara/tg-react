import { useEffect } from 'react'
import './App.css'

const App = () => {
  const tg = window.Telegram.WebApp

  useEffect(() => {
    tg.ready()
  }, []) // приложение инициализировалось

  return (
    <div className='App'>
      
    </div>
  )
}

export default App
