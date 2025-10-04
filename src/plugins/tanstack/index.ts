import {
  QueryClient,
  UseMutationOptions,
  useMutation as useTanstackMutation,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const queryClient = new QueryClient();

export const useMutation = <TRequest, TResponse, TError>(
  option: UseMutationOptions<
    AxiosResponse<TResponse>,
    AxiosResponse<TError>,
    TRequest
  >
) => {
  return useTanstackMutation(option);
};
