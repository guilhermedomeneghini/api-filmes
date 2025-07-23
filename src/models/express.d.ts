import { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        nome: string;
        role: string;
      };
    }
  }
}