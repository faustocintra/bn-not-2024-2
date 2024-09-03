# bn-not-2024-2
Repositório da disciplina Banco de Dados - Não Relacional, 3º semestre DSM Fatec Franca 2024/2
DÍMERSON FERREIRA
NATHAN BIZINOTO
PAULO HENRIQUE DE ANDRADE
VINÍCIUS RODRIGUES

# Criação do Projeto de Back-end

# Executar no terminal:

npx aka-deny/create-express-app

Perguntas feitas no commando:
* ok tyo proceeed > y
* Give a nane for the app > back-end
* Choose a language> Javascript
* Choose a template engine > nome
* Choose a package manager > npm

# Alterando para a pasta no terminal
cd back-end

# Executando o projeto back-end

executar npm dev   => localhost:8080

# Instalando a biblioteca do Prima
npm install prisma --save-dev

# Inicialização do Prima
npx prisma init

# Instalar as extensões do prisma (VSCODE)
Na pesquisa primeira opção: 
Adds syntax highlighting, formatting, auto-completion, jump-to-definition and linting for .prisma files.

# (Re)criação do prisma Cliente

Toda vez que o arquivo schema.prima é modificado, é necessário executar o seguinte comando no prompt.

npx prisma generate

# executar 
npm run dev