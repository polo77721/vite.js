const config = require('../../rpcConfig.js');

import HTTP_RPC from '../../src/HTTP/index';
import ViteAPI from '../../src/viteAPI/index';
import walletUtils from '../../src/wallet/index';
import Transaction from '../../src/accountBlock/transaction';

export const viteProvider = new ViteAPI(new HTTP_RPC(config.http), () => {
    console.log('Connetct');
});

export const myWallet = walletUtils.getWallet(config.myMnemonic);
const addr1  = myWallet.deriveAddress(0);

export const privateKey = addr1.privateKey;
export const address = addr1.address;
export const addr2  = myWallet.deriveAddress(1);
export const tx = new Transaction(address).setProvider(viteProvider).setPrivateKey(privateKey);
export const tx2 = new Transaction(addr2.address).setProvider(viteProvider).setPrivateKey(addr2.privateKey);

export function SendTXByPreviousAccountBlock(accountBlock, previousAccountBlock) {
    if (previousAccountBlock) {
        return accountBlock.setPreviousAccountBlock(previousAccountBlock).sendByPoW();
    }
    return accountBlock.autoSendByPoW(privateKey);
}

export function sleep(ms) {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}
