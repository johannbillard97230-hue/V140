# Déploiement Mollie Checkout — Instructions

## Le problème actuel
Le site déployé sur Kimi est **statique**. Le backend tRPC (API Mollie) ne tourne pas.
Le bouton "Confirmer la réservation" appelle `/api/trpc` → erreur CORS/404.

## Solution : Déployer sur Netlify (Frontend + Backend)

Le projet est déjà configuré pour Netlify :
- `netlify.toml` — config avec redirect `/api/*` → Function
- `netlify/functions/api.ts` — handler API tRPC
- `api/mollieRouter.ts` — endpoints Mollie

### Étape 1 : Publier le code sur GitHub

```bash
git init
git add .
git commit -m "Mollie Checkout integration"
git remote add origin https://github.com/VOTRE-USER/free-day-parking.git
git push -u origin main
```

### Étape 2 : Connecter Netlify

1. Allez sur https://app.netlify.com/
2. "Add new site" → "Import an existing project"
3. Connectez votre repo GitHub
4. Configuration :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist/public`
5. Cliquez "Deploy site"

### Étape 3 : Variables d'environnement Netlify

Dans Netlify Dashboard → Site settings → Environment variables :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `MOLLIE_API_KEY` | `test_xxxxxxxx` | Votre clé API Mollie (test ou live) |
| `SITE_URL` | `https://votre-site.netlify.app` | URL de votre site Netlify |

Obtenez votre clé API Mollie : https://www.mollie.com/dashboard/developers/api-keys

### Étape 4 : Redéployer

Après avoir ajouté les variables, cliquez "Retry deploy".

## Fonctionnement final

```
1. Client remplit le formulaire → prix calculé
2. Clique "Confirmer la réservation"
3. Frontend appelle POST /api/trpc/mollie.createPayment
4. Netlify Function crée le paiement Mollie
5. Redirection vers Mollie Checkout (page sécurisée)
6. Client paie
7. Redirection vers /success?id=PAYMENT_ID
8. Page affiche "Réservation confirmée" + ouvre WhatsApp
```

## WhatsApp mis à jour

Le message WhatsApp contient maintenant :
```
✅ Paiement : Confirmé
🆔 Référence Mollie : tr_xxxxxx
( + toutes les infos existantes )
```

## En local (développement)

```bash
# Terminal 1 — Backend
npm run dev

# Terminal 2 — Frontend (si nécessaire)
npm run dev
```

L'API est accessible sur http://localhost:3000/api/trpc

## Architecture

```
Frontend (React + tRPC client)
  ↓  appelle /api/trpc
Netlify Function (Hono + tRPC server)
  ↓  crée paiement
Mollie API
  ↓  retourne checkoutUrl
Redirection vers Mollie Checkout
  ↓  paiement validé
Redirection vers /success
  ↓  affiche confirmation
Ouverture WhatsApp
```
