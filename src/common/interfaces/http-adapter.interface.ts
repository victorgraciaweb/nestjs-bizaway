import { HttpRequestConfig } from "./http-request-config.interface";

export interface HttpAdapter {
    get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}