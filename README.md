# API Filmes

API RESTful completa para gerenciamento de filmes, desenvolvida com Node.js, Express, TypeScript e Prisma ORM.

## ✨ Destaques do Projeto

- **Arquitetura profissional**: Separação clara por camadas (controllers, services, models, validators, etc.)
- **Validação robusta**: Uso do Zod para garantir integridade dos dados
- **ORM moderno**: Prisma para integração eficiente com PostgreSQL
- **Documentação clara**: Código limpo, comentado e fácil de entender
- **Pronto para produção**: Suporte a variáveis de ambiente, CORS, e estrutura escalável
- **Docker-ready**: Inclui docker-compose para facilitar setup local

## 🚀 Funcionalidades

- Listagem de filmes com filtros, busca e paginação
- Consulta de filme por ID
- Cadastro de novos filmes com validação
- Edição e exclusão de filmes
- Integração com banco de dados relacional

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validação)
- Docker & Docker Compose

## 📁 Estrutura de Pastas

```
src/
  config/         # Configurações (ex: Prisma)
  controllers/    # Controllers das rotas
  middlewares/    # Middlewares customizados
  models/         # Tipos e interfaces TypeScript
  repository/     # Acesso a dados
  routes/         # Definição das rotas
  services/       # Lógica de negócio
  utils/          # Utilitários
  validators/     # Schemas de validação
```

## ⚡ Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/guilhermedomeneghini/api-filmes
   cd api-filmes
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   - Crie um arquivo `.env` na raiz com a variável `DATABASE_URL` para seu PostgreSQL.
   - Exemplo:
     ```
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/seubanco"
     ```

4. **Rode as migrations do Prisma**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:3000`

## 📚 Exemplos de uso

### Listar filmes
`GET /filmes`

### Buscar filme por ID
`GET /filmes/:id`

### Cadastrar filme
`POST /filmes`
```json
{
  "titulo": "Filme Exemplo",
  "descricao": "Descrição do filme",
  "genero": "Ação",
  "anoLancamento": 2022,
  "duracao": 120,
  "imagemUrl": "https://exemplo.com/imagem.jpg"
}
```

### Editar filme
`PUT /filmes/:id`

### Excluir filme
`DELETE /filmes/:id`

## 💡 Diferencias dessa API

- **Código limpo e modular**: Fácil de manter e escalar
- **Boas práticas de REST**: Verbos HTTP, status codes e validação
- **Pronto para deploy**: Estrutura compatível com ambientes cloud
- **Documentação e exemplos claros**
- **Uso de ferramentas modernas do ecossistema Node.js**

## 👤 Autor

- [Guilherme Walmeling](https://github.com/guilhermedomeneghini)

## 📄 Licença

ISC
