/*
    Função que processa a query string da requisição e verifica se
    o parâmetro include foi passado. Caso positivo, preenche um objeto 
    com os relacionamentos que debem ser incluídos na consulta sendo executada.
*/

function includeRelations(query) {
    //Por padrão, não inclui nenhum relacionamento
    const include = {}

    //Se o parâmetro include estiver na query string
    if (query.includes){
        //Recorta o valor do parâmetro,separando os
        // relacionamento passados por virgula
        const relations = query.includes.split(',');
        
        //preenche o includes com as relações informadas
        for(let rel of relations){
            include[rel] = true
        }
    }
    return include
}

export { includeRelations }