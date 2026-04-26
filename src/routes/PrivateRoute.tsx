
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import {ROUTES} from '../routes/routes'

const PrivateRoute = ({ children }: any) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return children
}

export default PrivateRoute