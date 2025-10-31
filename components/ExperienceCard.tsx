import Link from "next/link";
import Image from "next/image";
import { Experience } from "@/lib/data";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <span className="text-sm bg-gray-200 px-2 py-1 rounded text-gray-700">
            {experience.location}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{experience.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">From </span>
            <span className="text-lg font-semibold">₹{experience.price}</span>
          </div>
          <Link
            href={`/details/${experience.id}`}
            className="px-4 py-2 bg-primary text-black font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
