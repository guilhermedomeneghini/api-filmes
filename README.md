# API Filmes

## Demonstração online

Acesse a API em produção:
➡️ https://api-filmes-vo0f.onrender.com

Documentação Swagger:
➡️ https://api-filmes-vo0f.onrender.com/api-docs

## Sobre
API RESTful estilo Netflix desenvolvida com Node.js + TypeScript, focada em boas práticas, arquitetura limpa e princípios SOLID.

### Funcionalidades
- 🔐 **Autenticação JWT** com controle de roles (admin/user)
- 🎬 **CRUD completo de filmes** com filtros e paginação
- ✅ **Validação robusta** com Zod
- 🗄️ **Prisma ORM** + PostgreSQL
- 📄 **Documentação automática** com Swagger
- 🧪 **Testes unitários** com Jest (19 testes implementados)
- 🏗️ **Repository Pattern** para separação de responsabilidades
- 🛡️ **Tratamento global de erros** customizado

### Arquitetura
- **Controllers:** Lidam apenas com requisição/resposta
- **Services:** Contêm a lógica de negócio
- **Repository:** Acesso isolado ao banco de dados
- **Middlewares:** Autenticação, autorização e tratamento de erros
- **Validators:** Validação de dados de entrada
- **Tests:** Cobertura completa com testes unitários

## Tecnologias
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Banco:** PostgreSQL
- **Autenticação:** JWT
- **Validação:** Zod
- **Testes:** Jest
- **Documentação:** Swagger

## Variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e edite as variáveis:

```bash
cp .env.example .env
```

## Como rodar

### 1. Clone o repositório
```bash
git clone https://github.com/guilhermedomeneghini/api-filmes
cd api-filmes
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 4. Configure o banco de dados
```bash
npx prisma migrate dev
```

### 5. Inicie o servidor
```bash
npm run dev
```

## Testes

### Rodar todos os testes
```bash
npm test
```

### Rodar testes em modo watch
```bash
npm run test:watch
```

### Cobertura de testes
- **19 testes unitários** implementados
- Cobertura completa dos services
- Testes de sucesso e cenários de erro
- Isolamento entre testes com `beforeEach`

## Endpoints

### Autenticação
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/login` - Login de usuário

### Filmes
- `GET /filmes` - Listar filmes (com filtros e paginação)
- `POST /filmes` - Criar filme (admin)
- `GET /filmes/:id` - Buscar filme por ID
- `PUT /filmes/:id` - Atualizar filme (admin)
- `DELETE /filmes/:id` - Deletar filme (admin)

## Estrutura do projeto
```
src/
├── config/          # Configurações (Prisma)
├── controllers/     # Controladores da API
├── middlewares/     # Middlewares (auth, error handling)
├── models/          # Interfaces TypeScript
├── repository/      # Acesso ao banco (Repository Pattern)
├── routes/          # Definição das rotas
├── services/        # Lógica de negócio
├── tests/           # Testes unitários
├── utils/           # Utilitários e classes de erro
└── validators/      # Validação com Zod
```

## Princípios SOLID aplicados

- ✅ **S** - Single Responsibility: Cada classe tem uma responsabilidade
- ✅ **O** - Open/Closed: Fácil extensão sem modificar código existente
- ✅ **L** - Liskov Substitution: Repository pattern permite troca de implementação
- ✅ **I** - Interface Segregation: Services e controllers bem segregados
- ✅ **D** - Dependency Inversion: Dependências baseadas em abstrações

## Autor
- [Guilherme Walmeling](https://github.com/guilhermedomeneghini)
