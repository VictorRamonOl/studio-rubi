# Setup automação Instagram via Make.com

Configurar **uma vez** e ter publicação automática no Instagram via `npm run ig:next` — sem dor de cabeça com Meta Business Verification.

---

## 1. Criar conta Make.com (3 minutos)

1. Acessar https://www.make.com/en/register
2. Criar conta grátis (1.000 operações/mês — 30 posts cabem folgado)
3. Confirmar e-mail

---

## 2. Criar o cenário (5 minutos)

### 2.1. Novo cenário
- Dashboard → **+ Create new scenario**

### 2.2. Adicionar trigger "Webhook"
- Clica no `+` central
- Procura **"Webhooks"** → escolhe **"Custom webhook"**
- Clica **"Add"** → dá um nome (ex: `studio-rubi-carrossel`)
- Clica em **"Save"** → vai aparecer uma URL `https://hook.eu2.make.com/abc123...`
- **COPIA essa URL** (vai precisar dela no passo 3)

### 2.3. Adicionar módulo "Instagram for Business"
- Clica no `+` à direita do webhook
- Procura **"Instagram for Business"** → escolhe **"Create a Photo / Carousel"** (ou "Publish a Carousel Post")
- Clica em **"Connect"** → autoriza com **@rubistudiopilates** (vai abrir popup do Instagram normal, sem fricção)
- Em **"Image URLs"** → mapeia pro campo `image_urls` do webhook (array de URLs)
- Em **"Caption"** → mapeia pro campo `caption` do webhook
- Salva

### 2.4. Ativar o cenário
- Toggle no canto inferior esquerdo → **ON**

---

## 3. Adicionar a URL no projeto

No arquivo `.env.local` na raiz do projeto:

```env
MAKE_WEBHOOK_URL=https://hook.eu2.make.com/abc123...
```

(Cola a URL exata que o Make.com te deu no passo 2.2)

---

## 4. Testar

```bash
# Simula sem publicar
npm run ig:dry

# Publica o próximo da fila
npm run ig:next

# Publica um post específico
npm run ig:publish dor-lombar-exercicios-pilates-em-casa
```

---

## 5. Como funciona depois de configurado

```
Você roda:                     Make.com faz:                  Resultado:
npm run ig:next       ────►    Recebe webhook                 Post no @rubistudiopilates
                               Pega URLs dos slides
                               Pega caption
                               Posta via Instagram API
                                                              ✓ Publicado em ~30s
```

O script mantém histórico em `.ig-published.json` — `npm run ig:next` não repete posts já publicados.

---

## Por que Make.com em vez da Meta API direto?

A Meta exige:
- Business Verification (CNPJ + 3-7 dias)
- App Review (2-4 semanas)
- New Pages Experience tem bugs com /me/accounts

Make.com já passou por tudo isso — eles intermediam pra você.

- ✅ Free 1.000 ops/mês
- ✅ Sem CNPJ
- ✅ Sem App Review
- ✅ Funciona em ~10 min de setup

---

## Próximos passos opcionais

- **Agendar publicações:** em vez de chamar manualmente, adicionar trigger por data
- **Múltiplos canais:** mesmo cenário publica também no Facebook Page (módulo "Facebook Pages")
- **Notificações:** quando publica, envia e-mail/WhatsApp avisando
