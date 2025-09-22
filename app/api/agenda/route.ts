import { NextRequest, NextResponse } from 'next/server';
import { saveAppointment } from '../../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, service, message } = body;

    if (!name || !email || !phone || !date || !time || !service) {
      return NextResponse.json({ error: 'Todos os campos obrigatórios devem ser preenchidos' }, { status: 400 });
    }

    const appointment = saveAppointment({
      name,
      email,
      phone,
      date,
      time,
      service,
      message,
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
