import { useEffect } from 'react'
import './App.css'

const tg = window.Telegram.WebApp

const App = () => {

  useEffect(() => {
    tg.ready()
  }, []) // приложение инициализировалось


  const onClose = () => {
    tg.close()
  }

  return (
    <div className='App'>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}

export default App
