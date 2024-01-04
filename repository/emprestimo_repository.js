const cliente_repository = require ('./cliente_repository')

const {Client} = require('pg');

const conexao = {
    host:"localhost",
    port: 5432,
    database:"Biblioteca",
    user: "postgres",
    password:"2996"
}


const dataAtual = new Date();
const ano = dataAtual.getFullYear();  // Obtém o ano (ex: 2023)
const mes = dataAtual.getMonth() + 1; // Obtém o mês (0 a 11, portanto, adicione 1 para obter o mês atual)
const dia = dataAtual.getDate();       // Obtém o dia do mês
const dataAluguel = (dia+"/"+mes+"/"+ano);
const dataDevolucao = (dia+"/"+mes+"/"+ano);

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM emprestimo");
    const listaEmprestimo = result.rows;
    await client.end();
    return listaEmprestimo;
}

async function buscarPorId(id){
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM emprestimo WHERE id_emprestimo = $1",[id]);
    const emprestimo = result.rows[0];
    await client.end();
    return emprestimo; 
}

async function alugar(aluguel){
    const client = new Client(conexao);
    await client.connect()
    const result = await client.query("INSERT INTO Emprestimo (id_cli,id_livro,data_emprestimo,status) VALUES ($1, $2, $3, $4) RETURNING *",
    [aluguel.cli_id, aluguel.livro_id, aluguel.dataAluguel, aluguel.status]);
    const emprestimo = result.rows[0];
    await client.end();
    return emprestimo;

}

async function Devolucao(aluguel){
    aluguel[0].dataDevolucao = dataDevolucao;
    aluguel[0].status = false;
    console.log(aluguel);
    const client = new Client(conexao);
    await client.connect()
    const result = await client.query("UPDATE Emprestimo SET data_devolucao = $1, status = $2 WHERE id_emprestimo = $3 RETURNING *",
    [aluguel[0].dataDevolucao, aluguel[0].status, aluguel[0].id_emprestimo]);
    const emprestimo = result.rows[0];
    await client.end();
    return emprestimo;
}

async function deletar(id) {
    const client= new Client(conexao);
    await client.connect();
    const result= await client.query('DELETE FROM emprestimo WHERE id_emprestimo = $1 RETURNING *',
    [id]);
    const del = result.rows[0];
    await client.end();
    return del; 
}
async function buscarEmprestimo(id){
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query('SELECT * FROM emprestimo WHERE id_livro=$1',[id]);
    const emprestimo = result.rows;
    await client.end();
    return emprestimo; 
}  
async function buscarstatus(id){
    const client= new Client(conexao);
    await client.connect();
    const result = await client.query('SELECT * FROM emprestimo WHERE id_livro=$1 AND status = true',[id]);
    const status = result.rows;
    await client.end();
    return status; 
}  


module.exports={
    buscarPorId,
    alugar,
    Devolucao,
    deletar,
    listar,
    buscarEmprestimo,
    buscarstatus
};