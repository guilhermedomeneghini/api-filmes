import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface JwtPayload {
  id: number;
  email: string;
  nome: string;
  role: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        
        const { id, email, nome, role } = payload as JwtPayload;
        req.user = { id, email, nome, role };
        next();
    });
}

export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado / Sem permissão' });
    }
    next();
}