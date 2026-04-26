import styles from '../styles/components_CSS/Footer.module.css'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <h2 className={styles.logo}>Shop&Go</h2>
          <p className={styles.tagline}>Your favorite online store for the best products at the best prices.</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Navigate</h3>
          <ul className={styles.list}>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/products')}>Products</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Customer Service</h3>
          <ul className={styles.list}>
            <li>FAQ</li>
            <li>Returns & Exchanges</li>
            <li>Shipping Policy</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contact</h3>
          <ul className={styles.list}>
            <li>support@shopgo.com</li>
            <li>+1 (800) 123-4567</li>
            <li>Mon–Fri, 9am–6pm</li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Shop&Go. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer