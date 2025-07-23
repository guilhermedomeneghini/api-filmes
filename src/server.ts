import express from 'express'
import 'dotenv/config';
import mainRouter from './routes/filmeRoutes';
import cors from 'cors';
import authRouter from './routes/authRoutes';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger';

const app = express();
const port = parseInt(process.env.PORT || '3000');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
    origin: '*',
}));


app.use('/filmes', mainRouter)
app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);


app.listen(port,()=>{
    console.log("Servers is running in http://localhost:3000")
})