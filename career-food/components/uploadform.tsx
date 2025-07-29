"use client";

import type React from "react";
import { useState } from "react";
import { uploadsgsRecords } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { redirect } from "next/navigation";

type sgsLeaders = {
  name: string;
  nickname: string;
  total_bounty: number;
  title: string;
  online: number;
  conventional: number;
  bounty_o: number;
  bounty_c: number;
};

export default function UploadForm() {
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
    } catch (err: any) {
      toast("Upload failed");
    } finally {
      setLoading(false);
      // Clear the file input after upload attempt
      e.target.value = "";
      redirect("/sgs");
    }
  };

  const handleDownload = async () => {
    const response = await fetch("/sgs_sample.xlsx");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "/sgs_sample.xlsx";
    link.click();
  };

  return (
    <div className="flex flex-col text-left space-y-4 text-white">
      <p className="text-muted dark:text-muted-foreground text-md">
        Only accepts .xlsx file.
      </p>
      <Input
        id="excel-file"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFile}
        className="text-muted-foreground bg-white dark:bg-slate-700 dark:text-white file:italic file:text-sm text-sm"
        disabled={loading}
      />
      {/* <div className="h-1 bg-muted dark:bg-muted-foreground rounded-full"></div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">.xlsx Format</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p> Only accepts .xlsx file. Must use these exact headers:</p>
          <ul className="text-xs list-disc list-inside columns-2">
            <li>name (text)</li>
            <li>nickname* (text)</li>
            <li>title (text)</li>
            <li>online (number)</li>
            <li>conventional (number)</li>
            <li>bounty_o (number)</li>
            <li>bounty_c (number)</li>
            <li>total_bounty (number)</li>
          </ul>
          <p className="text-xs italic text-black/40 dark:text-muted-foreground mt-2">
            *Must be unique, no space, no special characters, no caps & no
            edits.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download Sample
          </Button>
        </CardFooter>
      </Card> */}
      {loading && (
        <p className="text-muted dark:text-muted-foreground">
          Uploading... Please do not close this page.
        </p>
      )}
    </div>
  );
}
