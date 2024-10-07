import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    const { data_hora, num_venda, cliente_id, itens } = req.body;

    // Verifique se pelo menos dois itens foram fornecidos
    if (!itens || itens.length < 2) {
      return res.status(400).json({ message: "É necessário fornecer pelo menos dois itens." });
    }

    // Criação da venda
    const venda = await prisma.venda.create({
      data: {
        data_hora: new Date(data_hora), // Converte a string para Date
        num_venda, // Inclui num_venda
        cliente: { connect: { id: cliente_id } }, // Conecta o cliente
        itens: {
          create: itens.map((item, index) => ({
            num_item: index + 1, // Atribui um número sequencial
            quantidade: item.quantidade,
            produto: { connect: { id: item.produto_id } } // Conecta o produto
          }))
        }
      }
    });

    // Responde com status 201 e os dados da venda criada
    res.status(201).json(venda);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao criar venda." });
  }
};




controller.retrieveAll = async function(req, res) {
  try {
    // Busca as vendas e inclui os clientes e itens de venda
    const result = await prisma.venda.findMany({
      orderBy: [{ data_hora: 'asc' }],
      include: {
        cliente: true, // Inclui o cliente
        itens: { // Inclui os itens da venda
          include: {
            produto: true // Inclui os produtos dos itens
          }
        }
      }
    });

    // Retorna as vendas com status 200
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao recuperar vendas." });
  }
};

controller.retrieveOne = async function(req, res) {
  try {
    
    const include = includeRelations(req.query) 

    // Manda buscar o documento no servidor usando
    // como critério de busca um id informado no
    // parâmetro da requisição
    const result = await prisma.venda.findUnique({
      where: { id: req.params.id },
      include
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    // Busca o documento pelo id passado como parâmetro e, caso
    // o documento seja encontrado, atualiza-o com as informações
    // passadas em req.body
    const result = await prisma.venda.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.updateItem = async function(req, res) {
  const { itemId, id } = req.params; // Obtém os parâmetros da requisição

  try {
    // Atualiza o item da venda
    await prisma.itemVenda.update({
      where: {
        id: itemId,
        venda_id: id // Verifica se o item pertence à venda
      },
      data: req.body // Dados para atualizar
    });

    // Se a atualização for bem-sucedida, retorna o código 204
    res.status(204).end();
  } catch (error) {
    console.error(error);
    
    // Verifica se o erro é porque o item ou a venda não foram encontrados
    if (error.code === 'P2025') {
      res.status(404).send({ message: "Item ou venda não encontrado." });
    } else {
      res.status(500).send({ message: "Erro ao atualizar item da venda." });
    }
  }
};



controller.delete = async function(req, res) {
  const { id } = req.params;

  try {
    // Primeiro, excluir todos os itens de venda associados
    await prisma.itemVenda.deleteMany({
      where: { venda_id: id }
    });

    // Em seguida, excluir a venda
    await prisma.venda.delete({
      where: { id }
    });

    res.status(204).end();
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end(); // Venda não encontrada
    } else {
      console.error(error);
      res.status(500).send(error);
    }
  }
};

/***************************************************************/

controller.createItem = async function(req, res) {
  const { id } = req.params; // ID da venda
  const { produto_id, quantidade } = req.body; // Dados do item a ser inserido

  try {
    // Verifica se a venda existe
    const vendaExistente = await prisma.venda.findUnique({
      where: { id },
      include: { itens: true } // Inclui os itens para contar
    });

    if (!vendaExistente) {
      return res.status(404).send({ message: "Venda não encontrada." });
    }

    // Verifica se o produto existe
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produto_id },
    });

    if (!produtoExistente) {
      return res.status(404).send({ message: "Produto não encontrado." });
    }

    // Criação do novo item de venda
    const novoItem = await prisma.itemVenda.create({
      data: {
        num_item: vendaExistente.itens.length + 1, // Gera número sequencial
        quantidade,
        produto: { connect: { id: produto_id } }, // Conectar ao produto existente
        venda: { connect: { id } } // Conectar à venda existente
      }
    });

    // Retorna o novo item de venda com status 201
    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    
    // Verifica se o erro é porque a venda ou o produto não foram encontrados
    if (error.code === 'P2025') {
      res.status(404).send({ message: "Venda ou produto não encontrado." });
    } else {
      res.status(500).send({ message: "Erro ao adicionar item à venda." });
    }
  }
};


controller.retrieveAllItems = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    // Manda buscar os dados no servidor
    const result = await prisma.itemVenda.findMany({
      where: { venda_id: req.params.id },
      orderBy: [ { num_item: 'asc' } ],
      include
    })

    // HTTP 200: OK
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOneItem = async function(req, res) {
  try {

    // A rigor, o item da venda poderia ser encontrado apenas por
    // seu id. No entanto, para forçar a necessidade da associação
    // de um item de venda à venda correspondente, a busca é feita
    // usando-se tanto o id do item da venda quanto o id da venda
    const result = await prisma.itemVenda.findFirst({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      }
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

export default controller