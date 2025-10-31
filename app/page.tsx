import Header from "@/components/Header";
import ExperienceCard from "@/components/ExperienceCard";
import { experiences } from "@/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  
  const filteredExperiences = query
    ? experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query)
      )
    : experiences;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No experiences found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
