const {Client} = require('pg');

const conexao = {
    host:"localhost",
    port: 5432,
    database:"Crud_Api",
    user: "postgres",
    password:"2996"
}

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM Livros");
    const listaclientes = result.rows;
    await client.end();
    return listaclientes;
}

async function buscarPorId(id){
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM Livros WHERE id = $1",[id]);
    const livros = result.rows;
    await client.end();
    return livros; 
}

async function inserir(livro) {
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('INSERT INTO clientes (nome,autor,editora,isbn,data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [livro.nome, livro.autor, livro.editora,livro.isbn,livro.data]);
    const livros = result.rows[0];
    await client.end();
    return livros; 
}

async function atualizar(id, livro) {
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query('UPDATE clientes SET nome= $1 ,autor= $2 ,editora=$3 ,isbn=$4 ,data=$5 WHERE id=$6 RETURNING *',
    [livro.nome, livro.autor, livro.editora,livro.isbn,livro.data,id]);
    const livros = result.rows[0];
    await client.end();
    return livros; 
}
async function BuscarLikeName(livros){
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('SELECT nome FROM Livros WHERE nome = $1 RETURNING *',[livros.nome])
    const livro = result.rows[0];
    await client.end();
    return livro;
}
async function deletar(id) {
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('DELETE FROM Livros WHERE id = $1 RETURNING *',[id]);
    const livro = result.rows[0];
    await client.end();
    return livro; 
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    BuscarLikeName
}