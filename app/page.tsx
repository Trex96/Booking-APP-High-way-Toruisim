import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  console.log("Page component - Received searchParams:", params);
  
  // Handle the query parameter
  // undefined = no query parameter (show hero + all experiences)
  // empty string = empty query parameter (show hero + all experiences)
  // non-empty string = search query (hide hero + filter experiences)
  let query = params.q;
  console.log("Page component - Processed query:", { query, type: typeof query });

  return <HomeContent query={query} />;
}