import { useState } from "react";
import { useLocation } from "react-router-dom";
import PaginationBar from "../components/ui_elements/PaginationBar";
import { useProducts } from "../hooks/useProducts";
import CardProduct from "../components/CardProduct";
import styles from "../styles/pages_css/ProductSearchResult.module.css";

const ITEMS_PER_PAGE = 12;

const ProductSearchResult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const query = new URLSearchParams(useLocation().search);
  const search = query.get("search") ?? "";
  const { data, isLoading } = useProducts();

  const results =
    data?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const paginated = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Results for: <span>{search}</span>
      </h1>
      {results.length === 0 && (
        <p className={styles.notFound}>No products found</p>
      )}

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

      {results.length > ITEMS_PER_PAGE && (
        <div className={styles.pagination}>
          <PaginationBar
            count={results.length}
            pageSize={ITEMS_PER_PAGE}
            page={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductSearchResult;
