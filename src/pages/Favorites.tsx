import { useFavorites } from "../hooks/useFavorites";
import { useProducts } from "../hooks/useProducts";
import CardProduct from "../components/CardProduct";
import styles from '../styles/pages_css/Favorites.module.css'

const Favorites = () => {
  const { favorites } = useFavorites();
  const { data } = useProducts();

  const favoriteProducts = data?.filter((p) => favorites.includes(p.id));

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Favorites</h1>
        {favoriteProducts?.length === 0 && <p>No favorites yet</p>}
      </div>
      <div className={styles.list}>
        {favoriteProducts?.map((product) => (
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
  );
};

export default Favorites;
