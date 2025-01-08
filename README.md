# Jose Benitez Personal Website

A modern, responsive personal website built with Next.js, featuring a blog, portfolio, and neural network visualization background.

## Features

- 🎨 Modern UI with NextUI components
- 🌙 Dark/Light mode support
- ⚡ Server-side rendering with Next.js
- 📝 MDX-powered blog
- 🧠 Neural network background visualization
- ⌨️ Command palette (kbar) integration
- 🎯 Responsive design
- 🔍 SEO optimized
- 📊 Reading progress indicator
- 🔄 Infinite scroll repositories

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [NextUI v2](https://nextui.org/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [MDX](https://mdxjs.com/) - Markdown/JSX integration
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Kbar](https://kbar.vercel.app/) - Command palette
- [Supabase](https://supabase.com/) - Database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── utils/           # Helper functions
├── content/
│   └── posts/           # MDX blog posts
├── public/              # Static assets
└── ...config files
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextUI Documentation](https://nextui.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.