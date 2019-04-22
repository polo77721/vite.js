import IpcProvider from 'provider/IPC_RPC';

const IPC_RPC = new IpcProvider({
    path: '/Users/sisi/viteisbest/vite.ipc',
    timeout: 200
});

let resultCount = 0;
function addResCount() {
    resultCount++;
    if (resultCount === 2) {
        IPC_RPC.disconnect();
    }
}

// IPC_RPC.on('connect', ()=>{
describe('ipc_rpc_notification', function () {
    it('notification_no_method', function (done) {
        const err = IPC_RPC.notification();
        addResCount();
        done(!err);
    });

    it('notification_success', function (done) {
        const err = IPC_RPC.notification('wallet_reloadAndFixAddressFile');
        addResCount();
        done(err);
    });
});
// });