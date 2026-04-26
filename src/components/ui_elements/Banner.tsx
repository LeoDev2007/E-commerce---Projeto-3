import styles from '../../styles/components_CSS/Banner.module.css'

type Props = {
    image: string,
    alt?: string
}

const Banner = ({image, alt = 'banner'}: Props) => {
  return (
    <div className={styles.banner}>
        <img src={image} alt={alt} className={styles.image} />
    </div>
  )
}

export default Banner