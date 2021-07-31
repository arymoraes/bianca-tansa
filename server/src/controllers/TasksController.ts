import Models from '../../models';
import { Request, Response } from 'express';
import moment from 'moment';
import { Op } from 'sequelize';

// create a modify task method

// setting current dates
const todaysDate = moment(new Date()).format('YYYY-MM-DD');
const currentWeek = moment(new Date()).format('YYYY-WW');
const currentMonth = moment(new Date()).format('YYYY-MM');
const currentYear = moment(new Date()).format('YYYY');

export const createTask = async (req: Request, res: Response) => {
  try {
    // getting the authenticated user id
    const { id } = req.body.user;
    const { accessToken, taskTitle, typeId } = req.body;
    // creating date on the desired format
    const date = moment(new Date()).format('YYYY-MM-DD');
    // creating new task
    const task = await Models.Tasks.create({taskTitle, UserId: id, typeId, date});
    // sending token and new task
    res.send({ accessToken, task });
    res.status(200)
  } catch (err) {
    res.send(`Task was not created: ${err}`);
    res.status(500);
  }
}

export const findTasksByUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.body.user;
    const { accessToken } = req.body;

    const tasks = await Models.Tasks.findAll({where: {UserId: id}});

    res.send({ accessToken, tasks });
    res.status(200);
  } catch (err) {
    res.send(`Could not find tasks: ${err}`);
    res.status(500);
  }
}

export const completedTasksByUserToday = async (req: Request, res: Response) => {
  try {
    const { accessToken, user } = req.body;
    // getting all tasks completed by that user today
    const completedTasks = await Models.CompletedTasks.findAll({where: {UserId: user.id, [Op.or]: [
      {date: todaysDate},
      {date: currentWeek},
      {date: currentMonth},
      {date: currentYear}
    ]
    }});

    // send token and array with completed tasks
    res.send({accessToken, completedTasks});
    res.status(200);
  } catch (err) {
    res.send(`Could not find completed tasks: ${err}`);
    res.status(500);
  }
}

export const completeTask = async (req: Request, res: Response) => {

  // add date task in order to filter in history later
  try {
    const { accessToken, taskId } = req.body;
    //  finding the task to be completed
    const task = await Models.Tasks.findOne({where: {id: taskId}});
    const {UserId, typeId, taskTitle}  = task;

    let completedTask;

    // type 1 = daily
    if (+typeId === 1) {
      // look if this task already exists in completed
      const findTask = await Models.CompletedTasks.findOne({where: {taskId, date: todaysDate}})
      // if it exists delete it
      if (findTask) {
        findTask.completed = false;
        completedTask = findTask;
        findTask.destroy();
      }
      // if it doesn't then create it
      else {
        completedTask = await Models.CompletedTasks.create({UserId, typeId, taskId, taskTitle, date: todaysDate, completed: true})
      }
    }
    // type 2 = weekly
    if (+typeId === 2) {
      // look if this task already exists in completed
      const findTask = await Models.CompletedTasks.findOne({where: {taskId, date: currentWeek}})
      // if it exists delete it
      if (findTask) {
        findTask.completed = false;
        completedTask = findTask;
        findTask.destroy();
      }
      // if it doesn't then create it
      else {
        completedTask = await Models.CompletedTasks.create({UserId, typeId, taskId, taskTitle, date: currentWeek, completed: true})
      }
    }
    // type 3 = monthly
    if (+typeId === 3) {
      // look if this task already exists in completed
      const findTask = await Models.CompletedTasks.findOne({where: {taskId, date: currentMonth}})
      // if it exists delete it
      if (findTask) {
        findTask.completed = false;
        completedTask = findTask;
        findTask.destroy();
      }
      // if it doesn't then create it
      else {
        completedTask = await Models.CompletedTasks.create({UserId, typeId, taskId, taskTitle, date: currentMonth, completed: true})
      }
    }
    // type 4 = yearly
    if (+typeId === 4) {
      // look if this task already exists in completed
      const findTask = await Models.CompletedTasks.findOne({where: {taskId, date: currentYear}})
      // if it exists delete it
      if (findTask) {
        findTask.completed = false;
        completedTask = findTask;
        findTask.destroy();
      }
      // if it doesn't then create it
      else {
        completedTask = await Models.CompletedTasks.create({UserId, typeId, taskId, taskTitle, date: currentYear, completed: true})
      }
    }
    // sending back the completed task that was either added of deleted
    res.send({ accessToken, completedTask });
    res.status(200);
  } catch (err) {
    res.send(`Could not complete task: ${err}`);
    res.status(500);
  }
}