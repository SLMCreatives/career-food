// app/pathway/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { start } from "repl";
import { useState } from "react";
import PathwayJourney from "@/components/pathway/pathway-journey";

const pathways = [
  {
    level: "Certificate",
    entry: "No SPM Credits",
    duration: "6 - 12 months",
    outcome: "Part-time jobs, minimum wage roles. Basic work readiness.",
    notes:
      "Great starting point for students with no SPM credits. Cannot progress to Diploma directly.",
    link: "https://www.unitar.my/academic-programmes/undergraduate/certificate/",
    programmes: ["Early Childhood Education", "Business and Management"]
  },
  {
    level: "Foundation",
    entry: "Minimum 1 SPM Credit",
    duration: "12 - 16 months",
    outcome: "Progress to Bachelor. General studies in Arts, IT or Management.",
    notes:
      "Highly recommended! One of the most affordable in Malaysia. Online options available.",
    link: "https://www.unitar.my/academic-programmes/undergraduate/foundation/",
    programmes: ["Arts", "Information Technology", "Management"]
  },
  {
    level: "Diploma",
    entry: "Minimum 3 SPM Credits",
    duration: "2 - 2.5 years",
    outcome: "Entry to mid-level jobs. Higher pay and more responsibilities.",
    notes: "Better chance for promotion or scholarship.",
    link: "https://www.unitar.my/academic-programmes/undergraduate/diploma/",
    programmes: [
      "Early Childhood Education",
      "Business Administration",
      "E-Secretaryship"
    ]
  },
  {
    level: "Bachelor",
    entry: "Minimum 5 SPM Credits",
    duration: "3+ years",
    outcome: "Executive-level roles. Develop leadership and high-level skills.",
    notes: "Online learning available. Ideal for independent learners.",
    link: "https://www.unitar.my/academic-programmes/undergraduate/bachelor-degree/",
    programmes: ["Education", "Business Management", "Digital Marketing"]
  },
  {
    level: "Masters",
    entry: "Bachelor Degree",
    duration: "1+ year",
    outcome: "Specialised or expert-level jobs. Higher pay, high demand.",
    notes: "Great for career advancement and recognition.",
    link: "https://www.unitar.my/academic-programmes/postgraduate/master/",
    programmes: ["Education Management", "MBA", "Digital Education"]
  },
  {
    level: "Doctorate",
    entry: "Masters Degree",
    duration: "3+ years",
    outcome: "C-level positions, consultants, respected experts.",
    notes: "Earn the title of 'Dr.' Lead in research, innovation and impact.",
    link: "https://www.unitar.my/academic-programmes/postgraduate/doctorate/",
    programmes: ["Doctor of Philosophy", "Doctor of Business Administration"]
  }
];

export default function PathwayExplorer() {
  const [pathway, setPathway] = useState("false");
  if (!Array.isArray(pathways) || pathways.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Kenali Jalan Pengajian Anda</h1>
        <p className="text-red-600">No pathway data available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Kenali Jalan Pengajian Anda
      </h1>
      <p className=" mb-10 text-white">
        Pilih jalan pengajian yang sesuai dengan kelayakan dan matlamat kerjaya
        anda. Setiap jalan mempunyai kelebihan tersendiri. Pastikan anda
        memahami setiap pilihan sebelum membuat keputusan.
      </p>

      <div className="flex justify-between items-center mb-6">
        <Button
          variant="default"
          className="bg-black text-white"
          onClick={() => setPathway("true")}
        >
          Mulakan Perjalanan
        </Button>
      </div>

      {pathway === "true" && <PathwayJourney />}
      {/* 
      <div className="space-y-6">
        {pathways.map((path) => (
          <Card key={path.level} className="border rounded-2xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                {path.level}
              </h2>
              <p>
                <strong>Entry Requirement:</strong> {path.entry}
              </p>
              <p>
                <strong>Duration:</strong> {path.duration}
              </p>
              <p>
                <strong>Outcomes:</strong> {path.outcome}
              </p>
              <p>{path.notes}</p>

              <div>
                <p className="font-semibold">Top UNITAR Programmes:</p>
                <ul className="list-disc list-inside">
                  {Array.isArray(path.programmes) &&
                    path.programmes.map((prog) => <li key={prog}>{prog}</li>)}
                </ul>
              </div>

              <Link href={path.link} target="_blank">
                <Button variant="default">
                  Explore {path.level} Programmes
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
