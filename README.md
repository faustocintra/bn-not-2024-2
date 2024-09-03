# Criação do projeto back-end

Execultar no terminal: 

npx aka-demy/create-express-app

Perguntas feitas pelo comando: 
* Ok to proceed? ~> y
* Give a name for the app ~> back-end
* Choose a language ~> JavaScript
* Choose a template engine ~> None
* Choose a package manager ~> npm

# Alternando para a pasta do back-end

No terminal: 
cd back-end

# Execultando o projeto back-end

npm run dev

# Instalando a biblioteca prisma

npm install prisma --save-dev

# Inicialização do prisma

npx prisma init

# (Re)criação do prisma Cliente

Toda vez que o arquivo schema.prisma é modificado, é necessário execultar o seguinte comando no terminal:

npx prisma generate

