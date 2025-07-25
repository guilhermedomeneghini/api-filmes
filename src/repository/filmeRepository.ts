import { Prisma } from "@prisma/client";
import { prisma } from "../config/Prisma";
import { Filme } from "../models/Filme";

export const findFilmes = async (pagina:number, limite:number, titulo:string, genero:string, ano:number)=>{
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

export const findFilmeById = async (id:number)=>{
    const filme = await prisma.filme.findUnique({
        where:{
            id
        }
    });
    return filme;
}

export const findFilmeByTitle = async (title:string)=>{
    const filme = await prisma.filme.findFirst({ where: { titulo: title } })
    return filme;
}

export const createFilme = async (filmeData: Filme)=>{
    const filme = await prisma.filme.create({
        data:{...filmeData}
    });
    return filme;
}

export const updateFilmeRep = async (id: number, filmeData:Filme)=>{
    return await prisma.filme.update({ where: { id }, data: { ...filmeData }  });

}

export const delFilm = async (id: number)=>{
    return await prisma.filme.delete({ where: { id } });
}