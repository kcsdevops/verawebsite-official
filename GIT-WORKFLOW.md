# 📋 Git Workflow e Versionamento - Veracare Website

## 🌿 Estratégia de Branching

### Branch Principal
- **`master`**: Branch de produção
  - Código sempre estável e pronto para deploy
  - Apenas merges de `development` ou `hotfix/*`
  - Tags de versionamento (v1.0.0, v1.1.0, etc.)

### Branches de Desenvolvimento
- **`development`**: Branch de desenvolvimento
  - Integração de todas as features
  - Testes antes do merge para `master`
  - Base para novas features

- **`feature/*`**: Branches para novas funcionalidades
  - `feature/new-features`: Para funcionalidades gerais
  - `feature/payment-integration`: Para integração de pagamentos
  - `feature/booking-system`: Para sistema de agendamento
  - Sempre partir de `development`

- **`hotfix/*`**: Correções urgentes
  - `hotfix/production-fixes`: Para correções críticas
  - Partir de `master` e fazer merge em `master` e `development`

## 🏷️ Convenção de Commits

### Formato
```
<tipo>(escopo): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit
- **✨ feat**: Nova funcionalidade
- **🐛 fix**: Correção de bug
- **📝 docs**: Documentação
- **💄 style**: Formatação, sem mudança de lógica
- **♻️ refactor**: Refatoração de código
- **⚡ perf**: Melhoria de performance
- **✅ test**: Adição ou correção de testes
- **📦 build**: Mudanças no build system
- **👷 ci**: Mudanças na CI/CD
- **🔧 chore**: Outras mudanças que não afetam src

### Exemplos
```bash
git commit -m "✨ feat(booking): Add appointment scheduling system"
git commit -m "🐛 fix(header): Fix mobile navigation menu"
git commit -m "📝 docs: Update deployment instructions"
git commit -m "💄 style(homepage): Improve hero section styling"
```

## 🚀 Workflow de Desenvolvimento

### 1. Para novas funcionalidades
```bash
# Partir do development
git checkout development
git pull origin development

# Criar feature branch
git checkout -b feature/nome-da-feature

# Desenvolver...
git add .
git commit -m "✨ feat: Add new feature"

# Push da feature
git push origin feature/nome-da-feature

# Criar Pull Request para development
```

### 2. Para correções urgentes
```bash
# Partir do master
git checkout master
git pull origin master

# Criar hotfix branch
git checkout -b hotfix/nome-da-correcao

# Corrigir...
git add .
git commit -m "🐛 fix: Critical bug fix"

# Push do hotfix
git push origin hotfix/nome-da-correcao

# Criar Pull Request para master E development
```

### 3. Para releases
```bash
# Merge development -> master
git checkout master
git merge development

# Criar tag de versão
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Deploy automático via CI/CD
```

## 📋 Versionamento Semântico

### Formato: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0 -> 2.0.0): Mudanças incompatíveis
- **MINOR** (1.0.0 -> 1.1.0): Novas funcionalidades compatíveis
- **PATCH** (1.0.0 -> 1.0.1): Correções de bugs

### Exemplos de Versões
- `v1.0.0`: Primeira versão de produção
- `v1.1.0`: Adição do sistema de agendamento
- `v1.1.1`: Correção bug no agendamento
- `v1.2.0`: Adição de pagamentos online
- `v2.0.0`: Reestruturação completa da arquitetura

## 🔍 Code Review

### Checklist para Pull Requests
- [ ] Código segue padrões do projeto
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Build passa sem erros
- [ ] Sem conflitos de merge
- [ ] Descrição clara das mudanças

### Template de Pull Request
```markdown
## Tipo de mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Descrição
Descreva as mudanças implementadas...

## Como testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)
[Adicionar screenshots]

## Checklist
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Code review solicitado
```

## 📊 Comandos Úteis

### Verificar status
```bash
git status
git log --oneline --graph
git branch -a
```

### Atualizar branches
```bash
# Atualizar master
git checkout master && git pull origin master

# Atualizar development  
git checkout development && git pull origin development

# Rebase feature branch
git checkout feature/minha-feature
git rebase development
```

### Cleanup de branches
```bash
# Deletar branch local
git branch -d feature/nome-da-feature

# Deletar branch remoto
git push origin --delete feature/nome-da-feature

# Limpar branches remotos deletados
git remote prune origin
```

## 🏷️ Tags e Releases

### Criar release
```bash
# Tag anotada
git tag -a v1.0.0 -m "Release v1.0.0: Initial production version"

# Push da tag
git push origin v1.0.0

# Listar tags
git tag -l
```

### Changelog Automático
O changelog é gerado automaticamente baseado nos commits:
- Commits `feat:` -> Features
- Commits `fix:` -> Bug Fixes  
- Commits `BREAKING CHANGE:` -> Breaking Changes

## 🔄 Integração Contínua

### Triggers de CI/CD
- **Push para `master`**: Deploy para produção
- **Push para `development`**: Deploy para staging
- **Pull Request**: Testes automáticos
- **Tags**: Criação de release

### Ambientes
- **Production**: `master` branch -> Cloud Run
- **Staging**: `development` branch -> Preview URL
- **Feature**: `feature/*` branches -> Preview URL

---

## 📞 Suporte

Para dúvidas sobre o workflow:
1. Consulte este documento
2. Veja exemplos nos commits existentes
3. Peça ajuda na equipe

**Lembre-se**: Sempre trabalhar em branches e nunca fazer push direto para `master`!