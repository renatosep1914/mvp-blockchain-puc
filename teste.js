const Block = require('./blockchain/block');

const block = new Block('7657', '7as7a7ASAS', '33354568HHH','100' );
console.log(block.toString());
console.log(Block.genesis().toString());
const primeiroBloco = Block.mineBlock(Block.genesis(), '$500');
console.log(primeiroBloco.toString());