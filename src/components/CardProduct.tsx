import styles from '../styles/components_CSS/CardProduct.module.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { ROUTES } from '../routes/routes'

interface ProductCardProps {
  id: number
  title: string
  price: number
  rating: number
  thumbnail: string
  discountPercentage?: number
}

const CardProduct = ({ id, title, price, rating, thumbnail, discountPercentage }: ProductCardProps) => {

  const navigate = useNavigate()
  const { addToCart, isInCart } = useCart()
  const { user } = useAuth()

  function goToProductDetail() {
    navigate(`/products/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()  // ← evita navegar para o produto ao clicar

    if (!user) {
      navigate(ROUTES.LOGIN)
      return
    }

    if (isInCart(id)) {
      toast.error('Product already in cart')
      return
    }

    addToCart({
      id,
      title,
      thumbnail,
      unitPrice: price,
      price,
      quantity: 1,
    })

    toast.success('Added to cart', {
      style: {
        background: '#fff',
        color: '#4813AA',
        borderRadius: '8px',
        padding: '12px 16px',
      },
    })
  }

  return (
    <div className={styles.card} onClick={goToProductDetail}>
      <img src={thumbnail} alt={title} className={styles.image} />

      <div className={styles.body}>
        <div className={styles.row}>
          {discountPercentage && <span className={styles.discount}>Discount: {discountPercentage}%</span>}
        </div>

        <p className={styles.title}>{title}</p>

        <div className={styles.ratingRow}>
          <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={14}
              className={i < Math.round(rating) ? styles.starFilled : styles.starEmpty}
            />
          ))}
        </div>

        <p className={styles.price}>${price}</p>

        <button
          className={styles.addToCart}
          onClick={handleAddToCart}
          disabled={isInCart(id)}
        >
          {isInCart(id) ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default CardProduct