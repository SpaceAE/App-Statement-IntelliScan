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
  ?
      | {
          prediction: PredictResult.NORMAL;
          confidence: number;
        }
      | {
          prediction: PredictResult.FRAUD;
          confidence: number;
          fraud_count: number;
          transactions_count: number;
          transactions: Array<{
            idx: number;
            tx_datetime: string;
            code_channel_raw: string;
            debit_amount: number;
            credit_amount: number;
            balance_amount: number;
            description_text: string;
            fraud_score: number;
            is_fraud: boolean;
          }>;
        }
  : { message: string };

export type PredictFraudSuccessResponse = Extract<
  PredictResponse<PredictResponseType.SUCCESS>,
  { prediction: PredictResult.FRAUD }
>;

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
