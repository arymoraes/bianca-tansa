import { FiChevronRight, FiUser, FiLock, FiMail } from 'react-icons/fi'
import dotenv from 'dotenv'
import { createUser } from '../services/apiClient'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Authenticate } from '../context/AuthenticationContext'
dotenv.config()

interface Props {}
export const SignUpForm = (props: Props) => {
  const history = useHistory()
  // importing function from auth context to alter the context
  const { setAuth } = Authenticate()
  const defaultForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  }

  const [newUser, setNewUser] = useState(defaultForm)

  const handleChange = (event: any) => {
    setNewUser((current) => ({ ...current, [event.target.name]: event.target.value }))
  }
  const handleSubmit = async (event: any) => {
    // so the page doesn't refresh
    event.preventDefault()
    // checking if both passwords match
    if (newUser.password === newUser.passwordConfirm) {
      const { email, firstName, lastName, password } = newUser
      // sending user without second password to service
      const res = await createUser({ email, firstName, lastName, password })

      // if creating the user fails
      if (res.error) {
        alert(`${res.message}`)
        // reseting state
        setNewUser(defaultForm)
      } else {
        // if it succeds
        const { accessToken } = res
        // store token received in response on local storage
        localStorage.setItem('accessToken', accessToken)
        // set authenticated to user
        setAuth(res.user)
        // redirect to main page
        history.push('/home')
      }
      // if authentication
    } // if they don't send alert and don't submit form or reset state
    else alert(`Passwords do not match, try again.`)
  }

  return (
    <div className="sign-up">
      <form className="sign-up__form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="sign-up__title">Sign Up</h1>

        <div className="sign-up__input-box">
          <label htmlFor="sign-up__input--email">E-mail</label>
          <div className="sign-up__icon-input-box">
            <FiMail className="sign-up__input-icon" />
            <input
              type="email"
              name="email"
              value={newUser.email}
              id="sign-up__input--email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="sign-up__input-box">
          <label htmlFor="sign-up__input--firstName">First Name</label>
          <div className="sign-up__icon-input-box">
            <FiUser className="sign-up__input-icon" />
            <input
              type="text"
              id="sign-up__input--firstName"
              name="firstName"
              value={newUser.firstName}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="sign-up__input-box">
          <label htmlFor="sign-up__input--lastName">Last Name</label>
          <div className="sign-up__icon-input-box">
            <FiUser className="sign-up__input-icon" />
            <input
              type="text"
              id="sign-up__input--lastName"
              name="lastName"
              value={newUser.lastName}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="sign-up__input-box">
          <label htmlFor="sign-up__input--password">Password</label>
          <div className="sign-up__icon-input-box">
            <FiLock className="sign-up__input-icon" />
            <input
              type="password"
              id="sign-up__input--password"
              name="password"
              value={newUser.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <div className="sign-up__input-box">
          <label htmlFor="sign-up__input--password-confirm">Confirm Password</label>
          <div className="sign-up__icon-input-box">
            <FiLock className="sign-up__input-icon" />
            <input
              type="password"
              id="sign-up__input--password-confirm"
              name="passwordConfirm"
              value={newUser.passwordConfirm}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>

        <button className="sign-up__btn btn btn--submit">
          <FiChevronRight className="submit-icon" />
        </button>
      </form>

      <div>Sign up using</div>
      <a href={`${process.env.REACT_APP_FRONT_END_URL}/sign-up`} className="sign-in-link">
        Or Sign In Here
      </a>
    </div>
  )
}
