import { useState } from 'react'
import { GetDailyData } from '../context/DailyDataContext'
import { ObjInfo } from './ObjInfo'
import { PageTitle } from './PageTitle'

interface Props {}

export const Objectives = (props: Props) => {

  const { thoughts, tasks } = GetDailyData();
  // daily tasks will be default
  console.log('objectives 3', tasks)
  const [currentType, setCurrentType] = useState({
    type: 'Daily',
    id: 1,
  })
  // types array to map buttons accordingly
  // TO-DO create this array with db types
  const objectiveTypes = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const filterByType = (arr: any) => {
    const result =  arr.filter((el: any) => +el.typeId === currentType.id)
    if (result && result.length) return result;
    // in case we don't have an element with that type then we pass down the current type so we can create a new element with the correct type
    else return [{typeId: currentType.id, thoughtContent: ""}]
  }
  
  return (
    <div className="objectives">
      <PageTitle title={'Objectives'} />
      <div className="objectives__type-box">
        {objectiveTypes.map((type: string, index: number) => (
          <button
            // class name changes according to current state to change style
            className={`objectives__toggle-type-btn ${
              type === currentType.type ? 'selected' : 'unselected'
            }`}
            key={index}
            type="button"
            onClick={() =>
              setCurrentType({
                type: type,
                //setting id as index + 1 which will match the typeId
                id: index + 1,
              })
            }
          >
            {type}
          </button>
        ))}
      </div>
      {/* passing the filtered data according to type */}
      {/* there will be only one "thoughts of the day/week/month/year" */}
      {(tasks && tasks.length) || (thoughts && thoughts.length) ? (
        <ObjInfo
          tasks={filterByType(tasks)}
          thoughts={filterByType(thoughts)}
        />
      ):
      //new user - deal with this later
      null
    }
    </div>
  )
}
