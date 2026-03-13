# Portfolio

Personal portfolio: education, experience, projects. Built with Next.js 14, TypeScript, Tailwind CSS. Only you can edit; visitors see read-only content.

## Deploy on Vercel (public link)

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in. Click **Add New → Project** and import your repo.
3. Add an environment variable so only you can unlock editing:
   - In the project, go to **Settings → Environment Variables**
   - Name: `EDIT_SECRET`
   - Value: a strong password only you know (e.g. a long random string)
   - Save and redeploy if the project was already deployed.
4. Deploy. Vercel will build and give you a URL like `https://your-project.vercel.app`.

**Visitors:** See the portfolio with no “Add” or “Edit” buttons.  
**You:** Open your site, click **Unlock** in the header, enter your `EDIT_SECRET` password. You can then add/edit/remove education, experience, and projects. Click **Logout** when done.

Edits are stored in **your browser** (localStorage). To have new or updated content appear for everyone, update `src/data/portfolio.ts` and push so Vercel redeploys.

## Run locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set EDIT_SECRET=your-password
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Unlock** and your password to edit.

## Edit default content (in code)

- **Personal info & photo**: `src/data/portfolio.ts` — `name`, `title`, `bio`, `email`. Photo: use the in-site picker or `public/photo.jpg` and `photo: '/photo.jpg'`.
- **Logos**: `public/logo-undip.png`, `public/logo-pama.png`.
- **Education / Experience / Projects**: Edit the arrays in `src/data/portfolio.ts`. This is what visitors see on first load and what the site uses if they have no saved data in their browser.

## Structure

```
src/
  app/          layout, page, /edit (unlock), API routes (auth, can-edit)
  components/   Header, Footer, EditablePortfolio, AuthProvider, etc.
  data/         portfolio.ts
```
