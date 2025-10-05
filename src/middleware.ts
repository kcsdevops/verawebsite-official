import { NextRequest, NextResponse } from 'next/server';
import { validateAuthToken } from './utils/security';
import Logger from './utils/logger';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

  // Proteger rotas administrativas
  if (pathname.startsWith('/api/admin') && !pathname.includes('/api/admin/auth')) {
    try {
      await validateAuthToken(request);
      Logger.debug('Acesso autorizado à rota administrativa', { path: pathname }, undefined, clientIP);
    } catch (error) {
      Logger.warn('Acesso negado à rota administrativa', { path: pathname, error: (error as Error).message }, undefined, clientIP);
      
      return NextResponse.json(
        { success: false, error: 'Acesso não autorizado' },
        { status: 403 }
      );
    }
  }

  // Rate limiting básico para APIs
  if (pathname.startsWith('/api/')) {
    const userAgent = request.headers.get('user-agent') || '';
    
    // Bloquear bots conhecidos
    if (userAgent.toLowerCase().includes('bot') && !userAgent.toLowerCase().includes('googlebot')) {
      Logger.warn('Acesso bloqueado - Bot detectado', { userAgent, path: pathname }, undefined, clientIP);
      return new Response('Acesso negado', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ]
};