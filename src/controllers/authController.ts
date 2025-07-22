import { Request, Response } from 'express';
import { userLoginSchema, userSchema } from '../validators/userValidator';
import { prisma } from '../config/Prisma';
import { createUser, loginUser } from '../services/userService';


export const register = async (req: Request, res: Response) => {
    // Validar dados do usuário recebidos na requisição
    const userValidation = userSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(400).json({
            message: 'Dados inválidos',
            errors: userValidation.error.issues
        });
    }
    try {
        await createUser(userValidation.data);
        return res.status(201).json({
            message: 'Usuário registrado com sucesso',
            user: {
                nome: userValidation.data.nome,
                email: userValidation.data.email
            }
        });
    }catch (error) {
        return res.status(500).json({
            message: 'Erro ao registrar usuário',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }   
}

export const login = async (req: Request, res: Response) => {
    const userValidation = userLoginSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(400).json({
            message: 'Dados inválidos',
            errors: userValidation.error.issues
        });
    }
    try {
       const{user, token} =  await loginUser(userValidation.data);
        return res.status(200).json({
            message: 'Usuário logado com sucesso',
            user,
            token,
        });
    }catch (error) {
        return res.status(500).json({
            message: 'Erro ao fazer login',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}