import { AxiosResponse } from 'axios';
import { CounterTypes, ResetCounterResponse, UpdateCounterInput, UpdateCounterResponse } from './types';
import {  client } from "./tools/axios";

export class CounterApi {
  static async getCounter(): Promise<CounterTypes> {
    return client.get(`/counter`)
    .then((response: AxiosResponse<CounterTypes>) => response.data);
  }

  static async updateCounter({type, step}: UpdateCounterInput): Promise<UpdateCounterResponse> {
    return client.post(`/counter?type=${type}&step=${step}`)
    .then((response: AxiosResponse<UpdateCounterResponse>) => response.data);
  }

  static async resetCounter(): Promise<ResetCounterResponse> {
    return client.delete(`/counter`)
    .then((response: AxiosResponse<ResetCounterResponse>) => response.data);
  }
}

export const useCounterApi = () => {
  return {
    getCounter: CounterApi.getCounter,
    updateCounter: CounterApi.updateCounter,
    resetCounter: CounterApi.resetCounter
  };
}