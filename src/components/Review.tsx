import styles from "../styles/components_CSS/Review.module.css";
import { FaStar } from "react-icons/fa";
import type { Review as ReviewType } from "../types";

type Props = {
  review: ReviewType;
};

const Review = ({ review }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_name_rating}>
        <h2>{review.reviewerName}</h2>
        <span>{review.rating} - <FaStar size={24} color="#f5c518"/></span>
      </div>
      <div className={styles.description}>
        <p>{review.comment}</p>
      </div>
      <div className={styles.container_date_email}>
        <p>{new Date(review.date).toLocaleDateString()}</p>
        <p>{review.reviewerEmail}</p>
      </div>
    </div>
  );
};

export default Review;
