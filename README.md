# Criação do projeto back-end

### Executar no terminal:

```bash
npx aka-demy/create-express-app
```

### Perguntas feitas pelo comando:
* Ok to proceed? ~> y
* Give a name for the app ~> back-end
* Choose a language ~> JavaScript
* Choose a tamplate engine ~> None
* Choose a package manager ~> npm

### Executando o projeto back-end

```bash
npm run dev
```

### Instalando a biblioteca Prisma 

```bash
npm install prisma --save-dev
```

### Inicialização do Prisma

```bash
npx prisma init 
```

### (Re)criação do Prisma Client

Toda vez que o arquivo schema.prisma é modificado, é necessário executar o seguinte
comando no terminal:

```bash
npx prisma generate
```