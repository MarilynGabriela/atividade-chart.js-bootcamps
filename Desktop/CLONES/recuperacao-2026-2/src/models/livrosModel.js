var database = require("../database/config");

function listar() {

    var instrucaoSql = `
        select 
livro.id,
livro.titulo,
livro.precoCompra,
livro.precoVenda,
livro.qtdeEstoque,
autor.nome as nomeAutor,
genero.nome as nomeGenero
 from livro join autor on autor.id = livro.fkAutor join genero on genero.id = livro.fkGenero;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function cadastrar(titulo, fkAutor, fkGenero, precoCompra, precoVenda, qtdeEstoque) {/* */

    var instrucaoSql = `
        INSERT INTO livro (titulo, fkAutor, fkGenero, precoCompra, precoVenda, qtdeEstoque) VALUES ('${titulo}', '${fkAutor}', '${fkGenero}', '${precoCompra}', '${precoVenda}', '${qtdeEstoque}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(novoPrecoCompra, novoPrecoVenda, novoqtdeEstoque, id) {

    var instrucaoSql = `
        UPDATE livro 
        SET precoCompra = '${novoPrecoCompra}', 
            precoVenda = '${novoPrecoVenda}',
            qtdeEstoque = '${novoqtdeEstoque}',
        WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    cadastrar,
    editar
}
