# 🎬 Triisney API

API Node.js + Express + Firebase Firestore, criada como solução para um teste técnico envolvendo autenticação, CRUD de filmes, integração com API externa (OMDb) e testes automatizados (Jest + Supertest).

Inspirada na junção dos temas **Disney + Triibo**, nasce a **Triisney API** — um sistema simples, sólido, testado e preparado para rodar em qualquer ambiente com Docker.

---

## 📌 1. Sobre o Teste Técnico

Este projeto foi desenvolvido como parte de um desafio técnico com os seguintes requisitos:

### ✔ Autenticação de Usuários
- Registro com senha criptografada  
- Login com JWT  
- Middleware de autenticação  

### ✔ CRUD completo de filmes
- Criar, listar, editar e remover filmes  
- Cada filme é enriquecido com dados reais da OMDb API  

### ✔ Integração externa
- Consulta automática ao OMDb para preencher metadados do filme  

### ✔ Testes automatizados
- Testes de integração com **Jest + Supertest**  
- Firebase completamente mockado (sem emulator)  
- OMDb mockado com `jest.unstable_mockModule`  

### ✔ Docker
- Ambiente 100% funcional  
- Build leve e sem dependências locais  

---

## 📌 2. Tecnologias Utilizadas

| Área | Stack |
|------|-------|
| **Back-end** | Node.js, Express |
| **Banco** | Firebase Firestore |
| **Autenticação** | JWT + Bcrypt |
| **Integração externa** | OMDb API |
| **Testes** | Jest, Supertest, ESM Mocking |
| **Infra** | Docker & Docker Compose |

-----

## 📌 3. Estrutura do Projeto

A estrutura de pastas foi organizada para separar responsabilidades (MVC + Services), facilitando a manutenção e os testes.

```
/triisney/
├── src/
│   ├── app.js               (Inicializador do Express e Middlewares)
│   ├── server.js            (Ponto de entrada do servidor Node.js)
│   ├── routes/
│   │   ├── auth.routes.js   (Rotas de autenticação)
│   │   └── movie.routes.js  (Rotas do CRUD de filmes)
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── movie.controller.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── services/
│   │   ├── auth.service.js  (Lógica de negócios de autenticação)
│   │   └── movie.service.js (Lógica de negócios de filmes)
│   └── config/
│       ├── firebase.js      (Configuração do Firebase)
│       └── omdbApi.js       (Configuração do Axios para OMDb)
├── test/
│   ├── auth.test.js         (Testes de integração de autenticação)
│   ├── movie.test.js        (Testes de integração de filmes)
│   ├── mocks/
│   │   ├── firestore.mock.js (Mock do Firestore)
│   │   └── omdb.mock.js      (Mock do serviço OMDb)
│   └── utils/
│       └── test.helpers.js  (Funções auxiliares para testes)
├── .env.example             (Arquivo de exemplo para variáveis de ambiente)
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── firebase-service-account.example.json
├── package.json
└── README.md
```
-----

## 🚀 4. Como Rodar o Projeto

### 🔧 4.1. Instale as dependências

```bash
npm install
```

### 🔧 4.2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e preencha com suas chaves:

```.env
PORT=3000

# Gere uma chave longa e aleatória (ex: com openssl rand -hex 32)
JWT_SECRET=seu-token-jwt-super-secreto

# Chave da OMDb API (http://www.omdbapi.com/apikey.aspx)
OMDB_API_KEY=sua-chave-omdb
```

### 🔥 4.3. Configure o Firebase

Crie um arquivo `firebase-service-account.json` na raiz do projeto com as credenciais de **Conta de Serviço (Service Account)** do seu projeto Firebase/Google Cloud:

```json
{
  "type": "service_account",
  "project_id": "seu-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-...@...gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### ▶ 4.4. Rode o projeto

Após configurar, inicie o servidor em modo de desenvolvimento (com Nodemon):

```bash
npm run dev
```

-----


## 🐳 5. Rodando com Docker

Se você tiver o Docker e o Docker Compose instalados, pode rodar o projeto sem instalar o Node.js localmente.

### ▶ 5.1. Construir a imagem

```bash
docker build -t triisney-api .
```

### ▶ 5.2. Rodar o contêiner

Este comando injeta o arquivo `.env` local no contêiner:

```bash
docker run -p 3000:3000 --env-file .env triisney-api
```

-----

## 🧪 6. Testes Automatizados

O projeto utiliza **testes de integração** que validam o fluxo completo da API (Request -\> Response), mas **sem depender de serviços externos** (Firebase ou OMDb).

### ▶ Rodar todos os testes

```bash
npm test
```

### Sobre os testes:

  * Não dependem de uma conexão real com o Firebase.
  * Não fazem chamadas HTTP reais à OMDb.
  * O banco de dados do Firebase é 100% mockado usando `firestore.mock.js`.
  * A API OMDb é mockada usando `jest.unstable_mockModule` para simular respostas.
  * O **Supertest** sobe uma instância real do servidor Express e simula requisições HTTP para validar o comportamento dos endpoints.

-----

## 📚 7. Endpoints

### 🔐 Autenticação

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Registra um novo usuário (Nome, Email, Senha). |
| `POST` | `/auth/login` | Efetua o login (Email, Senha) e retorna um JWT. |

### 🎬 Filmes

| Método | Rota | Protegida? | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/movies` | ❌ | Lista todos os filmes da coleção. |
| `GET` | `/movies/:id` | ❌ | Busca detalhes de um filme específico. |
| `POST` | `/movies` | ✔ | Cria um novo filme (requer token). |
| `PUT` | `/movies/:id` | ✔ | Atualiza um filme (requer token). |
| `DELETE` | `/movies/:id` | ✔ | Remove um filme (requer token). |

#### Observações:

  * Endpoints protegidos (✔) requerem o header: `Authorization: Bearer <token>`.
  * Para criação de filmes, é necessário enviar no body um JSON com ao menos `{ "title": "Nome do Filme no Original em Inglês" }`. O serviço buscará o restante dos dados na OMDb.
  * O body de registro (`/auth/register`) espera o seguinte JSON:

<!-- end list -->

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senhaforte123"
}
```

-----

## 🏁 8. Finalizando

A Triisney API foi construída para demonstrar domínio em:

  * JavaScript, Node.js, Express, Axios e Docker.
  * Arquitetura de API moderna (MVC + Services).
  * Integração com serviços externos (Firebase e OMDb).
  * Autenticação segura com JWT e Bcrypt.
  * Infraestrutura e deploy com Docker.
  * Testes automatizados profissionais com Jest (Mocking e Supertest).
  * Boas práticas de código, organização e documentação.

É um projeto limpo, claro e pronto para ser avaliado tecnicamente.


