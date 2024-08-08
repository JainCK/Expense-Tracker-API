import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user";

interface JwtPayload {
  id: string;
}

interface AuthRequest extends Request {
    user?: any;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
          throw new Error();
        }
        req.user = user;
        next();
      } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
      }


}

export default auth;