<h1 align="center">
  <p>Sistema de autententicação</p>
</h1>
<br>

## 🔥 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- NodeMailer
- Bcryptjs
- ZOD
- JWT
- Sequelize
- Vue.js
- Element-plus
- Axios

## 💻 Instalação

<p> 
  Efetuar a instalação das dependencias utilizando Yarn install ou Npm Install 
</p>
<p>
  Dentro de API, criar um arquivo .env no diretório raiz, para definição das variaveis de ambiente, seguindo o padrão:
</p>

* Conexão com banco de dados: DATABASE_URL
* JWT para autentitcação: JWT_SECRET
* Para envio dos e-mails: EMAIL_FROM (email responsavel pelo envio) e EMAIL_PASS (senha do e-mail responsável pelo envio)

<b>O banco de dados utilizado foi o postgresql, dentro de src -> database, existe o arquivo schema.sql, representando o modelo do banco criado.</b>

<b>
 Rodando o front-end: YARN DEV ou NPM RUN DEV dentro do diretório: API
</b>
</br>
<b>Rodando o back-end: YARN DEV ou NPM RUN DEV dentro do diretório: FE</b>
