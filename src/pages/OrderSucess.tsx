
import { useNavigate } from 'react-router-dom'
import styles from '../styles/pages_css/OrderSucess.module.css'

const OrderSucess = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.container}>
        <h2>Payment Confirmed</h2>
        <p>Thank you for your purchase</p>
        <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default OrderSucess