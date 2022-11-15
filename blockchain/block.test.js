const Block = require('./block');

//const {DIFFICULTY} = require('../config');
    
describe('Block', () => {

        let data, lastBlock, block;

        beforeEach(() => {
            data = 'index.html';
            lastBlock = Block.genesis();
            block = Block.mineBlock(lastBlock, data);
        });

    it('set the  `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });
    
    it('set the  `lastHash` to match the hasj of the last Block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        
    });

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1); //1h        
    });

    it('raises the difficulty for quickly mined blocks', () => {

        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1);//1 mili segundo
    });




});