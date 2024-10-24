const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require("path")

const app = express();

// Permitindo o uso de JSON
app.use(express.json());

const port = 3000;


// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'casadamusica'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});


// Configuração do EJS e Bootstrap
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');


// Página inicial - listar alunos
app.get('/', (req, res) => {
  let sql = 'SELECT * FROM alunos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('alunos', { alunos: results });
  });
});

// Inserir aluno
app.post('/add', (req, res) => {
  const {  nome, cpf_cnpj, telefone, email, data_nasc, idade, sexo, cor, docu_resp, nome_resp, cep,
          endereco, numero, bairro, cidade, estado, complemento, obs } = req.body;
  const sql = `INSERT INTO alunos (nome, cpf_cnpj, telefone, email, data_nasc, idade, sexo, cor, docu_resp,       nome_resp,cep, endereco, numero, bairro, cidade, estado, complemento, obs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, cpf_cnpj, telefone, email, data_nasc, idade, sexo, cor, docu_resp, nome_resp, cep,
                endereco, numero, bairro, cidade, estado, complemento, obs], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});




// Atualizar aluno
app.post('/update/:idaluno', (req, res) => {
  const { idaluno } = req.params;
  const { nome, cpf_cnpj, telefone, email, data_nasc, idade, sexo, cor, docu_resp, nome_resp, cep,
          endereco, numero, bairro, cidade, estado, complemento, obs } = req.body;

  const sql = `UPDATE alunos SET nome = ?, cpf_cnpj = ?, telefone = ?, email = ?, data_nasc = ?, idade = ?,
               sexo = ?, cor = ?, docu_resp = ?, nome_resp = ?, cep = ?, endereco = ?, numero = ?,
               bairro = ?, cidade = ?, estado = ?, complemento = ?, obs = ? WHERE idaluno = ?`;
  db.query(sql, [nome, cpf_cnpj, telefone, email, data_nasc, idade, sexo, cor, docu_resp, nome_resp, cep,
                 endereco, numero, bairro, cidade, estado, complemento, obs, idaluno], (err, result) => {
  if (err) throw err;
    res.redirect('/');
  });
});

// Excluir aluno
app.get('/delete/:idaluno', (req, res) => {
  const { idaluno } = req.params;
  const sql = `DELETE FROM alunos WHERE idaluno = ?`;
  db.query(sql, [idaluno], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
