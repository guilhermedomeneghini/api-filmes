import express from 'express'
import 'dotenv/config';
import mainRouter from './routes/filmeRoutes';
import cors from 'cors';

const app = express();
const port = parseInt(process.env.PORT || '3000');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'], // Portas do frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/filmes', mainRouter)


app.listen(port,()=>{
    console.log("Servers is running in http://localhost:3000")
})