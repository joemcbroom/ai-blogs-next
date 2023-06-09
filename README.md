# Blogverse.ai

Welcome to Blogverse.ai, a simple blog application built using Next.js 13 with the new App Router, server components, and other exciting features!

## Getting Started

To get started with Blogverse.ai, clone this repository and follow the steps below:

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Features

Blogverse.ai is built using Next.js 13 App Router (beta) which includes the following features:

- New file-system based router with support for layouts, nested routing, loading states, error handling, and more.
- Client-side and server-side rendering with client and server components.
- Simplified data fetching with async/await support in React components and the fetch() API.
- Next.js HTTP Cache and client-side cache optimized for server components and client-side navigation.
- Improved Image Component with native browser lazy loading and automatic font optimization.
- Automatic transpilation and bundling of dependencies from local packages or external dependencies.
- Turbopack, a Rust-based Webpack replacement for faster development.

## Directory Structure

- `app`: The main directory containing server components, layouts, and pages for your application.
- `public`: Contains static assets like images, styles, and fonts.
- `components`: Contains reusable client components.
- `lib`: Contains helper functions and utilities.

## Type safety

After making any changes to supabase, run the following command to generate the typescript types:

```bash
npx supabase gen types typescript --project-id "dyhumgxwuzsrinvjiefx" --schema public > lib/types/database.types.ts 
```
if it asks you to login:
```bash
npx supabase login
```
You can generate a new access token here: [https://app.supabase.com/account/tokens](https://app.supabase.com/account/tokens)

## License

Blogverse.ai is [MIT licensed](LICENSE.md).

## Learn More

To learn more about the new features in Next.js 13 App Router, check out the [official documentation](https://nextjs.org/docs/app-router).

