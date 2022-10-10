const Header = () => {
  const tg = window.Telegram.WebApp

  const onClose = () => {
    tg.close()
  }

  return (
    <header className='header'>
      <button onClick={onClose}>Закрыть</button>

      <span className='username'>
        {tg.initDataUnsafe?.user.username}
      </span>
    </header>
  )
}

export default Header