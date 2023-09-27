import { Request } from 'express';

export interface AuthRequest extends Request {
  headers: {
    authorization?: string;
    // Add other header properties as needed
  };
  user: any;
}
