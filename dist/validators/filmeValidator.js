"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmeSchema = void 0;
const zod_1 = require("zod");
exports.filmeSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(2, "Título é obrigatório"),
    descricao: zod_1.z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
    genero: zod_1.z.string().min(3, "Gênero deve ter pelo menos 3 caracteres"),
    anoLancamento: zod_1.z.number().int().min(1900, "Ano de lançamento deve ser maior que 1900"),
    duracao: zod_1.z.number().int().min(1, "Duração deve ser maior que 0"),
    imagemUrl: zod_1.z.string().url("URL da imagem deve ser válida"),
    classificacao: zod_1.z.number().int().min(0, "Classificação deve ser maior ou igual a 0").max(18, "Classificação deve ser menor ou igual a 18").optional(),
    idioma: zod_1.z.string().min(2, "Idioma deve ter pelo menos 2 caracteres").optional()
});
