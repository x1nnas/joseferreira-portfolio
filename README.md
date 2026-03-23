# Jose Ferreira Portfolio

Personal portfolio website built with React and Vite, focused on clean project presentation, responsive design, and a strong frontend-first experience.

## Live Sections

- Home, About, Projects, Contact
- Project detail pages with screenshot galleries
- Blog list and blog detail pages (with local fallback content for frontend-only hosting)
- Admin login entry point (for future backend-enabled content management)

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router

## Project Structure

```text
src/
  components/      Shared UI components (header, nav, layout, guards)
  pages/           Route pages (Home, About, Projects, Blogs, Login, etc.)
  data/            Static content sources (projects, dummy blog data)
  api/             Frontend API adapters with graceful fallback behavior
public/
  assets/          Images, videos, and project screenshots
server/            Optional backend (kept for future use)
```

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend dev server:

```bash
npm run dev-frontend
```

App runs at:

```text
http://localhost:3001
```

If you want full-stack local development (optional):

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

Build output is generated in:

```text
dist/
```

## Deploy (Frontend-only on Vercel)

- Root directory: repository root (`.`)
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required for frontend-only mode

## Notes

- Blog pages are configured to work even when backend APIs are unavailable by falling back to local portfolio blog content.
- The backend folder remains in the repository for future reactivation of admin/blog management workflows.