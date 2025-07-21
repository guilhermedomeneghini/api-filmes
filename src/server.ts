import express from 'express'
import 'dotenv/config';
import mainRouter from './routes/filmeRoutes';
import cors from 'cors';
import authRouter from './routes/authRoutes';

const app = express();
const port = parseInt(process.env.PORT || '3000');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/filmes', mainRouter)
app.use('/auth', authRouter); 


app.listen(port,()=>{
    console.log("Servers is running in http://localhost:3000")
})