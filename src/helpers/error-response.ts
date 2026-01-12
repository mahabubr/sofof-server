import type { Response } from 'express';

export interface CustomErrorResponse {
  status: number;
  url: string;
  method: string;
  helper: {
    name: string;
    message: string;
    stack: string;
    context: {
      ip: string;
      userAgent: string;
    };
  };
}

const errorResponse = (response: Response, { status, url, method, helper }: CustomErrorResponse) => {
  const errorData = {
    status_code: status,
    helper: helper,
    path: url,
    method: method,
    meta: { timestamp: new Date().toISOString() },
  };

  response.status(status).send(errorData);
};

export default errorResponse;
