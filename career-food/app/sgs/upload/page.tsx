"use client";

import type React from "react";
import { useState } from "react";
import { uploadsgsRecords } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { redirect } from "next/navigation";
import UploadForm from "@/components/uploadform";

type sgsLeaders = {
  name: string;
  nickname: string;
  referrals: number;
  bounty: number;
  title: string;
  weekly: {
    w1: number;
    w2: number;
    w3: number;
    w4: number;
  };
  campus: string;
};

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    toast("Processing file...");

    try {
      // Read file as ArrayBuffer
      const data = await file.arrayBuffer();
      // Parse workbook
      const workbook = XLSX.read(data);
      // Assume first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Convert to JSON
      const unjson: sgsLeaders[] = XLSX.utils.sheet_to_json(sheet);

      const json = JSON.parse(JSON.stringify(unjson));

      // Chunk and upload to prevent large payload issues and improve reliability
      const chunkSize = 100;
      for (let i = 0; i < json.length; i += chunkSize) {
        const chunk = json.slice(i, i + chunkSize);
        toast(
          `Uploading chunk ${Math.floor(i / chunkSize) + 1} of ${Math.ceil(json.length / chunkSize)}`
        );

        // Call the server action to insert data
        const result = await uploadsgsRecords("sgsleads", chunk);

        if (!result.success) {
          throw new Error(
            "So" + result.message || "Upload failed for a chunk."
          );
        }
      }

      toast("Upload complete!");
      redirect("/sgs");
    } catch (err: any) {
      toast("Upload failed");
      redirect("/sgs");
    } finally {
      setLoading(false);
      // Clear the file input after upload attempt
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen items-center justify-center bg-gray-100 p-4 absolute inset-0 flex">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Update SGS Leaderboard
        </h1>

        <UploadForm />
        {/* <div className="flex flex-col items-center space-y-4">
          <Input
            id="excel-file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFile}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:rounded-full file:border-0
          file:bg-blue-50 file:px-4 file:py-2
          file:text-sm file:font-semibold file:text-blue-700
          hover:file:bg-blue-100"
            disabled={loading}
          />
          {loading && (
            <p className="text-blue-600">
              Uploading... Please do not close this page.
            </p>
          )}
        </div> */}

        {loading && (
          <p className="text-blue-600">
            Uploading... Please do not close this page.
          </p>
        )}
      </div>
    </div>
  );
}
