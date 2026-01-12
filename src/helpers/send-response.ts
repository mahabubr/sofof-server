/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Response } from 'express';

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

interface ResponseData {
  status_code: number;
  message: string;
  data?: any;
  error?: any;
  pagination?: Pagination;
  meta?: any;
  headers?: Record<string, string>;
}

function sendResponse(response: Response, responseData: ResponseData): void {
  const {
    status_code,
    message,
    data = null,
    error = null,
    pagination = null,
    meta = null,
    headers = {},
  } = responseData;

  if (Object.keys(headers).length > 0) {
    Object.entries(headers).forEach(([key, value]) => {
      response.setHeader(key, value);
    });
  }

  const responseBody: any = {
    status_code,
    message,
    data,
    error,
  };

  if (pagination) {
    responseBody.pagination = pagination;
  }

  if (meta) {
    responseBody.meta = meta;
  }

  response.status(status_code).json(responseBody);
}

export default sendResponse;
