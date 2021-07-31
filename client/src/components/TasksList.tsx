import { useEffect, useState } from 'react'
import { FiCheckCircle, FiPlusCircle } from 'react-icons/fi'
import { TaskCompleteI } from '../interfaces/Task'
import { completeTask, createTask } from '../services/apiClient'
import { v4 as uuidv4 } from 'uuid';

interface Props {
  tasks: TaskCompleteI[]
}

export const TasksList = ({ tasks }: Props) => {
  // changing between displaying button or input
  const [toggleEdit, setToggleEdit] = useState<boolean>(false)

  const [tasksArr, setTasksArr] = useState<TaskCompleteI[]>(tasks)

  const [newTask, setNewTask] = useState({
    taskTitle: '',
    typeId: tasks[0].typeId,
  })

  useEffect(() => {
    setNewTask((current) => ({ ...current, typeId: tasks[0].typeId }))
    setTasksArr(tasks)
  }, [tasks])

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setNewTask((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // add state to database
    setToggleEdit(!toggleEdit)
    const { task } = await createTask(newTask)
    // add result to state
    setTasksArr((current) => [...current, task])
  }

  const handleClick = (taskId: number) => {
    completeTask(taskId);
  }

  return (
    <div className="tasks-list">
      <div className="tasks-list__list">
        {tasksArr.length ? (
          tasksArr.map((task) => <div className="tasks-list__task" key={uuidv4()} onClick={() => handleClick(task.id)}>
            <FiCheckCircle className="tasks-list__task--icon uncompleted--icon"/>
            <span className="tasks-list__task--title uncompleted--text">{task.taskTitle}</span>
          </div>)
        ) : (
          <h2>No tasks</h2>
        )}
      </div>
      {toggleEdit ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="taskTitle"></label>
          <input
            type="text"
            name="taskTitle"
            value={newTask.taskTitle}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">add</button>
        </form>
      ) : (
        <div className="tasks-list__add-task">
          <FiPlusCircle onClick={() => setToggleEdit(!toggleEdit)} className="tasks-list__add-task--icon"/>
          <span>Add a new task</span>
        </div>
      )}
    </div>
  )
}
