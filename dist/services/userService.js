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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const Prisma_1 = require("../config/Prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const erros_1 = require("../utils/erros");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Prisma_1.prisma.usuario.findFirst({ where: { email: userData.email } })) {
        throw new Error(`Usuário com email "${userData.email}" já existe`);
    }
    const passwordHash = yield bcrypt_1.default.hash(userData.senha, 10);
    const user = yield Prisma_1.prisma.usuario.create({
        data: {
            nome: userData.nome,
            email: userData.email,
            senha: passwordHash
        }
    });
    return user;
});
exports.createUser = createUser;
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Prisma_1.prisma.usuario.findFirst({
        where: {
            email: userData.email
        }
    });
    if (!user) {
        throw new erros_1.NotFoundError('Usuário não encontrado');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(userData.senha, user.senha);
    if (!isPasswordValid) {
        throw new erros_1.AuthError('Usuário ou senha inválida');
    }
    const payload = {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secretKey, {
        expiresIn: '1d'
    });
    return { user, token };
});
exports.loginUser = loginUser;
