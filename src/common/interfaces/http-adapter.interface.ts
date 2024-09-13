import { HttpRequestConfig } from "./http-request-config.interface";

/**
 * Interfaz para un adaptador HTTP que realiza solicitudes GET.
 */
export interface HttpAdapter {
    /**
     * Realiza una solicitud GET a la URL especificada.
     * @param url - La URL a la que se realiza la solicitud.
     * @param config - Opcional. Configuración adicional para la solicitud.
     * @returns Una promesa que se resuelve con la respuesta de la solicitud.
     */
    get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}