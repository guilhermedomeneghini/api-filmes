"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilme = exports.updateFilme = exports.addFilme = exports.getFilmeById = exports.getFilmes = void 0;
const Prisma_1 = require("../config/Prisma");
const client_1 = require("@prisma/client");
const getFilmes = (pagina, limite, titulo, genero, ano) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (pagina - 1) * limite;
    const filmes = yield Prisma_1.prisma.filme.findMany({
        where: {
            titulo: { contains: titulo, mode: client_1.Prisma.QueryMode.insensitive },
            genero: { contains: genero, mode: client_1.Prisma.QueryMode.insensitive },
            anoLancamento: ano ? Number(ano) : undefined
        },
        skip,
        take: limite
    });
    return filmes;
});
exports.getFilmes = getFilmes;
const getFilmeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.prisma.filme.findFirst({
        where: { id }
    });
    if (!result) {
        throw new Error(`Filme com ID ${id} não encontrado`);
    }
    return result;
});
exports.getFilmeById = getFilmeById;
const addFilme = (filmeData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Prisma_1.prisma.filme.findFirst({ where: { titulo: filmeData.titulo } })) {
        throw new Error(`Filme com título "${filmeData.titulo}" já existe`);
    }
    yield Prisma_1.prisma.filme.create({
        data: Object.assign({}, filmeData)
    });
    return filmeData;
});
exports.addFilme = addFilme;
const updateFilme = (id, filmeData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Prisma_1.prisma.filme.findFirst({ where: { id } })) {
        yield Prisma_1.prisma.filme.update({ where: { id }, data: Object.assign({}, filmeData) });
        return { message: `Filme com ID ${id} Editado com sucesso:`, filme: Object.assign({}, filmeData) };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
});
exports.updateFilme = updateFilme;
const deleteFilme = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Prisma_1.prisma.filme.findFirst({ where: { id } })) {
        yield Prisma_1.prisma.filme.delete({ where: { id } });
        return { message: `Filme com ID ${id} excluído com sucesso` };
    }
    throw new Error(`Filme com ID ${id} não encontrado`);
});
exports.deleteFilme = deleteFilme;
