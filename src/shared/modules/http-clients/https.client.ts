import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const config: AxiosRequestConfig = {};

@Injectable()
export class HttpClient {
    public readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create(config);
        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = (): void => {
        this.client.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = <T>(response: AxiosResponse): T => {
        return response.data;
    };

    private _handleError = <T>(error: unknown): Promise<T> => {
        return Promise.reject(error);
    };
}
