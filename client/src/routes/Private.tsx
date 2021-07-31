import { Redirect, Route } from 'react-router-dom'
import { Authenticate } from '../context/AuthenticationContext'

export const Private = ({ component: Component, ...rest }: any) => {
  const { user } = Authenticate()
  console.log('private routes')
  console.log(user)
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/sign-in" />)}
    />
  )
}
