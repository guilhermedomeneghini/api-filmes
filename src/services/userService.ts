import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthError, NotFoundError } from "../utils/erros";
import { createUserDB, getUserByEmail } from "../repository/userRepository";

export const createUser = async (userData: { nome: string; email: string; senha: string }) => {
    
    const userExists =await getUserByEmail(userData.email);
    if(userExists){
        throw new Error(`Usuário com email "${userData.email}" já existe`);
    }

    const user = await createUserDB(userData);
    return user;

}

export const loginUser = async (userData: { email: string; senha: string }) => {
    const user = await getUserByEmail(userData.email);
    if(!user){
        throw new NotFoundError('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(userData.senha, user.senha);
    if(!isPasswordValid) {
        throw new AuthError('Usuário ou senha inválida');
    }
    const payload = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role
    };

    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '1d'
    })

    return { user, token };
}