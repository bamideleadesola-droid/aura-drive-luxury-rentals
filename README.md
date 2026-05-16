# AURA DRIVE Luxury Rentals

A bright, minimal luxury-only car rental hero section inspired by premium automotive layouts, built with React and Vite.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Lead Email Delivery

The `/api/submit` endpoint sends booking, availability, and contact requests to Resend when these Vercel environment variables are configured:

```bash
RESEND_API_KEY=...
RESEND_FROM_EMAIL="AURA DRIVE <bookings@yourdomain.com>"
AURA_DRIVE_LEADS_TO_EMAIL="bookings@yourdomain.com"
```

Optional:

```bash
FORM_WEBHOOK_URL=...
```

If `RESEND_API_KEY` or `AURA_DRIVE_LEADS_TO_EMAIL` is missing, submissions still return a reference and are logged by the serverless function.
