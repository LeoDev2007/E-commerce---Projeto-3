import { useNavigate, useParams } from "react-router-dom";

import { useProduct, useProducts } from "../hooks/useProducts";
import styles from "../styles/pages_css/ProductDetail.module.css";
import CarouselImageProduct from "../components/ui_elements/CarouselImageProduct";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import PurpleButton from "../components/ui_elements/PurpleButton";
import CardProduct from "../components/CardProduct";
import BuyNowButton from "../components/ui_elements/BuyNowButton";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../routes/routes";
import toast from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";
import Review from "../components/Review";

const ProductDetail = () => {
  const { id } = useParams();

  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProduct(Number(id));
  const { data: getProducts } = useProducts();

  const randomProducts = getProducts
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 5);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <Spinner size="xl" color="#4813AA" />
      </div>
    );
  if (isError) return <p>Erro ao carregar produto</p>;
  if (!data) return null;

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const alreadyFavorite = isFavorite(Number(id));
    await toggleFavorite(Number(id));

    alreadyFavorite
      ? toast.error("Removed from favorites", {
          style: {
            background: "#fff",
            color: "#4813AA",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        })
      : toast.success("Added to favorites", {
          style: {
            background: "#fff",
            color: "#4813AA",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        });
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (isInCart(data.id)) {
      toast.error("Product already in cart", {
        style: {
          background: "#fff",
          color: "#e53935",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
      return;
    }

    addToCart({
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      unitPrice: data.price,
      price: data.price,
      quantity: 1,
    });

    toast.success("Added to cart", {
      style: {
        background: "#fff",
        color: "#4813AA",
        borderRadius: "8px",
        padding: "12px 16px",
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <CarouselImageProduct />
      </div>
      <div className={styles.informations}>
        <div className={styles.titleAndHeartBtn}>
          <h2>{data.title}</h2>
          <button className={styles.heartBtn} onClick={handleFavorite}>
            {isFavorite(Number(id)) ? (
              <FaHeart size={36} className={styles.icon} />
            ) : (
              <CiHeart size={36} className={styles.icon} />
            )}
          </button>
        </div>

        <div className={styles.priceAndRating}>
          <span>${data.price}</span>
          <div className={styles.rating}>
            <FaStar color="#f5c518" size={20} />
            <span>{data.rating}</span>
          </div>
        </div>
        <div className={styles.categoryInfo}>
          <span>Category: {data.category}</span>
          <p>Tags: {data.tags.join(", ")}</p>
          <p>Brand: {data.brand}</p>
        </div>
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>{data.description}</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <PurpleButton
          title={isInCart(data.id) ? "Already in Cart" : "Add to Cart"}
          onClick={handleAddToCart}
          disabled={isInCart(data.id)}
        />
        <BuyNowButton product={data} />
      </div>

      <div className={styles.moreInfo}>
        <h2>More Informations</h2>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.odd}>
              <td className={styles.label}>SKU</td>
              <td>{data.sku}</td>
            </tr>
            <tr className={styles.even}>
              <td className={styles.label}>Stock</td>
              <td>{data.stock}</td>
            </tr>
            <tr className={styles.odd}>
              <td className={styles.label}>Weight</td>
              <td>{data.weight} kg</td>
            </tr>
            <tr className={styles.even}>
              <td className={styles.label}>Dimensions</td>
              <td>
                {data.dimensions?.width} x {data.dimensions?.height} x{" "}
                {data.dimensions?.depth} cm
              </td>
            </tr>
            <tr className={styles.odd}>
              <td className={styles.label}>Warranty</td>
              <td>{data.warrantyInformation}</td>
            </tr>
            <tr className={styles.even}>
              <td className={styles.label}>Shipping</td>
              <td>{data.shippingInformation}</td>
            </tr>
            <tr className={styles.odd}>
              <td className={styles.label}>Availability</td>
              <td>{data.availabilityStatus}</td>
            </tr>
            <tr className={styles.even}>
              <td className={styles.label}>Return Policy</td>
              <td>{data.returnPolicy}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Reviews */}

      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {data.reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>

      <div className={styles.recommendedProducts}>
        <h2>Recommended Products</h2>
        <div className={styles.recommendedProductsList}>
          {randomProducts?.map((product) => (
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
    </div>
  );
};

export default ProductDetail;
