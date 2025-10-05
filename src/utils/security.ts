import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'veracare-jwt-secret-2025';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    role: string;
    iat: number;
    exp: number;
  };
}

export function validateAuthToken(request: NextRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    const authorization = request.headers.get('authorization');
    
    if (!authorization?.startsWith('Bearer ')) {
      reject(new Error('Token não fornecido'));
      return;
    }

    const token = authorization.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      resolve(decoded);
    } catch (error) {
      reject(new Error('Token inválido ou expirado'));
    }
  });
}

export function createAuthToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!password) {
    errors.push('Senha é obrigatória');
  } else {
    if (password.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Senha deve conter pelo menos uma letra minúscula');
    }
    if (!/\d/.test(password)) {
      errors.push('Senha deve conter pelo menos um número');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function logSecurityEvent(event: string, details: any = {}) {
  console.log(`[SECURITY] ${new Date().toISOString()} - ${event}`, details);
}

export function rateLimitCheck(ip: string, endpoint: string): boolean {
  // Em produção, implementar rate limiting real com Redis ou similar
  return true;
}