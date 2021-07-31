import { Redirect, Route } from 'react-router-dom'
import { Authenticate } from '../context/AuthenticationContext'

export const Public = ({ component: Component, restricted, ...rest }: any) => {
  const { user } = Authenticate()
  console.log('public routes')
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route

    <Route
      {...rest}
      render={(props) => (user && restricted ? <Redirect to="/home" /> : <Component {...props} />)}
    />
  )
}
