"use client";

import type React from "react";
import { useState } from "react";
import { uploadRecords } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { redirect } from "next/navigation";

type UserAnswerRecord = {
  id: string;
  created_at: string;
  user_id: string;
  user_name: string;
  q_one: string;
  q_two: string;
  q_three: string;
  q_four: string;
  q_five: string;
  q_six: string;
  q_seven: string;
  q_eight: string;
  icon: string;
  email: string;
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
      const unjson: UserAnswerRecord[] = XLSX.utils.sheet_to_json(sheet);

      const json = JSON.parse(JSON.stringify(unjson));

      // Chunk and upload to prevent large payload issues and improve reliability
      const chunkSize = 100;
      for (let i = 0; i < json.length; i += chunkSize) {
        const chunk = json.slice(i, i + chunkSize);
        toast(
          `Uploading chunk ${Math.floor(i / chunkSize) + 1} of ${Math.ceil(json.length / chunkSize)}`
        );

        // Call the server action to insert data
        const result = await uploadRecords("usdupe", chunk);

        if (!result.success) {
          throw new Error(
            "So" + result.message || "Upload failed for a chunk."
          );
        }
      }

      toast("Upload complete!");
      redirect("/data");
    } catch (err: any) {
      toast("Upload failed");
      redirect("/data");
    } finally {
      setLoading(false);
      // Clear the file input after upload attempt
      e.target.value = "";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Excel → Dashboard
        </h1>
        <p className="mb-4 text-center text-gray-600">
          Upload your Excel file (<code>.xlsx</code>, <code>.xls</code>) to
          populate a Supabase table.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Input
            id="excel-file"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFile}
            /*     className="block w-full text-sm text-gray-500
          file:mr-4 file:rounded-full file:border-0
          file:bg-blue-50 file:px-4 file:py-2
          file:text-sm file:font-semibold file:text-blue-700
          hover:file:bg-blue-100" */
            disabled={loading}
          />
          {loading && (
            <p className="text-blue-600">
              Uploading... Please do not close this page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
