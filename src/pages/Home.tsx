import styles from "../styles/pages_css/Home.module.css";
import { useMemo } from "react";
import CarouselProduct from "../components/ui_elements/CarouselBannerProduct";
import CardBenefit from "../components/CardBenefit";
import { FiTruck } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { MdRepeat } from "react-icons/md";
import {
  MdLaptop,
  MdSmartphone,
  MdChair,
  MdHouse,
  MdOutlineSports,
} from "react-icons/md";
import type { IconType } from "react-icons";
import CardProduct from "../components/CardProduct";
import PurpleButton from "../components/ui_elements/PurpleButton";
import { useProducts } from "../hooks/useProducts";
import CategoryBtn from "../components/CategoryBtn";
import { useCategories } from "../hooks/useProducts";
import Banner from "../components/ui_elements/Banner";
import dress from '../assets/Vestido elegante para eventos formais.png'


const icons: IconType[] = [MdChair,MdHouse, MdLaptop, MdSmartphone, MdOutlineSports];

const SELECTED_CATEGORIES = [
  'smartphones',
  'laptops',
  'home-decoration',
  'furniture',
  'sports-accessories',
]

const Home = () => {
  const { data } = useProducts();
  const { data: categories } = useCategories();

  const topRated = data?.sort((a, b) => b.rating - a.rating).slice(0, 5);

  const randomCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].filter(c => SELECTED_CATEGORIES.includes(c))
  }, [categories]);

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.carouselContainer}>
          <CarouselProduct />
        </div>
        <div className={styles.cardBenefitContainer}>
          <CardBenefit icon={FiTruck} title="Fast Shipping" />
          <CardBenefit icon={IoLockClosedOutline} title="Secure Purchase" />
          <CardBenefit icon={CiCreditCard1} title="Installment" />
          <CardBenefit icon={MdRepeat} title="Easy Returns" />
        </div>

        <div className={styles.productList}>
          <div className={styles.productListTitleAndBtn}>
            <h2>Best Products</h2>
            <span>-</span>
            <PurpleButton title="See More" to="/products" />
          </div>

          <div className={styles.list}>
            {topRated?.map((product) => (
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

        <div className={styles.categories}>
          <div className={styles.categoryTitle}>
            <h2>Best Categories</h2>
          </div>
          <div className={styles.categoryList}>
            {randomCategories.map((category, index) => (
              <CategoryBtn
                key={category}
                categoryName={category}
                icon={icons[index]}
              />
            ))}
          </div>
        </div>

        <div className={styles.bannerContainer}>
          <Banner image={dress} />
        </div>
      </div>
    </>
  );
};

export default Home;
