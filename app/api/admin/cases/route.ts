import { NextRequest, NextResponse } from 'next/server';

// Força rota dinâmica
export const dynamic = 'force-dynamic';

// Simulação de banco de dados em memória (em produção, usar banco de dados real)
let cases = [
  {
    id: '1',
    title: 'Tratamento de Unha Encravada',
    description: 'Caso de sucesso no tratamento de unha encravada com técnica avançada.',
    beforeImage: '/images/cases/before-1.jpg',
    afterImage: '/images/cases/after-1.jpg',
    category: 'unhas',
    date: '2024-01-15',
    results: 'Recuperação completa em 2 semanas',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Remoção de Calo Plantar',
    description: 'Tratamento eficaz para calo plantar utilizando técnicas modernas.',
    beforeImage: '/images/cases/before-2.jpg',
    afterImage: '/images/cases/after-2.jpg',
    category: 'calos',
    date: '2024-01-10',
    results: 'Alívio imediato da dor e remoção completa',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

// GET - Listar todos os casos
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: cases,
      total: cases.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar casos' },
      { status: 500 }
    );
  }
}

// POST - Criar novo caso
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newCase = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    cases.push(newCase);

    return NextResponse.json({
      success: true,
      data: newCase,
      message: 'Caso criado com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao criar caso' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar caso
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const caseIndex = cases.findIndex(c => c.id === id);
    
    if (caseIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Caso não encontrado' },
        { status: 404 }
      );
    }

    cases[caseIndex] = {
      ...cases[caseIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: cases[caseIndex],
      message: 'Caso atualizado com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar caso' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir caso
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do caso é obrigatório' },
        { status: 400 }
      );
    }

    const caseIndex = cases.findIndex(c => c.id === id);
    
    if (caseIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Caso não encontrado' },
        { status: 404 }
      );
    }

    const deletedCase = cases.splice(caseIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedCase,
      message: 'Caso excluído com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir caso' },
      { status: 500 }
    );
  }
}