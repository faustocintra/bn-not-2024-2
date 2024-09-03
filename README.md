# Criação do projeto back-end

Executar no terminal:

npx aka-demy/create-express-app

Perguntas feitas pelo comando:
* Ok to proceed? => y
* Give a name for the app => back-end
* Choose a language => JavaScript
* Choose a template engide => None
* Choose a package manager => npm

# Alterando para a pasta do projeto back-end

no terminal:
cd back-end

# Executando o projeto back-end

npm run dev

# Instalando a biblioteca PRisma

npm instal prisma --save-dev

# Iniciando o prisma

npx prisma init

# (Re)criação do Prisma Client

Toda vez que o arquivo schema.prisma é modificado, é necessário executar o seguinte comando no terminal:

npx prisma generate