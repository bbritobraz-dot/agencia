# Plataforma RUNA — Site Institucional + Diagnóstico Digital Gamificado + CRM Interno

Plataforma oficial da **RUNA** desenvolvida em **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **Supabase (PostgreSQL + Auth + RLS)**.

---

## 1. Arquitetura da Plataforma

### Camada Pública (`src/app/(public)`)
- **`/` (Home)**: Hero premium, prévia interativa do diagnóstico, seção com as 6 categorias de serviços, benefícios, projetos e cases configuráveis, metodologia de trabalho e CTA final.
- **`/solucoes` e `/solucoes/[slug]`**: Páginas individuais com metadados SEO próprios para cada serviço:
  1. `/solucoes/gestao-de-trafego-pago`
  2. `/solucoes/sites-e-landing-pages`
  3. `/solucoes/ecommerce`
  4. `/solucoes/automacoes-e-ia`
  5. `/solucoes/sistemas-sob-medida`
  6. `/solucoes/dados-e-analytics`
- **`/diagnostico`**: Diagnóstico Digital Gamificado com 8 perguntas, cálculo de pontuação geral (0 a 100) e por categoria, identificação de gargalos, recomendação de serviços, exibição imediata do resultado e criação automática do lead no CRM interno.
- **`/projetos`**: Vitrine técnica e estrutura configurável (`src/config/projects.ts`) pronta para inserção de evidências e cases autorizados.
- **`/sobre`**: Posicionamento institucional da RUNA.
- **`/contato`**: Formulário comercial integrado diretamente ao CRM interno.
- **`/politica-de-privacidade`**: Diretrizes de proteção de dados e consentimento LGPD.

### Camada Administrativa Privada — CRM Interno (`src/app/admin`)
- **`/admin/login`**: Autenticação restrita via Supabase Auth + verificação de perfil ativo em `public.admin_profiles` (sem auto-registro público).
- **`/admin`**: Dashboard com Total de leads, Novos leads, Leads qualificados, Oportunidades em negociação, Leads convertidos, Taxa de conversão por etapa, Origem dos leads e Serviços mais procurados.
- **`/admin/leads`**: Lista de leads com pesquisa, filtros combinados, cadastro manual de leads e exportação CSV.
- **`/admin/pipeline`**: Funil Kanban interativo com as 7 etapas (*Novo lead, Em contato, Qualificado, Proposta enviada, Negociação, Fechado, Perdido*) e registro automático de histórico.
- **`/admin/leads/[id]`**: Ficha completa do lead com dados de contato, empresa, segmento, faixa de faturamento, UTMs, respostas das 8 perguntas do diagnóstico, pontuação, oportunidades, serviço recomendado, edição de status comercial, notas internas, registro de contatos, agendamento de follow-ups e botão direto para abrir conversa no WhatsApp.

---

## 2. Configuração do Banco de Dados no Supabase

1. No painel do seu projeto Supabase, abra o **SQL Editor** e execute o arquivo de migration:
   - `supabase/migrations/20261102000000_runa_platform_schema.sql`
2. Para provisionar seu usuário administrador:
   - Crie o usuário em **Authentication → Users → Add User** no painel do Supabase.
   - Copie o `UUID` do usuário criado e insira na tabela `public.admin_profiles`:

```sql
INSERT INTO public.admin_profiles (id, email, full_name, role, active)
VALUES (
  'UUID-DO-SEU-USUARIO-AUTH',
  'seu-email@runamkt.com.br',
  'Administrador RUNA',
  'super_admin',
  true
);
```

---

## 3. Variáveis de Ambiente (`.env.local`)

Copie `.env.example` para `.env.local` e preencha com as chaves reais do seu projeto Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NEXT_PUBLIC_RUNA_WHATSAPP=554584317910
NEXT_PUBLIC_SITE_URL=https://runamkt.com.br
```
