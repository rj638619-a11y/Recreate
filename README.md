# GlassNotes

A responsive personal learning workspace for PDF reading, rich notes, folders, Drive backup, and offline access.

## Getting started

1. Copy `.env.example` to `.env` and configure a Firebase web app.
2. Run `node server.js`. The zero-dependency preview server binds to all interfaces, so browser-based workspaces can expose a preview without installing packages.
3. Deploy `firestore.rules` and `storage.rules` with the Firebase CLI.

The application shell has PWA caching, IndexedDB note persistence, responsive dashboard views, and security rule templates.
