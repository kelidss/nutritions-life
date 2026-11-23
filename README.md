# nutritions-life

Site do nutricionista Anderson Oliveira (Nutrition's Life), feito com React + Vite.

## Rodar localmente

```bash
npm install
npm run dev
```

O servidor local também atende as rotas `/api/*` (pagamento dos guias). Para testá-las, copie `.env.example` para `.env` e preencha as variáveis.

## Venda dos guias (Mercado Pago)

Fluxo:

1. O carrinho chama `POST /api/checkout` com os guias escolhidos. O servidor **recalcula o preço** (combos incluídos) e cria o pagamento no Mercado Pago (Checkout Pro: Pix, cartão e boleto).
2. O cliente paga na página do Mercado Pago e volta para `/?pagamento=aprovado&payment_id=...`.
3. O site chama `GET /api/order?payment_id=...`. O servidor confirma direto no Mercado Pago e, se aprovado, devolve links de download assinados que expiram (padrão: 7 dias).
4. `GET /api/download?t=...` confere o link e o pagamento de novo e entrega o PDF, sem revelar onde o arquivo está guardado.
5. `POST /api/webhook` recebe o aviso do Mercado Pago e envia os links por e-mail (se o Resend estiver configurado).

| Arquivo | Função |
| --- | --- |
| `api/checkout.js` | Cria o pagamento |
| `api/order.js` | Consulta a situação e libera os downloads |
| `api/download.js` | Entrega o PDF |
| `api/webhook.js` | Notificação do Mercado Pago + e-mail |
| `api/_lib/shared.js` | Preço, assinatura dos links, chamadas ao Mercado Pago e e-mail |

### Publicar na Vercel

1. Em vercel.com, **Add New → Project** e importe o repositório `kelidss/nutritions-life` (a Vercel detecta Vite sozinha).
2. Em **Settings → Environment Variables**, cadastre as variáveis do `.env.example`. Comece com o token de **teste** (`TEST-...`).
3. Gere um `DOWNLOAD_SECRET` longo e aleatório.
4. Suba os PDFs para um armazenamento **privado** (ex.: Vercel Blob) e preencha `GUIDE_FILES`. Nunca coloque os PDFs em `public/`.
5. No painel do Mercado Pago (Suas integrações → Webhooks), aponte as notificações de **Pagamentos** para `https://SEU-DOMINIO/api/webhook` e copie a chave secreta para `MP_WEBHOOK_SECRET`.
6. Faça compras de teste com os cartões de teste do Mercado Pago. Depois troque `MP_ACCESS_TOKEN` pelo token de produção.

> O token de acesso é secreto: fica só nas variáveis de ambiente da hospedagem, nunca no código nem em mensagens.
