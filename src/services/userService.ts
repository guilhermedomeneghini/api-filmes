import { prisma } from "../config/Prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthError, NotFoundError } from "../utils/erros";

export const createUser = async (userData: { nome: string; email: string; senha: string }) => {
    
    if(await prisma.usuario.findFirst({ where: { email: userData.email } })) {
        throw new Error(`Usuário com email "${userData.email}" já existe`);
    }

    const passwordHash = await bcrypt.hash(userData.senha, 10);
    const user = await prisma.usuario.create({
        data:{
            nome: userData.nome,
            email: userData.email,
            senha: passwordHash
        }

    });

    return user;

}

export const loginUser = async (userData: { email: string; senha: string }) => {
    const user = await prisma.usuario.findFirst({
        where:{
            email: userData.email
        }
    })
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