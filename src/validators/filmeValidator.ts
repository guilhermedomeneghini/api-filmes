import { z } from 'zod';

export const filmeSchema = z.object({
  titulo: z.string().min(2, "Título é obrigatório"),
  descricao: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres"),
  genero: z.string().min(3, "Gênero deve ter pelo menos 3 caracteres"),
  anoLancamento: z.number().int().min(1900, "Ano de lançamento deve ser maior que 1900"),
  duracao: z.number().int().min(1, "Duração deve ser maior que 0"),
  imagemUrl: z.string().url("URL da imagem deve ser válida")
});