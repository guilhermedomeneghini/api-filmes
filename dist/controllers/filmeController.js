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
exports.excluir = exports.editar = exports.cadastrar = exports.buscarPorId = exports.listar = void 0;
const filmeService_1 = require("../services/filmeService");
const filmeValidator_1 = require("../validators/filmeValidator");
const listar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagina, limite, titulo, genero, ano } = req.query;
    const paginaNum = Number(pagina) || 1;
    const limiteNum = Number(limite) || 10;
    const tituloFiltro = titulo ? String(titulo) : '';
    const generoFiltro = genero ? String(genero) : '';
    const anoFiltro = ano ? Number(ano) : 0;
    const filmes = yield (0, filmeService_1.getFilmes)(paginaNum, limiteNum, tituloFiltro, generoFiltro, anoFiltro);
    res.json(filmes);
});
exports.listar = listar;
const buscarPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const filme = yield (0, filmeService_1.getFilmeById)(id);
        res.json(filme);
    }
    catch (error) {
        res.status(404).json({ message: `404 - Conteudo não encontrado` });
    }
    console.log(id);
});
exports.buscarPorId = buscarPorId;
const cadastrar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validateFilme = filmeValidator_1.filmeSchema.safeParse(req.body);
    if (!validateFilme.success) {
        return res.status(400).json({
            message: 'Dados inválidos',
            errors: validateFilme.error.issues
        });
    }
    const filme = Object.assign(Object.assign({}, validateFilme.data), { classificacao: (_a = validateFilme.data.classificacao) !== null && _a !== void 0 ? _a : 0 });
    try {
        yield (0, filmeService_1.addFilme)(filme);
        return res.status(201).json({
            message: 'Filme cadastrado com sucesso',
            filme
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.cadastrar = cadastrar;
const editar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const validateFilme = filmeValidator_1.filmeSchema.safeParse(req.body);
    if (!validateFilme.success) {
        return res.status(400).json({
            message: 'Dados inválidos',
            errors: validateFilme.error.issues
        });
    }
    try {
        const filme = yield (0, filmeService_1.updateFilme)(id, validateFilme.data);
        res.status(200).json({
            message: 'Filme atualizado com sucesso',
            filme
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.editar = editar;
const excluir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const filme = yield (0, filmeService_1.deleteFilme)(id);
        res.status(200).json({
            message: 'Filme deletado com sucesso',
            filme
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao deletar filme' });
    }
});
exports.excluir = excluir;
