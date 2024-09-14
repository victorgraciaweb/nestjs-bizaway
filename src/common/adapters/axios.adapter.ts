import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Injectable } from "@nestjs/common";

import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { ExceptionHandlerService } from "../services/exception-handler.service";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    constructor(
        private readonly exceptionHandlerService: ExceptionHandlerService
    ) {}

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url, config);
            return data;
        } catch (error) {
            this.exceptionHandlerService.handleExceptions(error);
        }
    }
}