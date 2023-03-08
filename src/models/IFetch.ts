export interface IBaseFetch {
    status: number;
    statusText: string;
    error?: string;
    headers?: {};
    config?: {};
    request?: {};
}

export interface IFetchOptions{
    url: string;
    params: RequestInit;
}

export interface IFetchResponse<T> extends IBaseFetch {
    data: T;
}

export interface IFetchReject extends IBaseFetch {
    error: string;
}

export type TFetchStatus = 'idle' | 'loading' | 'failed' | 'sucess';