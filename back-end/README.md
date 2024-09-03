# Criação do projeto Back_End

Executar no terminal:

npx aka-demy/create-express-app

Perguntas feitas pelo comando:
* Ok to procced? ~> y
* Give a name for the app ~> back-end
* Choose a language ~> JavaScript
* Choose a template engine ~> None
* Chose a package manager ~> npm

# Aternando para a pasta do projeto back-end

No terminal:

cd back-end

# Executando o projeto back-end

npm run dev

# Instalando a biblioteca Prisma

npm install prisma --save-dev

# Inicialização do prisma

npx prisma init 

# Recriação do prisma Client

Toda vez que o arquivo schema prisma é modificado é necessário executar o seguinte comando no terminal

npx prisma generate