import Models from '../../models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const saltRounds = 10;
dotenv.config();
const secret: any = process.env.SECRET;

export const createUser = async (req: Request, res: Response) => {
  // deconstructing request body
  const {firstName, lastName, email, password } = req.body;
  // finding user with email
  const user = await Models.User.findOne({where: {email}});
  // if email does exist do not create user
  if (user) 
    return res.status(409).send(`Invalid e-mail address`);
  // if email is valid create user
  try {
    // creating a hash password to store in database
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // creating a new user on the database
    const newUser = await Models.User.create({firstName, lastName, email, password: hashPassword})

    // create a token for the user
    const accessToken = jwt.sign({id: newUser.id}, secret, {expiresIn: '1d'});
    // attach token to result header
    res.setHeader('Authorization', accessToken);

    // send access token and clean user as response
    res.send({accessToken, user: {email, firstName, lastName, newUser: newUser.createdAt, id: newUser.id}});
    res.status(201);
  } catch (err) {
    res.send(`User could not be created: ${err}`);
    res.status(400);
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    // finding user with email
    const user = await Models.User.findOne({where: {email: req.body.email}});
    // validating if password is correct
    const validatedPass = await bcrypt.compare(req.body.password, user.password);
    // if credentials are incorrect
    if (!validatedPass) throw new Error('incorrect credentials');
    //if they are correct create a new token
    const accessToken = jwt.sign({id: user.id}, secret, {expiresIn: '1d'});
    // attach token to result header
    res.setHeader('Authorization', accessToken);
    // send access token and clean user as response
    const { email, firstName, lastName, createdAt, id } = user;
    res.send({accessToken, user: {email, firstName, lastName, createdAt, id}});
    res.status(201);
  } catch (err) {
    res.send(`Login failed: ${err}`);
    res.status(400);
  }
}

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    // returning user info that is coming from middleware
    const { email, firstName, lastName, createdAt, id } = req.body.user;
    const { accessToken } = req.body
    res.status(200);
    console.log('getuserdetails', req.body.user)    
    // send access token and clean user as response
    res.send({accessToken, user: {email, firstName, lastName, createdAt, id} });
  } catch (err) {
    res.status(500);
    res.send(`Could not retrieve user details: ${err}`);
  }
}