# Criação do projeto back-end

Executar no terminal:

Perguntas feitas pelo comando:
* Ok to proceeed? ~> y
* Give a name for the app ~> back-end
* Choose a language ~> JavaScript
* Choose a template engine ~> None
* Choose a package manager ~> npm

# Alterando para a pasta do projeto back-end

No terminal:

cd back-end

# Executando o projeto back-end

npm run dev

# Instalando a biblioteca Prisma

npm install prisma --save-dev

# Inicialização do Prisma

npx prisma init

# (Re)criação do Prisma Client

Toda vez que o arquivo schema.prisma é modificado, é necessário executar o seguinte comando no terminal:

npx prisma generate