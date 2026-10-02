# Orbit

A private chat network for Scaler School of Business students and alumni. Only `@ssb.scaler.com` emails can join.

## What it does

- **Big Bang**: one chat every verified member is in. It's the first screen after login.
- **WhatsApp-style ticks**: one grey tick (sent), two grey (delivered), two blue (read by everyone). Tap the ticks to see who read your message.
- **Pinned messages**: up to 3 per chat, with a banner that jumps to each one.
- **Interest groups**: anyone can create a group and becomes its admin. Admins invite people, and others can request an invite from Discover.
- **People directory**: display names are free to choose, and the verified email is always visible.
- **Cosmic avatars**: 18 celestial profile pictures.

## Status: clickable prototype

Everything runs in the browser using `localStorage`. There is no backend yet, which means:

- The email verification code is shown on screen instead of being emailed.
- Data stays on one device and browser. Two phones can't chat with each other yet.
- To test with several people, create multiple accounts and switch between them from your profile ("Demo: switch account").

## Run it

Open `index.html` in any browser. No build step or install needed.

## Configure

At the top of the `<script>` in `index.html`:

- `DOMAINS`: the allowed email domains.
- `MAIN_CHAT`: the name of the main chat.
- `MAX_PINS`: how many pins each chat allows.
- Batch years are limited to 2020 through the current year + 2.

## Next: production build

Next.js + Supabase (email codes restricted to the college domain, Postgres with row-level security, Realtime for live chat and read receipts).
