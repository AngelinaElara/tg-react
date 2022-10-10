import './Header.css'
import { useTelegram } from '../../hooks/useTelegram'

const Header = () => {
  const {user, onClose } = useTelegram

  return (
    <header className='header'>
      <button onClick={onClose}>Закрыть</button>

      <span className='username'>
        {user.username}
      </span>
    </header>
  )
}

export default Header