import { Header } from '../components/Header'
import { UserHistory } from '../components/UserHistory'

interface Props {}

export const History = (props: Props) => {
  return (
    <div className="history">
      <Header />
      <UserHistory />
    </div>
  )
}
