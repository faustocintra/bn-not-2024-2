import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    //Habilita a exibição dos comandos de DB no console
    log: [{ emit: 'event', level: 'query' }]
})

prisma.$on('query', event => {
    //Personaliza a forma como a instrução de BD será exibida no console
    console.log('-'.repeat(40))
    if(event.params) console.log('PARAMS:', event.params)
    console.log('-'.repeat(40))
})

export default prisma