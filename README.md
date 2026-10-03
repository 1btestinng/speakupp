# Speak Up

Privacy-first public experience board.

## Environment

Set these variables in Vercel/local development:

- DATABASE_URL — PostgreSQL connection string.
- SPEAKUP_ADMIN_PASSWORD — private admin password.

The app creates its PostgreSQL tables automatically on first API request.

Accounts use username + password and generate a one-time backup secret at registration. No email or phone number is required.

## v1

- Immediate publishing
- Newest-first chronological feed
- Username/password accounts
- One-time backup secret password recovery
- Owner-only admin deletion
- QIndex-inspired visual system and motion
