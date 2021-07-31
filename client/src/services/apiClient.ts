import { CredentialsI } from '../interfaces/Credentials'
import { TaskI } from '../interfaces/Task'
import { ThoughtI } from '../interfaces/Thought'
import { UserI } from '../interfaces/User'
import api from './apiConfig'

export async function getUserDetails() {
  try {
    const response = await api.get('/user/details')
    return response.data
  } catch (error) {
    return false
  }
}

export async function createUser(user: UserI) {
  try {
    const response = await api.post('/user/create', user)
    return response.data
  } catch (error) {
    return false
  }
}

export async function loginUser(credentials: CredentialsI) {
  try {
    const response = await api.post('/user/login', credentials)
    return response.data
  } catch (error) {
    return false
  }
}

export async function createTask(task: TaskI) {
  try {
    const response = await api.post('/task/create', task)
    return response.data
  } catch (error) {
    return false
  }
}

export async function createThought(thought: ThoughtI) {
  try {
    const response = await api.post('/thought/create', thought)
    return response.data
  } catch (error) {
    return false
  }
}

export async function getTasksByUser() {
  try {
    const response = await api.get('/user/tasks')
    return response.data
  } catch (error) {
    return false
  }
}

export async function getThoughtsByUser() {
  try {
    const response = await api.get('/user/thoughts')
    return response.data
  } catch (error) {
    return false
  }
}

export async function getThoughtByUserToday() {
  try {
    const response = await api.get('/user/today/thoughts')
    return response.data
  } catch (error) {
    return false
  }
}

export async function getTasksByUserToday() {
  try {
    const response = await api.get('/user/tasks/completed')
    return response.data
  } catch (error) {
    return false
  }
}

export async function completeTask(taskId: number) {
  try {
    console.log(taskId);
    const response = await api.post('/task/complete', {taskId});
    console.log(response.data);
    return response.data
  } catch (error) {
    return false
  }
}

