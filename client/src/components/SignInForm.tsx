import { FiChevronRight, FiUser, FiLock } from 'react-icons/fi'
import dotenv from 'dotenv'
import { useState } from 'react'
import { loginUser } from '../services/apiClient'
import { useHistory } from 'react-router-dom'
import { Authenticate } from '../context/AuthenticationContext'
dotenv.config()
interface Props {}

export const SignInForm = (props: Props) => {
  const history = useHistory()
  // importing function from auth context to alter the context
  const { setAuth } = Authenticate()
  const defaultForm = {
    email: '',
    password: '',
  }

  const [credentials, setCredentials] = useState(defaultForm)

  const handleChange = (event: any) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: any) => {
    // so the page doesn't refresh
    event.preventDefault()
    // sending credentials to service
    const res = await loginUser(credentials)
    console.log(res)
    // if credentials are wrong
    if (res.error) {
      alert(`Incorret credentials`)
      // reseting state
      setCredentials(defaultForm)
    } else {
      // if credentials are correct
      const { accessToken } = res
      // store token received in response on local storage
      localStorage.setItem('accessToken', accessToken)
      // set authenticated to user
      setAuth(res.user)
      // redirect to main page
      history.push('/home')
    }
  }

  return (
    <div className="sign-in">
      <form className="sign-in__form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="sign-in__title">Sign In</h1>
        <div className="sign-in__input-box">
          <label htmlFor="sign-in__input--email">E-mail</label>
          <div className="sign-in__icon-input-box">
            <FiUser className="sign-in__input-icon" />
            <input
              type="email"
              name="email"
              id="sign-in__input--email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="sign-in__input-box">
          <label htmlFor="sign-in__input--password">Password</label>
          <div className="sign-in__icon-input-box">
            <FiLock className="sign-in__input-icon" />
            <input
              type="password"
              name="password"
              id="sign-in__input--password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <a
          href={`${process.env.REACT_APP_FRONT_END_URL}/reset-password`}
          className="reset-password-link"
        >
          Forgot your password?
        </a>
        <button className="sign-in__btn btn btn--submit" type="submit">
          <FiChevronRight className="submit-icon" />
        </button>
      </form>

      <div>Sign up using</div>
      <a href={`${process.env.REACT_APP_FRONT_END_URL}/sign-up`} className="sign-up-link">
        Or Sign Up Here
      </a>
    </div>
  )
}
