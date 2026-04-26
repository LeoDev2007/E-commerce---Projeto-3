import styles from '../styles/components_CSS/CardBenefit.module.css'
import type { IconType } from "react-icons"

type Props = {
  icon: IconType
  title: string
}

const CardBenefit = ({ icon: Icon, title }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <Icon size={28} color='#4813AA' />
        </div>
        <div className={styles.title}>
          {title}
        </div>
      </div>
    </div>
  )
}

export default CardBenefit