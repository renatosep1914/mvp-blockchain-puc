const { listenerCount } = require('ws');
const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
//$ HTTP_PORT = 3002 P2P_PORT = 5003 PEERS=ws://localhost:5001, ws://localhost:5002 npm run dev
const MESSAGE_TYPES = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
};

class P2pServer{
    constructor(blockchain, transactionPool){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.socket = [];
    }    

    //inicia o nosso servidor
    listen(){
        const server = new Websocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for peer-to-peer connections on:${P2P_PORT}`);
    }
    //ws://localhost:5001
    connectToPeers(){    
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket)); 
        });    
    }

    connectSocket(socket){
        this.socket.push(socket);
        console.log('Socket connected');

        this.messageHandler(socket);
        this.sendChain(socket);

    }

    sendChain(socket){
        socket.send(JSON.stringify({type: MESSAGE_TYPES.chain, chain: this.blockchain.chain}));
    };
    sendTransaction(socket, transaction){
        socket.send(JSON.stringify({type: MESSAGE_TYPES.transaction, transaction}));

    }

    messageHandler(socket){

        socket.on('message', message => {

            const data = JSON.parse(message);
            
            switch(data.type){
                case MESSAGE_TYPES.chain: 
                    this.blockchain.replaceChain(data.chain)
                    break;
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction);
                    break;
            }
            //this.blockchain.replaceChain(data);
        });
    }

    syncChain(){

        this.socket.forEach(socket => this.sendChain(socket));

    }

    broadcastTransaction(transaction){
        this.socket.forEach(socket => this.sendTransaction(socket, transaction));
    }

}

module.exports = P2pServer;