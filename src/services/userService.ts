import { prisma } from "../config/Prisma";
import bcrypt from 'bcrypt';

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
        throw new Error(`Usuário com email "${userData.email}" não encontrado`);
    }

    const isPasswordValid = await bcrypt.compare(userData.senha, user.senha);
    if(!isPasswordValid) {
        throw new Error('Senha inválida');
    }
    return user;
}