# Git Helper Scripts - Veracare Project
# Execute com: .\git-helpers.ps1 <comando>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("new-feature", "hotfix", "release", "cleanup", "status", "sync", "help")]
    [string]$Command,
    
    [Parameter(Mandatory=$false)]
    [string]$Name = ""
)

# Cores para output
$Green = "`e[32m"
$Blue = "`e[34m"
$Yellow = "`e[33m"
$Red = "`e[31m"
$Reset = "`e[0m"

function Write-Info { param($Text) Write-Host "${Blue}ℹ️  $Text${Reset}" }
function Write-Success { param($Text) Write-Host "${Green}✅ $Text${Reset}" }
function Write-Warning { param($Text) Write-Host "${Yellow}⚠️  $Text${Reset}" }
function Write-Error { param($Text) Write-Host "${Red}❌ $Text${Reset}" }

function Show-Help {
    Write-Host @"
${Blue}🚀 Git Helper Scripts - Veracare Project${Reset}

${Yellow}Comandos Disponíveis:${Reset}

${Green}new-feature${Reset} <nome>     Criar nova feature branch
${Green}hotfix${Reset} <nome>          Criar hotfix branch  
${Green}release${Reset} <versão>       Criar release e tag
${Green}cleanup${Reset}                Limpar branches merged
${Green}status${Reset}                 Status detalhado do projeto
${Green}sync${Reset}                   Sincronizar todos os branches
${Green}help${Reset}                   Mostrar esta ajuda

${Yellow}Exemplos:${Reset}
  .\git-helpers.ps1 new-feature "payment-integration"
  .\git-helpers.ps1 hotfix "critical-bug-fix"
  .\git-helpers.ps1 release "1.1.0"
  .\git-helpers.ps1 status
"@
}

function New-Feature {
    param($FeatureName)
    
    if (-not $FeatureName) {
        Write-Error "Nome da feature é obrigatório!"
        Write-Info "Uso: .\git-helpers.ps1 new-feature 'nome-da-feature'"
        return
    }
    
    $branchName = "feature/$FeatureName"
    
    Write-Info "Criando nova feature branch: $branchName"
    
    # Atualizar development
    Write-Info "Atualizando branch development..."
    git checkout development
    git pull origin development 2>$null
    
    # Criar feature branch
    Write-Info "Criando feature branch..."
    git checkout -b $branchName
    
    Write-Success "Feature branch '$branchName' criada com sucesso!"
    Write-Info "Você está agora na branch: $branchName"
    Write-Info "Para commitar: git add . && git commit -m '✨ feat: descrição'"
}

function New-Hotfix {
    param($HotfixName)
    
    if (-not $HotfixName) {
        Write-Error "Nome do hotfix é obrigatório!"
        Write-Info "Uso: .\git-helpers.ps1 hotfix 'nome-do-hotfix'"
        return
    }
    
    $branchName = "hotfix/$HotfixName"
    
    Write-Info "Criando hotfix branch: $branchName"
    
    # Atualizar master
    Write-Info "Atualizando branch master..."
    git checkout master
    git pull origin master 2>$null
    
    # Criar hotfix branch
    Write-Info "Criando hotfix branch..."
    git checkout -b $branchName
    
    Write-Success "Hotfix branch '$branchName' criada com sucesso!"
    Write-Info "Você está agora na branch: $branchName"
    Write-Info "Para commitar: git add . && git commit -m '🐛 fix: descrição'"
}

function New-Release {
    param($Version)
    
    if (-not $Version) {
        Write-Error "Versão é obrigatória!"
        Write-Info "Uso: .\git-helpers.ps1 release '1.1.0'"
        return
    }
    
    if ($Version -notmatch '^\d+\.\d+\.\d+$') {
        Write-Error "Versão deve estar no formato: x.y.z (ex: 1.1.0)"
        return
    }
    
    Write-Info "Criando release v$Version"
    
    # Verificar se está em master
    $currentBranch = git branch --show-current
    if ($currentBranch -ne "master") {
        Write-Warning "Mudando para branch master..."
        git checkout master
    }
    
    # Atualizar master
    git pull origin master 2>$null
    
    # Criar tag
    Write-Info "Criando tag v$Version..."
    $releaseMessage = "🚀 Release v$Version"
    git tag -a "v$Version" -m $releaseMessage
    
    Write-Success "Release v$Version criada com sucesso!"
    Write-Info "Para enviar: git push origin v$Version"
}

function Cleanup-Branches {
    Write-Info "Limpando branches merged..."
    
    # Listar branches merged
    $mergedBranches = git branch --merged master | Where-Object { $_ -notmatch "(master|development)" -and $_ -notmatch "^\*" }
    
    if ($mergedBranches) {
        Write-Info "Branches que podem ser deletadas:"
        $mergedBranches | ForEach-Object { Write-Host "  - $_" }
        
        $confirm = Read-Host "`nDeseja deletar essas branches? (y/N)"
        if ($confirm -eq "y" -or $confirm -eq "Y") {
            $mergedBranches | ForEach-Object {
                $branch = $_.Trim()
                git branch -d $branch
                Write-Success "Branch '$branch' deletada"
            }
        }
    } else {
        Write-Info "Nenhuma branch merged encontrada para limpeza"
    }
}

function Show-Status {
    Write-Info "📊 Status do Projeto Veracare"
    Write-Host ""
    
    # Branch atual
    $currentBranch = git branch --show-current
    Write-Host "${Green}Branch atual:${Reset} $currentBranch"
    
    # Status dos arquivos
    Write-Host "`n${Yellow}Status dos arquivos:${Reset}"
    git status --short
    
    # Últimos commits
    Write-Host "`n${Yellow}Últimos commits:${Reset}"
    git log --oneline -5
    
    # Branches disponíveis
    Write-Host "`n${Yellow}Branches disponíveis:${Reset}"
    git branch -a
    
    # Tags
    Write-Host "`n${Yellow}Tags:${Reset}"
    git tag -l
    
    # Verificar se há mudanças não commitadas
    $changes = git status --porcelain
    if ($changes) {
        Write-Warning "Há mudanças não commitadas!"
    } else {
        Write-Success "Working directory limpo"
    }
}

function Sync-Branches {
    Write-Info "Sincronizando todos os branches..."
    
    $branches = @("master", "development")
    
    foreach ($branch in $branches) {
        Write-Info "Sincronizando $branch..."
        git checkout $branch
        git pull origin $branch 2>$null
        Write-Success "Branch $branch sincronizada"
    }
    
    Write-Success "Todos os branches sincronizados!"
}

# Executar comando baseado no parâmetro
switch ($Command) {
    "new-feature" { New-Feature $Name }
    "hotfix" { New-Hotfix $Name }
    "release" { New-Release $Name }
    "cleanup" { Cleanup-Branches }
    "status" { Show-Status }
    "sync" { Sync-Branches }
    "help" { Show-Help }
}

Write-Host ""