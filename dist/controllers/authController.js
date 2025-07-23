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
exports.login = exports.register = void 0;
const userValidator_1 = require("../validators/userValidator");
const userService_1 = require("../services/userService");
const messages_1 = require("../utils/messages");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userValidation = userValidator_1.userSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(400).json({
            message: messages_1.messages.invalidData,
            errors: userValidation.error.issues
        });
    }
    try {
        yield (0, userService_1.createUser)(userValidation.data);
        return res.status(201).json({
            message: messages_1.messages.userCreated,
            user: {
                nome: userValidation.data.nome,
                email: userValidation.data.email
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: messages_1.messages.internalError,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userValidation = userValidator_1.userLoginSchema.safeParse(req.body);
    if (!userValidation.success) {
        return res.status(404).json({
            status: 'error',
            message: messages_1.messages.userNotFound,
            errors: userValidation.error.issues
        });
    }
    try {
        const { user, token } = yield (0, userService_1.loginUser)(userValidation.data);
        return res.status(200).json({
            status: 'success',
            message: 'Usuário logado com sucesso',
            user: { nome: user.nome, email: user.email },
            token,
        });
    }
    catch (error) {
        const status = error.statusCode || 500;
        return res.status(status).json({
            status: 'error',
            message: error.message,
            details: error.details || null,
        });
    }
});
exports.login = login;
