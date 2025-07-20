import { prisma } from "../config/Prisma";
import { Filme } from "../models/Filme";
import { Prisma } from '@prisma/client';


export const getFilmes = async (pagina:number, limite:number, titulo:string, genero:string, ano:number)=>{
    const skip = (pagina -1) * limite;

    const filmes = await prisma.filme.findMany({
        where:{
            titulo: { contains: titulo, mode: Prisma.QueryMode.insensitive },
            genero: { contains: genero, mode: Prisma.QueryMode.insensitive },
            anoLancamento: ano? Number(ano) : undefined
        },
        skip,
        take: limite
    });

    return filmes;
}

export const getFilmeById = async (id: number) => {
    const result = await prisma.filme.findFirst({
        where: { id }
    });
    if (!result) {
        throw new Error(`Filme com ID ${id} não encontrado`);
    }
    return result;
}

export const addFilme = async (filmeData: Filme) => {
    if(await prisma.filme.findFirst({ where: { titulo: filmeData.titulo } })) {
        throw new Error(`Filme com título "${filmeData.titulo}" já existe`);
    }
    await prisma.filme.create({
        data:{...filmeData}
    });
    return filmeData;   
}

export const updateFilme = async (id: number, filmeData: Filme) => {
    if(await prisma.filme.findFirst({ where: { id } })) {
        await prisma.filme.update({ where: { id }, data: { ...filmeData }  });
        return { message: `Filme com ID ${id} Editado com sucesso:`, filme: { ...filmeData } };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
}

export const deleteFilme = async (id: number) => {
    if(await prisma.filme.findFirst({ where: { id } })) {
        await prisma.filme.delete({ where: { id } });
        return { message: `Filme com ID ${id} excluído com sucesso` };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
}