import { NextRequest, NextResponse } from 'next/server';
import { validateAuthToken } from '../../../../../src/utils/security';
import Logger from '../../../../../src/utils/logger';

// Força rota dinâmica para evitar erro de pre-render
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  
  try {
    const user = await validateAuthToken(request);
    
    Logger.debug('Token validado com sucesso', { role: user.role }, 'admin', clientIP);
    
    return NextResponse.json({
      success: true,
      user: {
        role: user.role,
        loginTime: user.loginTime
      },
      message: 'Token válido'
    });
  } catch (error) {
    Logger.warn('Tentativa de acesso com token inválido', { error: (error as Error).message }, undefined, clientIP);
    
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 401 }
    );
  }
}