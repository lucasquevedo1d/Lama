<!-- ![Screenshot_1](https://user-images.githubusercontent.com/45580434/79641791-06e1c100-8170-11ea-8ecf-b6c889805d55.png) -->
<br>

# Labenu Music Awards

<br>

### Sobre o projeto: 
**LAMA**, *Labenu Musical Awards*, um festival  com várias bandas famosas, 

### CADASTRO 
O usuário precisa preencher os campos: nome, email, password e role para realizar o cadastro. É necessário o preenchimento de todos os campos para a finalização da função. Aqui, o id é gerado automático e a senha é criptografada.
<br>

### LOGIN
O usuário precisa preencher os campos email e password para realizar o login. O email precisa ter o formato correto, contendo um @, e o password informado no momento do login precisa ser o mesmo que foi informado ao realizar o cadastro, caso contrário, não conseguirá logar.
<br>

### CADASTRO DE BANDAS
Para realizar o cadastro de uma banda, é necessário preencher os campos: nome, gênero musical e a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). 
Não é possível cadastrar uma banda que tenha o mesmo nome de outra cadastrada anteriormente, e somente usuários com role ADMIN podem registrar bandas.
<br>

### VISUALIZAR DETALHES SOBRE A BANDA
Para visualizar detalhes sobre a banda, é necessário passar o id da banda por path params, além de ser necessário estar logado.
<br>

### ADICIONAR UM SHOW A UM DIA
Para adicionar um show a um dia da semana(sendo disponíveis friday, saturday e sunday), e é necessário indicar um horário válido(entre 08h e 23h), além de ser necessário estar logado.
<br>

### VISUALIZAR TODOS OS SHOWS DE UMA DATA
É possível visualizar todos os shows que serão realizados em um dia específico, e ordenados por horário. 
<br>

### CRIAR UM INGRESSO
Para realizar a criação de um ingresso, é necessário ser role ADMIN e estar logado, e preencher os campos: name, price, id do evento que o ingresso está relacionado.
<br>

### COMPRAR INGRESSO
Para realizar a compra de um ingresso, é necessário passar o nome do ingresso e a quantidade.
<br>

### ADICIONAR FOTO
Para adicionar uma foto do evento, é necessário estar logado, passar por body da requisição o id do show que a foto está relacionada e a url da photo.
<br>

### PEGAR TODAS AS FOTOS
Para visualizar todas as fotos de um determinado show, é necessário passar por path params o id do show que deseja visualizar as imagens correspondentes.
<br>


## Tecnologias utilizadas:
- Node.js
- Typescript
- MYSQL
- Programação Orientada à Objetos
- Postman
- Git
<br>
<br>

## Linguagens e libs utilizadas:
- Typescript
- mysql
- dotenv
- express
- knex
- bcryptjs
- uuid
- jsonwebtoken
- moment
<br>
<br>

### Conhecimentos adquiridos durante o desenvolvimento do projeto:
- Integração com banco de dados externo.
- Requisições API Rest.
- Sistema de Autenticação e Autorização.
- Criptografia e geração de tokens contendo informações sensíveis.
<br>
<br>

### Como rodar a aplicação:
- Clone o projeto no terminal utilizando o git clone;
- Na pasta do projeto, instale as dependências com o comando npm install;
- Crie um arquivo .env com as configurações do seu banco de dados(preferencialmente MySQL, que foi o banco de dados utilizado no projeto);
- No arquivo .env, deverá ficar dessa forma:

```
DB_HOST = seu_endereço_host
DB_USER = seu_usuário
DB_PASSWORD = sua_senha
DB_SCHEMA = seu_banco_de_dados
JWT_KEY = chave_jwt
```

- Por fim, execute a aplicação rodando o comando npm start, ou npm run start para deixar o projeto rodando o tempo todo.
OBSERVAÇÃO: você pode testar os endpoints em um arquivo request.rest ou através de um cliente HTTP (ex: postman), utilizando o endereço ... como URL padrão para as requisições. Para obter informações de cada endpoint, consulte a documentação.
<br>


