"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Link from "next/link";

export default function ConfirmationPage() {
  const router = useRouter();
  const [refId, setRefId] = useState("");

  useEffect(() => {
    const ref = sessionStorage.getItem("refId");
    if (!ref) {
      router.push("/");
    } else {
      setRefId(ref);
    }
  }, [router]);

  if (!refId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-green-500 rounded-full p-4 mb-6">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed</h1>
          <p className="text-gray-600 mb-8">Ref ID: {refId}</p>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
