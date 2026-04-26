import styles from "../../styles/ui_css/Buttons.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";
import { useCart } from "../../hooks/useCart";

type Props = {
  onClick?: () => void;
  product: {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
  };
};

const BuyNowButton = ({ product }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();

  const handleBuyNow = () => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (!isInCart(product.id)) {
      addToCart({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        unitPrice: product.price,
        price: product.price,
        quantity: 1,
      });
    }

    navigate(ROUTES.CHECKOUT)
  };
  return (
    <button className={styles.BuyBtn} onClick={handleBuyNow}>
      Buy Now
    </button>
  );
};

export default BuyNowButton;
