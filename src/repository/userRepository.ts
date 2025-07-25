import { prisma } from "../config/Prisma"
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email: string)=>{
    const user = await prisma.usuario.findFirst({
        where:{
            email:email
        }
    })
    return user;
}

export const createUserDB = async (userData: { nome: string; email: string; senha: string })=>{
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