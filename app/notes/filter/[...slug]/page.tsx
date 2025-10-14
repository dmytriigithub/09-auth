import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NoteClient from "./Notes.client";

interface NoteProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NoteProps) {
  const { slug } = await params;
  const [category] = slug;

  return {
    title: `Notes category: ${category}`,
    description: `Notes category: ${category}`,
    openGraph: {
      title: `Notes category: ${category}`,
      description: `Notes category: ${category}`,
      url: `https://08-zustand-six-liard.vercel.app/notes/filter/${category}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: category,
        },
      ],
      type: "article",
    },
  };
}

const Notes = async ({ params }: NoteProps) => {
  const { slug } = await params;
  const [category] = slug;

  const filter = category !== "All" ? category : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", filter],
    queryFn: () => fetchNotes("", 1, filter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient filter={filter} />
    </HydrationBoundary>
  );
};

export default Notes;
