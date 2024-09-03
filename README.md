# Criação do projeto back-end
 
Executar no terminal:
 
    npx aka-demy/create-express-app
 
Perguntas feitas pelo comando:
*  OK to proceed? ~~> y
*  Give a name for the app ~~>  back-end
*  Choose a language ~~>  JavaScript
*  Choose a template engine ~~>  None
*  Choose a package manager ~~>  npm
 
# Alterando para a pasta do projeto back-end
 
No terminal:
 
    cd back-end
 
# Executando o projeto back-end
 
No terminal:
 
    npm run dev
 
# Instalando a biblioteca Prisma
 
No terminal:
    npm install prisma --save-dev
 
# Inicialização do Prisma
No terminal:
    npx prisma init
 
# (RE)criação do Prisma Client
Toda vez que o  arquivo schema.prisma é modificado, é necessário executar o seguinte comando
No terminal:
    npx prisma generate