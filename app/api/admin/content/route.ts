import { NextRequest, NextResponse } from 'next/server';

// Força rota dinâmica
export const dynamic = 'force-dynamic';

// Simulação de conteúdo do site
let siteContent = {
  home: {
    hero: {
      title: 'Os seus pés em boas mãos!',
      subtitle: 'Veracare, cuidando da saúde dos seus pés com dedicação, experiência e expertise.',
      ctaText: 'Agendar Consulta'
    },
    aboutPreview: {
      title: 'Cuidando da saúde dos seus pés com excelência!',
      description: 'Na Veracare, nossa missão é proporcionar saúde, bem-estar e conforto aos seus pés através de tratamentos preventivos e curativos, sempre com profissionalismo e dedicação.'
    },
    professional: {
      name: 'Veralucia Trindade Santos',
      title: 'Podóloga Especialista',
      description: 'Mais de 10 anos de experiência em podologia e cuidados com os pés.'
    }
  },
  about: {
    main: {
      title: 'Conheça Nossa História',
      description: 'A Veracare nasceu do sonho de proporcionar cuidados especializados para os pés...'
    }
  },
  services: {
    main: {
      title: 'Nossos Serviços',
      subtitle: 'Tratamentos especializados para cuidar da saúde dos seus pés'
    }
  },
  contact: {
    info: {
      phone: '(11) 96738-1029',
      email: 'contato@veracare.com.br',
      address: 'Rua das Palmeiras, 123 - Casa Verde, São Paulo - SP',
      hours: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h'
    }
  },
  footer: {
    main: {
      description: 'Cuidando da saúde dos seus pés com dedicação, experiência e expertise.',
      copyright: '© 2024 Veracare. Todos os direitos reservados.'
    }
  }
};

// GET - Buscar conteúdo
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    let data: any = siteContent;

    // Filtrar por página específica
    if (page && page !== 'all') {
      data = { [page]: siteContent[page as keyof typeof siteContent] };
    }

    // Filtrar por seção específica
    if (page && section && siteContent[page as keyof typeof siteContent]) {
      const pageContent = siteContent[page as keyof typeof siteContent];
      data = { 
        [page]: { 
          [section]: (pageContent as any)[section] 
        } 
      };
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar conteúdo' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar conteúdo
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, section, field, content } = body;

    if (!page || !section || !field) {
      return NextResponse.json(
        { success: false, error: 'Página, seção e campo são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se a página existe
    if (!(page in siteContent)) {
      return NextResponse.json(
        { success: false, error: 'Página não encontrada' },
        { status: 404 }
      );
    }

    const pageContent = siteContent[page as keyof typeof siteContent];

    // Verificar se a seção existe
    if (!(section in pageContent)) {
      return NextResponse.json(
        { success: false, error: 'Seção não encontrada' },
        { status: 404 }
      );
    }

    // Atualizar o conteúdo
    (pageContent as any)[section][field] = content;

    return NextResponse.json({
      success: true,
      message: 'Conteúdo atualizado com sucesso',
      data: {
        page,
        section,
        field,
        content,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar conteúdo' },
      { status: 500 }
    );
  }
}

// POST - Atualização em lote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, error: 'Updates deve ser um array' },
        { status: 400 }
      );
    }

    const results = [];
    
    for (const update of updates) {
      const { page, section, field, content } = update;
      
      try {
        if (page in siteContent && 
            section in (siteContent[page as keyof typeof siteContent] as any)) {
          (siteContent[page as keyof typeof siteContent] as any)[section][field] = content;
          results.push({
            success: true,
            page,
            section,
            field,
            message: 'Atualizado com sucesso'
          });
        } else {
          results.push({
            success: false,
            page,
            section,
            field,
            message: 'Página ou seção não encontrada'
          });
        }
      } catch (error) {
        results.push({
          success: false,
          page,
          section,
          field,
          message: 'Erro na atualização'
        });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    return NextResponse.json({
      success: true,
      message: `${successful} atualizações bem-sucedidas, ${failed} falharam`,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro na atualização em lote' },
      { status: 500 }
    );
  }
}

// DELETE - Resetar conteúdo para padrão
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (page && page in siteContent) {
      // Em produção, carregaria do backup/padrão
      return NextResponse.json({
        success: true,
        message: `Conteúdo da página ${page} resetado para o padrão`,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Todo o conteúdo resetado para o padrão',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao resetar conteúdo' },
      { status: 500 }
    );
  }
}