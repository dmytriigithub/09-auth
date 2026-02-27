import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note | NoteHub",
  description:
    "Add a new note to your collection. Fill in the title, content, and tag to organize your ideas easily.",
  openGraph: {
    title: "Create a New Note | NoteHub",
    description:
      "Use this page to create and save a new note in your NoteHub workspace.",
    url: "https://09-auth-gules-phi.vercel.app/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a new note on NoteHub",
      },
    ],
    type: "article",
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
