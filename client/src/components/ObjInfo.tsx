import { TaskCompleteI } from '../interfaces/Task'
import { ThoughtCompleteI } from '../interfaces/Thought'
import { TasksList } from './TasksList'
import { Thought } from './Thought'

interface Props {
  tasks: TaskCompleteI[]
  thoughts: ThoughtCompleteI[]
}

export const ObjInfo = ({ tasks, thoughts }: Props) => {
  return (
    <div className="obj-info">
      <TasksList tasks={tasks} />
      <Thought filteredThoughts={thoughts} />
    </div>
  )
}
