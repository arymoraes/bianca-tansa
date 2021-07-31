import express from 'express';
import { completedTasksByUserToday, completeTask, createTask, findTasksByUser } from '../controllers/TasksController';
import { getUserDetails, loginUser, createUser } from '../controllers/AuthenticationController';
import { authMiddleware } from '../middlewares/auth';
import { createThought, findThoughtsByUser, findThoughtsByUserTodayAndType } from '../controllers/ThoughtsController';
import { createType } from '../controllers/TypeController';
const router = express.Router();

// authentication
router.get('/user/details', authMiddleware, getUserDetails);
router.post('/user/create', createUser);
router.post('/user/login', loginUser);

//thoughts
router.get('/user/thoughts', authMiddleware, findThoughtsByUser);
router.get('/user/today/thoughts', authMiddleware, findThoughtsByUserTodayAndType);
router.post('/thought/create', authMiddleware, createThought);

//tasks
router.get('/user/tasks', authMiddleware, findTasksByUser);
router.get('/user/tasks/completed', authMiddleware, completedTasksByUserToday);
router.post('/task/create', authMiddleware, createTask);
router.post('/task/complete', authMiddleware, completeTask);

//type
router.post('/createtype', createType)

export default router;
