# Script para atualizar importações dos componentes
Write-Host "🔄 Atualizando importações dos componentes..." -ForegroundColor Cyan

# Buscar todos os arquivos .tsx no app
$files = Get-ChildItem -Path "C:\Users\renov\xxxvera\app" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Atualizar importações dos componentes
    $content = $content -replace "from '\.\.\/components\/Header'", "from '../../src/components/ui/Header'"
    $content = $content -replace "from '\.\.\/\.\./components\/Header'", "from '../../src/components/ui/Header'"
    $content = $content -replace "from '\.\.\/components\/Footer'", "from '../../src/components/ui/Footer'"
    $content = $content -replace "from '\.\.\/\.\./components\/Footer'", "from '../../src/components/ui/Footer'"
    $content = $content -replace "from '\.\.\/components\/WhatsAppPopup'", "from '../../src/components/ui/WhatsAppPopup'"
    $content = $content -replace "from '\.\.\/\.\./components\/WhatsAppPopup'", "from '../../src/components/ui/WhatsAppPopup'"
    $content = $content -replace "from '\.\.\/components\/ProfessionalImage'", "from '../../src/components/ui/ProfessionalImage'"
    $content = $content -replace "from '\.\.\/\.\./components\/ProfessionalImage'", "from '../../src/components/ui/ProfessionalImage'"
    $content = $content -replace "from '\.\.\/components\/FloatingButtons'", "from '../../src/components/ui/FloatingButtons'"
    $content = $content -replace "from '\.\.\/\.\./components\/FloatingButtons'", "from '../../src/components/ui/FloatingButtons'"
    $content = $content -replace "from '\.\.\/components\/SocialLogin'", "from '../../src/components/ui/SocialLogin'"
    $content = $content -replace "from '\.\.\/\.\./components\/SocialLogin'", "from '../../src/components/ui/SocialLogin'"
    $content = $content -replace "from '\.\.\/components\/Calendar'", "from '../../src/components/ui/Calendar'"
    $content = $content -replace "from '\.\.\/\.\./components\/Calendar'", "from '../../src/components/ui/Calendar'"
    $content = $content -replace "from '\.\.\/components\/LocationMap'", "from '../../src/components/ui/LocationMap'"
    $content = $content -replace "from '\.\.\/\.\./components\/LocationMap'", "from '../../src/components/ui/LocationMap'"
    $content = $content -replace "from '\.\.\/components\/ImageGallery'", "from '../../src/components/ui/ImageGallery'"
    $content = $content -replace "from '\.\.\/\.\./components\/ImageGallery'", "from '../../src/components/ui/ImageGallery'"
    $content = $content -replace "from '\.\.\/components\/SecuritySeals'", "from '../../src/components/ui/SecuritySeals'"
    $content = $content -replace "from '\.\.\/\.\./components\/SecuritySeals'", "from '../../src/components/ui/SecuritySeals'"
    
    # Atualizar imports sem as aspas (usando import { } direto)
    $content = $content -replace "import \{ Header \} from '\.\.\/components\/Header';", "import { Header } from '../../src/components/ui/Header';"
    $content = $content -replace "import \{ Header \} from '\.\.\/\.\./components\/Header';", "import { Header } from '../../src/components/ui/Header';"
    $content = $content -replace "import \{ Footer \} from '\.\.\/components\/Footer';", "import { Footer } from '../../src/components/ui/Footer';"
    $content = $content -replace "import \{ Footer \} from '\.\.\/\.\./components\/Footer';", "import { Footer } from '../../src/components/ui/Footer';"
    $content = $content -replace "import WhatsAppPopup from '\.\.\/components\/WhatsAppPopup';", "import WhatsAppPopup from '../../src/components/ui/WhatsAppPopup';"
    $content = $content -replace "import WhatsAppPopup from '\.\.\/\.\./components\/WhatsAppPopup';", "import WhatsAppPopup from '../../src/components/ui/WhatsAppPopup';"
    $content = $content -replace "import ProfessionalImage from '\.\.\/components\/ProfessionalImage';", "import ProfessionalImage from '../../src/components/ui/ProfessionalImage';"
    $content = $content -replace "import ProfessionalImage from '\.\.\/\.\./components\/ProfessionalImage';", "import ProfessionalImage from '../../src/components/ui/ProfessionalImage';"
    $content = $content -replace "import SocialLogin from '\.\.\/components\/SocialLogin';", "import SocialLogin from '../../src/components/ui/SocialLogin';"
    $content = $content -replace "import SocialLogin from '\.\.\/\.\./components\/SocialLogin';", "import SocialLogin from '../../src/components/ui/SocialLogin';"
    
    # Layout específico
    $content = $content -replace "import \{ FloatingButtons \} from '\.\.\/components\/FloatingButtons'", "import { FloatingButtons } from '../src/components/ui/FloatingButtons'"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "✓ Atualizado: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "✨ Importações atualizadas!" -ForegroundColor Green