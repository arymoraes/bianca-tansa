import { FormLogo } from '../components/FormLogo'
import { SignUpForm } from '../components/SignUpForm'

interface Props {}

export const Register = (props: Props) => {
  return (
    <div className="register">
      <FormLogo />
      <SignUpForm />
    </div>
  )
}
