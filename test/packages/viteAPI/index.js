const assert = require('assert');

import ViteAPI from '../../../src/viteAPI/index';
import Provider from '../../../src/viteAPI/provider';
import HTTP_RPC from '../../../src/HTTP';
import { encodeFunctionSignature } from '../../../src/abi/index';

const httpServer = new HTTP_RPC();
const myViteAPI = new ViteAPI(httpServer, () => {
    it('connected callback', function () {
        assert.equal(true, true);
    });
});

it('extends of ViteAPI/Provider', function () {
    assert.equal(myViteAPI instanceof Provider, true);
});

describe('ViteAPI addTxType', function () {
    const abi = { methodName: 'hello', inputs: [] };
    const contractAddress = 'vite_0000000000000000000000000000000000000003f6af7459b9';

    myViteAPI.addTransactionType({ helloWorld: { contractAddress, abi }});
    const signFunc = encodeFunctionSignature(abi);
    const key = `${ signFunc }_${ contractAddress }`;

    it('isHaveTxType', function () {
        assert.equal(myViteAPI.transactionType[key].transactionType, 'helloWorld');
    });
});
