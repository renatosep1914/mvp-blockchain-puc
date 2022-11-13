//API meus usuário vão interagir com a minha blockchain - mineradores
const express = require('express');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;//rodar o servidor nesta porta //$ HTTP_PORT = 3002 npm rund dev
const P2pServer = require('./p2p-server');

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(express.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});
//endpoint mineradores
app.post('/mine',(req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New Block added: ${block.toString()}`);

    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();