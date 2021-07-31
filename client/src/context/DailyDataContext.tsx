import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { CompletedI, TaskCompleteI } from '../interfaces/Task'
import { ThoughtCompleteI } from '../interfaces/Thought'
import { getTasksByUser, getTasksByUserToday, getThoughtByUserToday } from '../services/apiClient'

interface DailyDataProviderI {
  tasks: TaskCompleteI[],
  thoughts: ThoughtCompleteI[],
  setNewTasks: Function,
  setNewThoughts: Function
}

// this context will be used to validate the user each time a component is loaded and redirect to either the public or private routes

const DailyDataContext = createContext<DailyDataProviderI>({} as DailyDataProviderI)

export const DailyDataProvider: React.FC = ({ children }) => {
  // this will store our current user that was retrieved by the server on the use Effect hook if the token is valid
  const [tasks, setTasks] = useState<TaskCompleteI[]>([])
  const [thoughts, setThoughts] = useState<ThoughtCompleteI[]>([])
  const [completedTasks, setCompletedTasks] = useState<CompletedI[]>([])

  const [organizedTasks, setOrganizedTasks] = useState<any>([])

  useEffect(() => {
      getTasksByUser().then((res) => {
        console.log('all tasks 1',res.tasks)
        setTasks(res.tasks)

        getTasksByUserToday().then((res) => {
          console.log('all completed tasks 2',res.completedTasks)
          setCompletedTasks(res.completedTasks)
          setOrganizedTasks(organizeCompletedTasks());
        })
        .catch((err) => setTasks([]))
      })
      .catch((err) => setTasks([]))


      getThoughtByUserToday().then((res) => {
        setThoughts(res.thoughts)
      })
      .catch((err) => setThoughts([]))

  }, [])

  // this will be used to alter the context when we either login or register
  const setNewTasks = (newTasks: TaskCompleteI[]) => {
    setTasks(newTasks)
  }
  const setNewThoughts = (newThoughts: ThoughtCompleteI[]) => {
    setThoughts(newThoughts)
  }

  const organizeCompletedTasks = () => {
    // get the daily tasks and compare them to the completed tasks
    // completed: false by default
    // to store the tasks id from completed in order to compare with all tasks
    const completedTasksIds: number[] = [];
    completedTasks.forEach(tsk => completedTasksIds.push(tsk.taskId));
    // taking the ones that match the array above because they are completed
    const filteredTasks = tasks.filter(task => completedTasksIds.includes(task.id));
    // returning combined uncompleted and completed to display
    return [...filteredTasks, ...completedTasks];
  }

  return (
    <DailyDataContext.Provider value={{ tasks: organizedTasks, thoughts, setNewTasks, setNewThoughts }}>
      {children}
    </DailyDataContext.Provider>
  )
}

export const GetDailyData = () => {
  const context = useContext(DailyDataContext);
  return context;
}
