import { FormLogo } from '../components/FormLogo'
import { SignInForm } from '../components/SignInForm'

interface Props {}

export const Login = (props: Props) => {
  return (
    <div className="login">
      <FormLogo />
      <SignInForm />
    </div>
  )
}
