import {z} from 'zod';

export const userSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.string().min(5).email("Email deve ser válido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})        

export const userLoginSchema = z.object({
  email: z.string().min(5).email("Email deve ser válido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})        