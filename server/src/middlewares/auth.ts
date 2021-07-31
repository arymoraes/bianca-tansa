import Models from '../../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();
const secret: any = process.env.SECRET;

interface AuthRequest extends Request {
  user?: Document;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: any) => {
  try {
    // getting the token from header
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(403);
    // getting the user id from the token, if token is valid
    // if the token is valid then we have an id, so we retrieve the user data
    const check: any = jwt.verify(authHeaders, secret);
    const user = await Models.User.findOne({where: {id: check.id}});

    if (!user) return res.sendStatus(401);
    req.body.user = user;
    req.body.accessToken = authHeaders;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
