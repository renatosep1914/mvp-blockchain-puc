const EC = require('elliptic').ec;
const uuidV1 = require('uuid');
const ec = new EC('secp256k1');//secp256k1 algoritmo de curva elíptica - "EC" se comporta como uma classe, por isso dessa instância

class ChainUtil{

    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){

        return uuidV1.v1;
    }

}


module.exports = ChainUtil;