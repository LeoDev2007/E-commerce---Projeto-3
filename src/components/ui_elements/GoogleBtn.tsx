import { FaGoogle } from "react-icons/fa";
import styles from '../../styles/ui_css/Buttons.module.css'

type Props = {
  onClick?: () => void
}

const GoogleBtn = ({onClick}: Props) => {
  return (
    <button onClick={onClick} className={styles.googleBtn}><FaGoogle size={24} /> Log in with Google</button>
  )
}

export default GoogleBtn