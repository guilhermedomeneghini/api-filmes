import { Request, Response } from 'express';
import { userLoginSchema, userSchema } from '../validators/userValidator';
import { createUser, loginUser } from '../services/userService';
import { messages } from '../utils/messages';


export const register = async (req: Request, res: Response) => {
    const userValidation = userSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(400).json({
            message: messages.invalidData,
            errors: userValidation.error.issues
        });
    }
    try {
        await createUser(userValidation.data);
        return res.status(201).json({
            message: messages.userCreated,
            user: {
                nome: userValidation.data.nome,
                email: userValidation.data.email
            }
        });
    }catch (error) {
        return res.status(500).json({
            message: messages.internalError,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }   
}

export const login = async (req: Request, res: Response) => {
    const userValidation = userLoginSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(404).json({
            status: 'error',
            message: messages.userNotFound,
            errors: userValidation.error.issues
        });
    }
    try {
       const{user, token} =  await loginUser(userValidation.data);
        return res.status(200).json({
            status: 'success',
            message: 'Usuário logado com sucesso',
            user: { nome: user.nome, email: user.email },
            token,
        });
    }catch (error: any) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            status: 'error',
            message: error.message,
            details: error.details || null,
        });
    }
}