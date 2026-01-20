import { Api } from 'nocodb-sdk';

const api = new Api({
    baseURL: 'http://dummy',
    headers: { 'xc-token': 'dummy' }
});

console.log('Keys on api instance:', Object.keys(api));
// Check if dbTableRow exists
console.log('dbTableRow:', (api as any).dbTableRow);
console.log('dbViewRow:', (api as any).dbViewRow);
