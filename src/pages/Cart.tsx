import { useCart } from "../hooks/useCart";
import styles from "../styles/pages_css/Cart.module.css";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate()

  if (cart.length === 0)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>The cart is empty</p>
      </div>
    );
  return (
    <div className={styles.container}>
      <h1>My Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className={styles.item}>
          <img src={item.thumbnail} alt={item.title} className={styles.image} />
          <div className={styles.info}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.price}>${item.price.toFixed(2)}</p>
          </div>
          <div className={styles.actions}>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => removeFromCart(item.id)}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      ))}

      <div className={styles.footer}>
        <p>${total.toFixed(2)}</p>
        <button className={styles.checkoutBtn} onClick={() => navigate('/checkout')}>Checkout</button>
      </div>
      <button className={styles.clearBtn} onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default Cart;
