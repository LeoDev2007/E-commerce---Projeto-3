import { Slider } from "@chakra-ui/react"
import styles from '../styles/components_CSS/FilterMenu.module.css'

type Props = {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  minPrice: number
  maxPrice: number
  onPriceChange: (min: number, max: number) => void
  minRating: number
  onRatingChange: (rating: number) => void
}

const FilterMenu = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
}: Props) => {
  return (
    <div className={styles.container}>

      <div className={styles.section}>
        <h3 className={styles.title}>Category</h3>
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Price</h3>
        <div className={styles.sliderValues}>
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
        <Slider.Root
          min={0}
          max={10000}
          value={[minPrice, maxPrice]}
          onValueChange={(e) => onPriceChange(e.value[0], e.value[1])}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
            <Slider.Thumb index={1} />
          </Slider.Control>
        </Slider.Root>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Rating</h3>
        <div className={styles.sliderValues}>
          <span>{minRating} ★</span>
        </div>
        <Slider.Root
          min={0}
          max={5}
          step={0.5}
          value={[minRating]}
          onValueChange={(e) => onRatingChange(e.value[0])}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
          </Slider.Control>
        </Slider.Root>
      </div>

    </div>
  )
}

export default FilterMenu