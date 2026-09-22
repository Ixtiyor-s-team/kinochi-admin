import type { AxiosRequestConfig } from "axios";
import api from "./axios";

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return api(config).then((response) => response.data);
};
