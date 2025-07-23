import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // aqui coloque o tipo correto do seu "user"
  }
}
