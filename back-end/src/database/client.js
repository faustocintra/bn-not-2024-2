import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // Habilita a exibição de comandos do BD no console
  log: [{ emit: 'event', level: 'query' }]
});

// Coloque o listener do evento fora da configuração do PrismaClient
prisma.$on('query', (event) => {
  // Personaliza a forma como a instrução de BD
  // será exibida no console
  console.log('-'.repeat(40));
  console.log(event.query);
  if (event.params) console.log('PARAMS:', event.params); // Corrigido "paramns" para "params"
  console.log('-'.repeat(40));
});

export default prisma;