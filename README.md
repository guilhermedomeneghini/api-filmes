# API Filmes

## Demonstração online

Acesse a API em produção:
➡️ https://api-filmes-vo0f.onrender.com

Documentação Swagger:
➡️ https://api-filmes-vo0f.onrender.com/api-docs

## Sobre
Projeto simples para praticar conceitos de backend, autenticação, validação e integração com banco de dados.

- Cadastro, login e autenticação de usuários
- CRUD de filmes
- Estrutura modular (controllers, services, middlewares, etc.)
- Validação com Zod
- Prisma ORM + PostgreSQL
- Documentação Swagger em `/api-docs`

> **Atenção:** O diretório `repository` está vazio (ainda não implementado).

## Variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e edite as variáveis conforme necessário:

```
cp .env.example .env
```

As variáveis disponíveis são:
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`

## Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/guilhermedomeneghini/api-filmes
   cd api-filmes
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o ambiente:
   - Copie o arquivo `.env.example` para `.env` e ajuste as variáveis.
4. Rode as migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Autor
- [Guilherme Walmeling](https://github.com/guilhermedomeneghini)
