import { NavLink } from "react-router-dom";
import styles from "../../styles/components_CSS/Header.module.css";
import SearchBar from "../ui_elements/SearchBar";
import { ROUTES } from "../../routes/routes";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DialogWarning from "../ui_elements/DialogWarning";

const DesktopHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function homeClick() {
    navigate("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={homeClick}>
        <h1>SHOP&GO</h1>
      </div>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <nav className={styles.links}>
        <NavLink to={ROUTES.HOME}>HOME</NavLink>
        <NavLink to={ROUTES.PRODUCTS}>ALL PRODUCTS</NavLink>
        <NavLink to={ROUTES.FAVORITES}>
          <CiHeart size={35} />
        </NavLink>
        <NavLink to={ROUTES.CART}>
          <MdOutlineShoppingCart size={30} />
        </NavLink>
        {!user ? (
          <>
            <button onClick={() => navigate(ROUTES.LOGIN)} className={styles.btn}>LOGIN</button>
            <button onClick={() => navigate(ROUTES.REGISTER)} className={styles.btn}>SIGN UP</button>
          </>
        ) : (
          <>
            <button className={styles.btn} onClick={() => navigate(ROUTES.MY_ACCOUNT)}>MY ACCOUNT</button>
            <DialogWarning actionBtnTitle="Logout" callBtnTitle="LOGOUT" onClick={logout} classname={styles.btn} />
          </>
        )}
      </nav>
    </div>
  );
};

export default DesktopHeader;
