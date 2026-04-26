import { useProductsByCategory } from '../hooks/useProducts'
import { useParams } from 'react-router-dom'
import CardProduct from '../components/CardProduct'
import styles from '../styles/pages_css/Categories.module.css'

const Categories = () => {
  const { category = '' } = useParams()
  const { data, isLoading } = useProductsByCategory(category)

  if (isLoading) return <p>Carregando...</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Category: <span>{category}</span>
      </h1>
      {data?.length === 0 && <p>No products found</p>}
      <div className={styles.list}>
        {data?.map(product => (
          <CardProduct
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            thumbnail={product.thumbnail}
            discountPercentage={product.discountPercentage}
          />
        ))}
      </div>
    </div>
  )
}

export default Categories