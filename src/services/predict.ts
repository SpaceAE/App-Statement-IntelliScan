import { API_PATH } from '@/constants/apiPath';
import { PredictResult } from '@/constants/predictResult';
import axios from '@/plugins/axios';

export interface PredictRequest {
  file: File;
  password?: string;
}

export enum PredictResponseType {
  SUCCESS,
  ERROR,
}

export type PredictResponse<
  T extends PredictResponseType = PredictResponseType,
> = T extends PredictResponseType.SUCCESS
  ? {
      prediction: PredictResult;
      confidence: number;
    }
  : { message: string };

export const predict = async (data: PredictRequest) => {
  const formData = new FormData();
  formData.append('file', data.file);
  if (data.password?.trim()) {
    formData.append('password', data.password);
  }

  return axios.post<PredictResponse<PredictResponseType.SUCCESS>>(
    API_PATH.PREDICT,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
