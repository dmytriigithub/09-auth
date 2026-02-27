// app/not-found.tsx
import type { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "The page you’re looking for doesn’t exist on NoteHub.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "This page could not be found on NoteHub.",
    url: "https://09-auth-gules-phi.vercel.app/not-found",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 Page Not Found | NoteHub",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <main>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
};

export default NotFound;
