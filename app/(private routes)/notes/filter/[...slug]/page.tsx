import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";

import NoteClient from "./Notes.client";
import { Metadata } from "next";

interface NoteProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { slug } = await params;
  const [category] = slug;

  return {
    title: `Notes category: ${category}`,
    description: `Browse all notes in the "${category}" category.`,
    openGraph: {
      title: `Notes category: ${category}`,
      description: `Explore notes categorized under "${category}" on NoteHub.`,
      url: `https://09-auth-gules-phi.vercel.app/notes/filter/${category}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes category: ${category}`,
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
    queryKey: ["notes", "", filter, 1],
    queryFn: () => fetchNotes("", filter, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient filter={filter} />
    </HydrationBoundary>
  );
};

export default Notes;
