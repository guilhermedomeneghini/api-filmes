import { Request, Response } from 'express';
import { addFilme, deleteFilme, getFilmeById, getFilmes, updateFilme } from '../services/filmeService';
import { filmeSchema } from '../validators/filmeValidator';
import { Filme } from '../models/Filme';

export const listar = async (req: Request, res: Response) => {
  const { pagina, limite, titulo, genero, ano} = req.query;

  const paginaNum = Number(pagina) || 1;
  const limiteNum = Number(limite) || 10;
  const tituloFiltro = titulo ? String(titulo) : '';
  const generoFiltro = genero ? String(genero) : '';
  const anoFiltro = ano ? Number(ano) : 0;

  const filmes = await getFilmes(paginaNum, limiteNum, tituloFiltro, generoFiltro, anoFiltro);

  res.json(filmes);
};


export const buscarPorId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const filme = await getFilmeById(id);
    res.json(filme);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
  console.log(id)
}

export const cadastrar= async (req: Request, res: Response) => {

  const validateFilme = filmeSchema.safeParse(req.body);
  if (!validateFilme.success) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: validateFilme.error.issues
    });
  }
  const filme: Filme = validateFilme.data;

  try {
    await addFilme(filme);
    return res.status(201).json({
      message: 'Filme cadastrado com sucesso',
      filme
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export const editar = async (req: Request, res: Response) => {

  const id = parseInt(req.params.id);
  const validateFilme = filmeSchema.safeParse(req.body);
  if (!validateFilme.success) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: validateFilme.error.issues
    });
  }

  try{
    const filme = await updateFilme(id, validateFilme.data);
    res.status(200).json({
      message: 'Filme atualizado com sucesso',
      filme
    });
  }catch(error:any){
    res.status(400).json({ message: error.message });
  }
}

export const excluir = async (req: Request, res: Response) => {

  const id = parseInt(req.params.id);
  const validateFilme = filmeSchema.safeParse(req.body);
  if (!validateFilme.success) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: validateFilme.error.issues
    });
  }

  try{
    const filme = await deleteFilme(id);
    res.status(200).json({
      message: 'Filme deletado com sucesso',
      filme
    });
  }catch(error:any){
    res.status(400).json({ message: error.message });
  }
}
