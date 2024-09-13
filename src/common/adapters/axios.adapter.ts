import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Injectable } from "@nestjs/common";

import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url, config);
            return data;
        } catch (error) {
            // Maneja el error adecuadamente
            throw new Error(`Error fetching data from ${url}: ${error.message}`);
        }
    }
}