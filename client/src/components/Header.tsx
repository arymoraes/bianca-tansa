import { FiMenu } from 'react-icons/fi'
interface Props {}

export const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="header__logo-box">
        <img src="./logo_transparent.png" alt="Haby Logo" className="header__logo" />
      </div>
      <FiMenu className="header__menu-icon" />
    </div>
  )
}
