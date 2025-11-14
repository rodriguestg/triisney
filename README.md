🎬 Triisney API

API Node.js + Express + Firebase Firestore, criada como solução para um teste técnico envolvendo autenticação, CRUD de filmes, integração com API externa (OMDb) e testes automatizados (Jest + Supertest).
Inspirada na junção dos temas Disney + Triibo, nasce a Triisney API — um sistema simples, sólido, testado e preparado para rodar em qualquer ambiente com Docker.

📌 1. Sobre o Teste Técnico

Este projeto foi desenvolvido como parte de um desafio técnico com os seguintes requisitos:

✔ Autenticação de usuários

Registro com senha criptografada

Login com JWT

Middleware de autenticação

✔ CRUD completo de filmes

Criação, listagem, edição e remoção

Cada filme é enriquecido com dados reais da OMDb API

✔ Integração externa

Consulta automática ao OMDb para preencher metadados do filme

✔ Testes automatizados

Testes de integração com Jest + Supertest

Firebase Firestore totalmente mockado (sem usar emulator)

OMDb mockado com jest.unstable_mockModule

✔ Docker

API preparada para rodar em qualquer máquina via contêiner

Build simples, leve e sem dependências locais

📌 2. Tecnologias Utilizadas
Área	Stack
Back-end	Node.js, Express
Banco	Firebase Firestore
Autenticação	JWT + Bcrypt
Integração externa	OMDb API
Testes	Jest, Supertest, ESM Mocking
Infra	Docker & Docker Compose
📌 3. Estrutura do Projeto
src/
  app.js
  routes/
    auth.routes.js
    movie.routes.js
  controllers/
    auth.controller.js
    movie.controller.js
  services/
    auth.service.js
    movie.service.js
  config/
    firebase.js
    omdbApi.js
test/
  auth.test.js
  movie.test.js
  mocks/
    firestore.mock.js
    omdb.mock.js
  utils/
    test.helpers.js
Dockerfile
docker-compose.yml
README.md

🚀 Como Rodar o Projeto
🔧 1. Instale dependências
npm install

🔧 2. Configure variáveis de ambiente

Crie um arquivo .env:

PORT=3000
JWT_SECRET=seu-token-jwt
OMDB_API_KEY=sua-chave-omdb


Para Firebase:

Crie um arquivo firebase-service-account.json (na raiz do projeto com suas credenciais de conta de serviço do Firebase):

{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}

🐳 4. Rodando com Docker (sem alterar código)
▶ Construir a imagem
docker build -t triisney-api .

▶ Rodar o contêiner
docker run -p 3000:3000 --env-file .env triisney-api

✔ Totalmente funcional


🧪 Testes Automatizados
Rodar todos os testes:
npm test

Sobre os testes:

Não dependem do Firebase real

Não fazem chamada externa real à OMDb

Tudo é mockado com:

firestore.mock.js

omdb.mock.js

jest.unstable_mockModule

Supertest sobe o Express real e simula requisições HTTP

📚 Endpoints
🔐 Autenticação
Método	Rota	Descrição
POST	/auth/register	Registra usuário
POST	/auth/login	Retorna JWT
🎬 Filmes
Método	Rota	Protegida?	Descrição
GET	/movies	❌	Lista filmes
GET	/movies/:id	❌	Detalhes
POST	/movies	✔	Cria novo filme
PUT	/movies/:id	✔	Atualiza filme
DELETE	/movies/:id	✔	Remove filme

Obs.:

- Endpoints protegidos requerem header Authorization: Bearer <token> retornado no login.
- Endpoints auth e movies requerem um body com as informações necessárias em JSON.
- Para criação de filmes é necessário enviar no body um JSON com ao menos { "title": "Nome do Filme no Original em Inglês" }.

AUTH:
 {
  name: "",
  email: "",
  password: ""
 }

🏁 Finalizando (A)

A Triisney API foi construída para demonstrar domínio em:

JavaScript, Node.js, Express e Axios.

Arquitetura de API moderna

Integração com serviços externos

Firebase

Docker

Testes automatizados profissionais com Jest

Boas práticas de código e organização

É um projeto limpo, claro e pronto para ser avaliado tecnicamente.