# Script de Limpeza e Organização - VeraCare
# Este script move arquivos em desuso para pasta de arquivo

Write-Host "🧹 Iniciando limpeza e organização do projeto VeraCare..." -ForegroundColor Cyan

# Criar pastas de arquivo se não existirem
$archivePath = "C:\Users\renov\xxxvera\archive"
$oldComponentsPath = "$archivePath\old-components"
$unusedFilesPath = "$archivePath\unused-files"
$oldMicroservicesPath = "$archivePath\old-microservices"

# Arquivos quebrados/temporários para mover
$filesToArchive = @(
    "package.json.broken",
    "error.js",
    "root.js", 
    "routes.js",
    "index.js",
    "app.js",
    "app-export.js",
    "app-for-admin.js",
    "app-for-users.js",
    "Untitled-1.txt"
)

Write-Host "📦 Movendo arquivos em desuso..." -ForegroundColor Yellow

foreach ($file in $filesToArchive) {
    $sourcePath = "C:\Users\renov\xxxvera\$file"
    if (Test-Path $sourcePath) {
        Move-Item $sourcePath $unusedFilesPath -Force
        Write-Host "✓ Movido: $file" -ForegroundColor Green
    }
}

# Mover microserviços não utilizados
Write-Host "📦 Movendo projetos duplicados..." -ForegroundColor Yellow

$projectsToArchive = @(
    "temp-agendamento",
    "agendamento-web"
)

foreach ($project in $projectsToArchive) {
    $sourcePath = "C:\Users\renov\xxxvera\$project"
    if (Test-Path $sourcePath) {
        Move-Item $sourcePath $oldMicroservicesPath -Force
        Write-Host "✓ Movido projeto: $project" -ForegroundColor Green
    }
}

# Mover Dockerfiles antigos
Write-Host "🐳 Organizando Dockerfiles..." -ForegroundColor Yellow

$dockerfilesToArchive = @(
    "Dockerfile.iis",
    "Dockerfile.prod", 
    "Dockerfile.simple2"
)

foreach ($dockerfile in $dockerfilesToArchive) {
    $sourcePath = "C:\Users\renov\xxxvera\$dockerfile"
    if (Test-Path $sourcePath) {
        Move-Item $sourcePath $unusedFilesPath -Force
        Write-Host "✓ Movido: $dockerfile" -ForegroundColor Green
    }
}

# Mover componentes antigos para arquivo
Write-Host "🎨 Arquivando componentes originais..." -ForegroundColor Yellow

if (Test-Path "C:\Users\renov\xxxvera\components") {
    Move-Item "C:\Users\renov\xxxvera\components" $oldComponentsPath -Force
    Write-Host "✓ Componentes originais arquivados" -ForegroundColor Green
}

# Mover pastas antigas não utilizadas
$foldersToArchive = @(
    "fake-data",
    "static-data", 
    "strings",
    "ui",
    "environments"
)

foreach ($folder in $foldersToArchive) {
    $sourcePath = "C:\Users\renov\xxxvera\$folder"
    if (Test-Path $sourcePath) {
        Move-Item $sourcePath $unusedFilesPath -Force
        Write-Host "✓ Movido pasta: $folder" -ForegroundColor Green
    }
}

Write-Host "`n✨ Limpeza concluída!" -ForegroundColor Green
Write-Host "📁 Arquivos organizados em: $archivePath" -ForegroundColor Cyan
Write-Host "🎯 Estrutura do projeto agora está mais limpa e organizada!" -ForegroundColor Green

# Mostrar nova estrutura
Write-Host "`n📊 Nova estrutura do projeto:" -ForegroundColor Cyan
Write-Host "├── src/" -ForegroundColor White
Write-Host "│   ├── components/" -ForegroundColor White  
Write-Host "│   │   ├── animations/" -ForegroundColor White
Write-Host "│   │   └── ui/" -ForegroundColor White
Write-Host "│   ├── hooks/" -ForegroundColor White
Write-Host "│   ├── styles/" -ForegroundColor White
Write-Host "│   └── utils/" -ForegroundColor White
Write-Host "├── app/ (páginas Next.js)" -ForegroundColor White
Write-Host "├── public/ (assets estáticos)" -ForegroundColor White
Write-Host "└── archive/ (arquivos em desuso)" -ForegroundColor White