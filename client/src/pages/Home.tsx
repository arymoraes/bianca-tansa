import { Objectives } from '../components/Objectives'
import { Header } from '../components/Header'
import { GetDailyData } from '../context/DailyDataContext';

interface Props {}

export const Home = (props: Props) => {

  const { tasks } = GetDailyData();

  console.log(tasks);
  return (
    <div className="home">
      <Header />
      {tasks && tasks.length ? 
      <Objectives />
      :
      <div>Loading</div>
      }
    </div>
  )
}
