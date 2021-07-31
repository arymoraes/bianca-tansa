import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

interface Props {}

export const Landing = (props: Props) => {
  return (
    <div className="landing">
      <Header />
      THIS IS THE LANDING PAGE
      <Link to='/home'>Go to home</Link>
    </div>
  )
}
