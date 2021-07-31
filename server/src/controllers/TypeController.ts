import Models from '../../models';
import { Request, Response } from 'express';

export const createType = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const type = await Models.Type.create({name});
    res.send({ type });
    res.status(200);
  } catch (err) {
    res.send(`Type was not created: ${err}`);
    res.status(500);
  }
}