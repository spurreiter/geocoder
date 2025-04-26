/**
 * @param {AdapterOptions} [opts]
 * @returns {fetchAdapterFn}
 */
export function fetchAdapter(opts?: AdapterOptions): fetchAdapterFn;
export class Response {
    /**
     * @param {object} param0
     * @param {number} param0.statusCode
     * @param {string} param0.statusMessage
     * @param {any[]} [param0.redirectUrls]
     * @param {object} param0.headers
     * @param {object} param0.body
     */
    constructor({ statusCode, statusMessage, redirectUrls, headers, body, ..._others }: {
        statusCode: number;
        statusMessage: string;
        redirectUrls?: any[] | undefined;
        headers: object;
        body: object;
    });
    status: number;
    statusText: string;
    headers: any;
    body: any;
    redirected: boolean | undefined;
    type: string;
    ok(): boolean;
    text(): Promise<string>;
    json(): Promise<any>;
    formData(): Promise<URLSearchParams>;
}
export type AdapterOptions = import("#types.js").AdapterOptions;
export type fetchAdapterFn = typeof import("#types.js").fetchAdapterFn;
