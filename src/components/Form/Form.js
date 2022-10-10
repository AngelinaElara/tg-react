import {useCallback, useEffect, useState} from 'react'
import './Form.css'
import {useTelegram} from '../../hooks/useTelegram'

const Form = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [street, setStreet] = useState('')
  const [subject, setSubject] = useState('physical')
  const {tg} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject
    }
    tg.sendData(JSON.stringify(data))
  }, [country, street, subject])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    })
  }, [])

  useEffect(() => {
    if(!street || !country) {
      tg.MainButton.hide() // не даем отправить данные, если не заполнено
    } else {
      tg.MainButton.show()
    }
  }, [country, street])

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeCountry = (e) => {
    setCountry(e.target.value)
  }

  const onChangeStreet = (e) => {
    setStreet(e.target.value)
  }

  const onChangeSubject = (e) => {
    setSubject(e.target.value)
  }

  return (
    <form className='form'>
        <h3>Введите ваши данные</h3>
        <input
            className='input'
            type='text'
            placeholder='Имя'
            value={name}
            onChange={onChangeName}
        />
        <input
            className='input'
            type='text'
            placeholder='Страна'
            value={country}
            onChange={onChangeCountry}
        />
        <input
            className='input'
            type='text'
            placeholder='Улица'
            value={street}
            onChange={onChangeStreet}
        />
        <select value={subject} onChange={onChangeSubject} className={'select'}>
            <option value={'physical'}>Физ. лицо</option>
            <option value={'legal'}>Юр. лицо</option>
        </select>
    </form>
  )
}

export default Form