# Criando projeo back-end 

npx aka-demy/create-express-app

Perguntas feitas pelo comando: 

    * ok to process ~> y
    * Give a name for the app ~> bac-end 
    * Choose a language ~> JavaScript
    * Choose a template engine ~> None 
    * Choose a package manager ~> NPM

# Alterando para a pasta do projeto back-end

No teminal 

cd back-end

# Excutando projeto back-end

npm run dev 

# instalando a blibioteca Prisma 

npm install prisma --save-dev

# iiciaização do Prisma 

npx prisma init 

# (re)criação do prisma Client
Toda vez que o arquivo schema.pisma é modificado, é necessario excecutar o 
seginte comando no  terminal: 

npx prisma generate 