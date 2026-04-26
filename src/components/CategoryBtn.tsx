import type { IconType } from 'react-icons'
import styles from '../styles/components_CSS/CategoryBtn.module.css'
import { useNavigate } from "react-router-dom";
import {ROUTES} from '../routes/routes'

type Props = {
    categoryName: string,
    icon: IconType,
}

const CategoryBtn = ({icon: Icon, categoryName}: Props) => {

    const navigate = useNavigate();

    function goToProductsCategory() {
        navigate(ROUTES.PRODUCT_BY_CATEGORY.replace(':category', categoryName))
    }
  return (
    <div className={styles.container}>
        <div className={styles.iconContainer} onClick={goToProductsCategory}>
            <Icon size={40} className={styles.icon} />
        </div>
        <h2>{categoryName}</h2>
    </div>
  )
}

export default CategoryBtn