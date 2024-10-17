import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {
  if (!req.headers?.gatewayToken) {
    throw new NotAuthorizedError('Invalid request', 'Request not coming from api gateway');
  }
  const token: string = req.headers?.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError('Invalid request', 'Request not coming from api gateway');
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(token, '14535b4b322865943ac2ee2f4e8fca6b') as { id: string; iat: number };
    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError('Invalid request', 'Request payload is invalid');
    }
  } catch (error) {
    throw new NotAuthorizedError('Invalid request', 'Request not coming from api gateway');
  }
  next();
}
