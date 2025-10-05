import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuthToken, validatePassword, sanitizeInput, logSecurityEvent } from '../../../../src/utils/security';
import Logger from '../../../../src/utils/logger';

// Força rota dinâmica
export const dynamic = 'force-dynamic';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$12$/t6dw7j6C0XTs19xSL82e.kRhB7le.V1dDrT9797xtu2ZYw.gY1Ka'; // hash of 'AdminVeraCare2025!'

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  
  try {
    const body = await request.json();
    const { password } = body;

    // Validação de entrada
    if (!password) {
      Logger.warn('Tentativa de login sem senha', {}, undefined, clientIP);
      return NextResponse.json(
        { success: false, error: 'Senha obrigatória' },
        { status: 400 }
      );
    }

    const sanitizedPassword = sanitizeInput(password);

    // Rate limiting básico
    logSecurityEvent('LOGIN_ATTEMPT', { ip: clientIP });

    // Verificar senha
    const isValidPassword = await bcrypt.compare(sanitizedPassword, ADMIN_PASSWORD_HASH);
    
    if (isValidPassword) {
      // Gerar token seguro
      const token = createAuthToken({ 
        role: 'admin', 
        loginTime: Date.now(),
        ip: clientIP 
      });

      Logger.info('Login administrativo realizado com sucesso', {}, 'admin', clientIP);
      logSecurityEvent('LOGIN_SUCCESS', { ip: clientIP });

      return NextResponse.json({
        success: true,
        token,
        expiresIn: '24h',
        message: 'Autenticação realizada com sucesso'
      });
    } else {
      Logger.warn('Tentativa de login com credenciais inválidas', {}, undefined, clientIP);
      logSecurityEvent('LOGIN_FAILED', { ip: clientIP, reason: 'invalid_credentials' });
      
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }
  } catch (error) {
    Logger.error('Erro no processo de autenticação', error as Error, undefined, clientIP);
    logSecurityEvent('LOGIN_ERROR', { ip: clientIP, error: (error as Error).message });
    
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}