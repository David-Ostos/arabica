import type { AxiosRequestConfig } from "axios";


export interface MyAxiosRequestConfig extends AxiosRequestConfig {
  cache?: string; // Propiedad opcional
}