const {Client} = require('pg');

const conexao = {
    host:"localhost",
    port: 5432,
    database:"Biblioteca",
    user: "postgres",
    password:"2996"
}
let matricula = 2023000
function geraMatricula(){
    return matricula++;
}
async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM Clientes");
    const listaclientes = result.rows;
    await client.end();
    return listaclientes;
}

async function buscarPorId(id){
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM Clientes WHERE id = $1",[id]);
    // cli e o retorno da busca da querry
    const cli = result.rows[0];
    await client.end();
    return cli; 
}

async function inserir(usuario) {
    usuario.matricula = geraMatricula();
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('INSERT INTO clientes (nome,email,senha,matricula) VALUES ($1, $2, $3, $4) RETURNING *',
    [usuario.nome, usuario.email, usuario.senha,usuario.matricula]);
    const usuarios = result.rows[0];
    await client.end();
    return usuarios; 
}

async function atualizar(id, Usuario) {
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('UPDATE Clientes SET nome= $1 ,email= $2 ,senha=$3 WHERE id=$4 RETURNING *',
    [Usuario.nome, Usuario.email, Usuario.senha,id]);
    const cli = result.rows;
    await client.end();
    return cli; 
}
async function BuscarLikeName(Usuario){
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('SELECT nome FROM Clientes WHERE nome = $1 RETURNING *',[Usuario.nome])
    const cli = result.rows[0];
    await client.end();
    return cli;
}
async function deletar(id) {
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('DELETE FROM Clientes WHERE id = $1 RETURNING *',
    [id]);
    const cli = result.rows[0];
    await client.end();
    return cli; 
}
module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    BuscarLikeName

}