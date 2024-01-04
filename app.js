const express = require('express')

const livroRouter = require('./route/livros_route');
const clienteRouter = require('./route/cliente_route')
const emprestimoRouter = require('./route/emprestimo_route')
const app = express()
const port = 3000
app.use(express.json());



app.get('/', (req, res) => {
  res.send('<h1>Biblioteca</h1>')
})
app.use('/api/livros', livroRouter);
app.use('/api/cliente',clienteRouter);
app.use('/api/emprestimo',emprestimoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})