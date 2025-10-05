import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Força rota dinâmica
export const dynamic = 'force-dynamic';

// Simulação de banco de dados para mídia
let mediaFiles = [
  {
    id: '1',
    filename: 'hero-image.jpg',
    originalName: 'hero-image.jpg',
    path: '/images/hero-image.jpg',
    size: 245678,
    type: 'image/jpeg',
    category: 'hero',
    uploadedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    filename: 'about-clinic.jpg',
    originalName: 'clinica-foto.jpg',
    path: '/images/about-clinic.jpg',
    size: 189234,
    type: 'image/jpeg',
    category: 'about',
    uploadedAt: '2024-01-14T10:00:00Z'
  }
];

// GET - Listar arquivos de mídia
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let filteredFiles = mediaFiles;
    
    if (category) {
      filteredFiles = mediaFiles.filter(file => file.category === category);
    }

    return NextResponse.json({
      success: true,
      data: filteredFiles,
      total: filteredFiles.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar arquivos de mídia' },
      { status: 500 }
    );
  }
}

// POST - Upload de arquivos
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'uncategorized';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validação de tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Tipo de arquivo não permitido' },
        { status: 400 }
      );
    }

    // Validação de tamanho (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Arquivo muito grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;

    // Definir diretório de upload
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
    
    // Criar diretório se não existir
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Salvar arquivo
    const filePath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Adicionar à "base de dados"
    const newFile = {
      id: Date.now().toString(),
      filename,
      originalName: file.name,
      path: `/uploads/${category}/${filename}`,
      size: file.size,
      type: file.type,
      category,
      uploadedAt: new Date().toISOString()
    };

    mediaFiles.push(newFile);

    return NextResponse.json({
      success: true,
      data: newFile,
      message: 'Arquivo enviado com sucesso'
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir arquivo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do arquivo é obrigatório' },
        { status: 400 }
      );
    }

    const fileIndex = mediaFiles.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }

    const deletedFile = mediaFiles.splice(fileIndex, 1)[0];

    // Em produção, também deletar o arquivo físico
    // const filePath = path.join(process.cwd(), 'public', deletedFile.path);
    // if (existsSync(filePath)) {
    //   await unlink(filePath);
    // }

    return NextResponse.json({
      success: true,
      data: deletedFile,
      message: 'Arquivo excluído com sucesso'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir arquivo' },
      { status: 500 }
    );
  }
}