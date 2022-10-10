import './ProductList.css'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
  {id: '1', title: 'Ветчина и грибы', price: 32, url: 'https://cdn.dodostatic.net/static/Img/Products/aadc8d5d9dd24e77935f554689ab44e6_584x584.png', description: 'Томатный соус, моцарелла, ветчина, шампиньоны'},
  {id: '2', title: 'Пеперони', price: 27, url: 'https://cdn.dodostatic.net/static/Img/Products/52ea2e8b21d24a0fb1a216bc1182c9dd_584x584.png', description: 'Томатный соус, пикантная пепперони, моцарелла'},
  {id: '3', title: 'Четыре сезона', price: 30, url: 'https://cdn.dodostatic.net/static/Img/Products/983a74d4893846a88a16b22e8f19e7c7_584x584.png', description: 'Итальянские травы, томатный соус, томаты, пикантная пепперони, брынза, моцарелла, ветчина, шампиньоны'},
  {id: '4', title: 'Домашняя', price: 32, url: 'https://cdn.dodostatic.net/static/Img/Products/fc9a3f22855e49a9ba7cb290967fae0b_584x584.png', description: 'Пикантная пепперони, ветчина, маринованные огурчики, томаты, моцарелла, томатный соус'},
  {id: '5', title: 'Мясная', price: 32, url: 'https://cdn.dodostatic.net/static/Img/Products/b68c363a26644118806d07435d9b2806_584x584.png', description: 'Острая чоризо, томатный соус, цыпленок, пикантная пепперони, моцарелла, ветчин'},
  {id: '6', title: 'Цыпленок Ранч', price: 32, url: 'https://cdn.dodostatic.net/static/Img/Products/5fa746b823ac46409694181f9d515aca_584x584.png', description: 'Цыпленок, томаты, чеснок сухой, моцарелла, соус ранч, ветчина'}
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([])

  const {tg, queryId} = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    }
    fetch('http://85.119.146.179:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [addedItems])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  )
}

export default ProductList