import { useNavigate } from 'react-router-dom'
import styles from '../../styles/ui_css/Buttons.module.css'

type Props = {
  title: string
  to?: string
  onClick?: () => void
  type?: "button" | "submit",
  disabled?:boolean
}

const PurpleButton = ({ title, to, onClick, type = "button", disabled }: Props) => {
  const navigate = useNavigate()

  function handleClick() {
    if (onClick) onClick()

    if (to) {
      navigate(to)
    }
  }

  return (
    <button
      type={type}
      className={styles.purpleButton}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default PurpleButton