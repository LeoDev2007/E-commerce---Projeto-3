
import { useAuth } from '../hooks/useAuth'
import PurpleButton from '../components/ui_elements/PurpleButton'
import styles from '../styles/pages_css/MyAccount.module.css'
import EditNameForm from '../components/ui_elements/EditNameForm'
import { useNavigate } from 'react-router-dom'
import DialogWarning from '../components/ui_elements/DialogWarning'
import {ROUTES} from '../routes/routes'


const MyAccount = () => {
    const {user, handleDeleteAccount} = useAuth()
    const navigate = useNavigate()

    const handleDelete = async () => {
        await handleDeleteAccount()
        navigate(ROUTES.HOME)
    }
  return (
    <div className={styles.container}>
        <h1>Your Account</h1>
        <div className={styles.container_info}>
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>{user?.metadata.creationTime}</p>
        </div>
        <div className={styles.container_buttons}>
            <EditNameForm />
            <PurpleButton title='Change Password' onClick={() => navigate('/forgot-password')}/>
            <DialogWarning actionBtnTitle='Delete' callBtnTitle='Delete User' classname={styles.deleteBtn} onClick={handleDelete} />
        </div>
    </div>
  )
}

export default MyAccount