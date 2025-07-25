import { Filme } from "../models/Filme";
import { createFilme, delFilm, findFilmeById, findFilmeByTitle, findFilmes, updateFilmeRep } from "../repository/filmeRepository";


export const getFilmes = async (pagina:number, limite:number, titulo:string, genero:string, ano:number)=>{
    const filmes = await findFilmes(pagina, limite, titulo, genero, ano);

    return filmes;
}

export const getFilmeById = async (id: number) => {
    const result = await findFilmeById(id);
    if (!result) {
        throw new Error(`Filme com ID ${id} não encontrado`);
    }
    return result;
}

export const addFilme = async (filmeData: Filme) => {
    const filmeExists = await findFilmeByTitle(filmeData.titulo);
    if(filmeExists) {
        throw new Error(`Filme com título "${filmeData.titulo}" já existe`);
    }
    const filme = await createFilme(filmeData);  
    return filme;
}

export const updateFilme = async (id: number, filmeData: Filme) => {
    if(await findFilmeById(id)) {
        await updateFilmeRep(id, filmeData)
        return { message: `Filme com ID ${id} Editado com sucesso:`, filme: { ...filmeData } };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
}

export const deleteFilme = async (id: number) => {
    if(await findFilmeById(id)) {
        await delFilm(id)
        return { message: `Filme com ID ${id} excluído com sucesso` };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
}