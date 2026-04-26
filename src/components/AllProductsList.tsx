import { useState } from "react";
import CardProduct from "./CardProduct";
import PaginationBar from "./ui_elements/PaginationBar";
import FilterMenu from "./FilterMenu"
import { useProducts, useCategories } from "../hooks/useProducts";
import styles from "../styles/components_CSS/AllProductsList.module.css";

const ITEMS_PER_PAGE = 12;

const AllProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [minRating, setMinRating] = useState(0)

  const { data, isLoading } = useProducts();
  const { data: categories } = useCategories()

  const filtered = data?.filter(product => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true
    const matchPrice = product.price >= minPrice && product.price <= maxPrice
    const matchRating = product.rating >= minRating
    return matchCategory && matchPrice && matchRating
  }) ?? []

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.container_titlePag}>
        <h1 className={styles.title}>All Products</h1>
        <div className={styles.paginationContainer}>
          {filtered.length > ITEMS_PER_PAGE && (
            <div className={styles.pagination}>
              <PaginationBar
                count={filtered.length}
                pageSize={ITEMS_PER_PAGE}
                page={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <FilterMenu
          categories={categories ?? []}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat: string) => { setSelectedCategory(cat); setCurrentPage(1) }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min: number, max: number) => { setMinPrice(min); setMaxPrice(max); setCurrentPage(1) }}
          minRating={minRating}
          onRatingChange={(rating: number) => { setMinRating(rating); setCurrentPage(1) }}
        />

        <div className={styles.list}>
          {paginated.map((product) => (
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

export default AllProductsList;