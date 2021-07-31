export interface TaskI {
  taskTitle: string
  typeId: number
}

export interface TaskCompleteI extends TaskI {
  UserId: number
  id: number
  date: string
}

export interface CompletedI extends TaskCompleteI {
  taskId: number
  completed: boolean
  createdAt: string
  updatedAt: string
}
