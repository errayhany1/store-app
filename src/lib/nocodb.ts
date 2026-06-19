import { Api } from 'nocodb-sdk';

// Lazy singleton — environment variables are only read at runtime (request time),
// NOT at build time. This prevents Coolify/Docker build failures when env vars
// are not available during the image build stage.
let _noco: Api<unknown> | null = null;

export function getNoco(): Api<unknown> {
    if (_noco) return _noco;

    const NOCODB_URL = process.env.NOCODB_URL;
    const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN;

    if (!NOCODB_URL || !NOCODB_API_TOKEN) {
        throw new Error('Missing NOCODB_URL or NOCODB_API_TOKEN environment variables');
    }

    _noco = new Api({
        baseURL: NOCODB_URL,
        headers: { 'xc-token': NOCODB_API_TOKEN },
    });

    return _noco;
}

// Keep the named export for backward compatibility with existing imports
export const noco = new Proxy({} as Api<unknown>, {
    get(_target, prop) {
        return (getNoco() as any)[prop];
    },
});
