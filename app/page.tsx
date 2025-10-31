import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import { Experience } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Fetch experiences from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/experiences`, { 
    cache: 'no-store' 
  });
  const experiences: Experience[] = await res.json();

  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  return <HomeContent experiences={experiences} query={query} />;
}
