import { Outlet } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
    <ScrollToTop/>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
