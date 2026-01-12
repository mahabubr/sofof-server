import { Response } from 'express';

interface ResponseData {
  status_code: number;
  message: string;
  data?: any;
}

function sendResponse(response: Response, responseData: ResponseData): void {
  const { status_code, message, data = null } = responseData;

  const responseBody: any = {
    status_code,
    message,
    data,
  };

  response.status(status_code).json(responseBody);
}

export default sendResponse;
