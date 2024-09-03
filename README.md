# bn-not-2024-2
Repositório da disciplina Banco de Dados - Não Relacional, 3º semestre DSM Fatec Franca 2024/2

# Criação do projeto back-end

Executar no terminal:

npx aka-demy/create-express-app

Perguntas feitas pelo comando:
* Ok to proceed? -y
* Give a name for the app ~> back-end 
* Choose a language ~> JavaScript
* Choose a tamplate engine ~> None
* Choose a package manger ~> npm

# Alternando para a pasta do projeto back-end
No terminal:

cd back-end

# Executando projeto back-end

npm run dev

# Instalando a biblioteca Prisma

npm install prisma --save-dev

# Inicialização do Prima

npx prisma init

# (Re)criação do Prisma Client
Toda vez que o arquivo shema.prisma é modificado, é necessário executar o seguinte comenado no terminal: 

npx prisma generate

