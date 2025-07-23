"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, "Nome é obrigatório"),
    email: zod_1.z.string().min(5).email("Email deve ser válido"),
    senha: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().min(5).email("Email deve ser válido"),
    senha: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
