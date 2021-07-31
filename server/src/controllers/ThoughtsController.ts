import Models from '../../models';
import { Request, Response } from 'express';
import moment from 'moment';

// setting current dates
const todaysDate = moment(new Date()).format('YYYY-MM-DD');
const currentWeek = moment(new Date()).format('YYYY-WW');
const currentMonth = moment(new Date()).format('YYYY-MM');
const currentYear = moment(new Date()).format('YYYY');

export const createThought = async (req: Request, res: Response) => {

  try {
    // getting the authenticated user id
    const { user } = req.body;
    const { accessToken, thoughtContent, typeId, id } = req.body;
    // check if it id (can be undefined) already exists, if it does replace if not create new

    let thought;
    // type 1 = daily
    if (+typeId === 1) {
      // if id is defined it means it already exists so replace
      if (id) {
        thought = await Models.Thoughts.findOne({where: {id}});
        thought.thoughtContent = thoughtContent;
        await thought.save();
      } else {
        // if id is undefined create new thought according to type
        thought = await Models.Thoughts.create({thoughtContent, UserId: user.id, typeId, date: todaysDate});
      }
    }
    // type 2 = weekly
    else if (+typeId === 2) {
      if (id) {
        thought = await Models.Thoughts.findOne({where: {id}});
        thought.thoughtContent = thoughtContent;
        await thought.save();
      } else {
        thought = await Models.Thoughts.create({thoughtContent, UserId: user.id, typeId, date: currentWeek});
      }
    }
    // type 3 = monthly
    else if (+typeId === 3) {
      if (id) {
        thought = await Models.Thoughts.findOne({where: {id}});
        thought.thoughtContent = thoughtContent;
        await thought.save();
      } else {
        thought = await Models.Thoughts.create({thoughtContent, UserId: user.id, typeId, date: currentMonth});
      }
    }
    // type 4 = yearly
    else if (+typeId === 4) {
      if (id) {
        thought = await Models.Thoughts.findOne({where: {id}});
        thought.thoughtContent = thoughtContent;
        await thought.save();
      } else {
        thought = await Models.Thoughts.create({thoughtContent, UserId: user.id, typeId, date: currentYear});
      }
    }

    // sending token and new thought
    res.send({ accessToken, thought });
    res.status(200);
  } catch (err) {
    res.send(`Thought was not created: ${err}`);
    res.status(500);
  }
}

export const findThoughtsByUser = async (req: Request, res: Response) => {
  try {
    // getting the authenticated user id
    const { id } = req.body.user;
    const { accessToken } = req.body;
    // retrieving thoughts from that user
    const thoughts = await Models.Thoughts.findAll({where: {UserId: id}});
    // sending token and array of thoughts
    res.send({ accessToken, thoughts });
    res.status(200);
  } catch (err) {
    res.send(`Could not find thoughts: ${err}`);
    res.status(500);
  }
}

export const findThoughtsByUserTodayAndType = async (req: Request, res: Response) => {
  try {
    // getting the authenticated user id
    const { id } = req.body.user;
    const { accessToken } = req.body;

    // bundling together
    const thoughts = [];
    // retrieving thoughts from that user by date
    const day = await Models.Thoughts.findOne({where: {UserId: id, date: todaysDate}});
    // if it retrieved something then push result to thoughts array
    day && thoughts.push(day);
    const week = await Models.Thoughts.findOne({where: {UserId: id, date: currentWeek}});
    week && thoughts.push(week);
    const month = await Models.Thoughts.findOne({where: {UserId: id, date: currentMonth}});
    month && thoughts.push(month);
    const year = await Models.Thoughts.findOne({where: {UserId: id, date: currentYear}});
    year && thoughts.push(year);
    // sending token and array of thoughts
    res.send({ accessToken, thoughts });
    res.status(200);
  } catch (err) {
    res.send(`Could not find thoughts: ${err}`);
    res.status(500);
  }
}
