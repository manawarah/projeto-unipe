import { asyncLocalStorage } from "@src/context";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.access_token;

  if (!token) {
    res.status(403).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.id as string;
    req.userId = userId;
    asyncLocalStorage.run({ userId }, () => {
      next();
    });
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
