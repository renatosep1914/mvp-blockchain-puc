//API meus usuário vão interagir com a minha blockchain - mineradores
const express = require('express');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;//rodar o servidor nesta porta
//$ HTTP_PORT = 3002 npm rund dev

const app = express();
const bc = new Blockchain();

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));