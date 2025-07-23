"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API de Filmes",
        version: "1.0.0",
        description: "API estilo Netflix com autenticação JWT",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local",
        },
    ],
    tags: [
        { name: "Filmes", description: "Operações relacionadas a filmes" },
        { name: "Autenticação", description: "Login e Registro de usuários" },
    ],
    paths: {
        "/auth/register": {
            post: {
                tags: ["Autenticação"],
                summary: "Registrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserRegister",
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Usuário criado com sucesso" },
                    400: { description: "Erro de validação" },
                },
            },
        },
        "/auth/login": {
            post: {
                tags: ["Autenticação"],
                summary: "Login de usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UserLogin",
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Login bem-sucedido, token gerado" },
                    401: { description: "Credenciais inválidas" },
                },
            },
        },
        "/filmes": {
            get: {
                tags: ["Filmes"],
                summary: "Listar filmes com filtros",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: "pagina", in: "query", schema: { type: "integer" } },
                    { name: "limite", in: "query", schema: { type: "integer" } },
                    { name: "titulo", in: "query", schema: { type: "string" } },
                    { name: "genero", in: "query", schema: { type: "string" } },
                    { name: "ano", in: "query", schema: { type: "integer" } },
                ],
                responses: {
                    200: { description: "Lista de filmes" },
                },
            },
            post: {
                tags: ["Filmes"],
                summary: "Cadastrar novo filme",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Filme",
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Filme criado com sucesso" },
                    400: { description: "Erro de validação" },
                },
            },
        },
        "/filmes/{id}": {
            get: {
                tags: ["Filmes"],
                summary: "Buscar filme por ID",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Filme encontrado" },
                    404: { description: "Filme não encontrado" },
                },
            },
            put: {
                tags: ["Filmes"],
                summary: "Atualizar filme",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Filme",
                            },
                        },
                    },
                },
                responses: {
                    200: { description: "Filme atualizado" },
                    400: { description: "Erro ao atualizar" },
                },
            },
            delete: {
                tags: ["Filmes"],
                summary: "Excluir filme",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Filme excluído" },
                    400: { description: "Erro ao excluir" },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            Filme: {
                type: "object",
                properties: {
                    titulo: { type: "string" },
                    descricao: { type: "string" },
                    genero: { type: "string" },
                    anoLancamento: { type: "integer" },
                    duracao: { type: "integer" },
                    imagemUrl: { type: "string", format: "url" },
                },
                required: [
                    "titulo",
                    "descricao",
                    "genero",
                    "anoLancamento",
                    "duracao",
                    "imagemUrl",
                ],
            },
            UserRegister: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    email: { type: "string", format: "email" },
                    senha: { type: "string" },
                },
                required: ["nome", "email", "senha"],
            },
            UserLogin: {
                type: "object",
                properties: {
                    email: { type: "string", format: "email" },
                    senha: { type: "string" },
                },
                required: ["email", "senha"],
            },
        },
    },
};
exports.default = swaggerDocument;
