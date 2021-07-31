import { Header } from '../components/Header'
import { UserInfo } from '../components/UserInfo'

interface Props {}

export const Profile = (props: Props) => {
  return (
    <div className="profile">
      <Header />
      <UserInfo />
    </div>
  )
}
