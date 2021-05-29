export interface AdapterOptions {
  /**
   * adapter timeout in milliseconds
   * @default 10000
   */
  timeout?: number;
  /**
   * default headers to be included in every request
   */
  headers?: object;
}

export function fetchAdapter(adapterOptions?: AdapterOptions): (url: string, fetchOptions: object) => Promise<Response>;
  