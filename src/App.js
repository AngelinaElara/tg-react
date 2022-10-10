import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { useTelegram } from './hooks/useTelegram'
import {Routes, Route} from 'react-router-dom'
import Form from './components/Form/Form'
import ProductList from './components/ProductList/ProductList'

const App = () => {
  const {tg, onToggleButton} = useTelegram

  useEffect(() => {
    tg.ready()
  }, []) // приложение инициализировалось

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path='form' element={<Form />}/>
      </Routes>
    </div>
  )
}

export default App
