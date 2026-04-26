import { Outlet } from "react-router-dom";
import styles from "../src/styles/components_CSS/Header.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const AuthLayout = () => {
  const navigate = useNavigate();
  function homeClick() {
    navigate("/");
  }
  return (
    <>
    <ScrollToTop/>
      <header className={styles.container}>
        <div className={styles.title} onClick={homeClick}>
          <h1>SHOP&GO</h1>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
