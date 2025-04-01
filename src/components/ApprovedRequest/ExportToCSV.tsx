/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React, { useCallback } from "react";
import { ButtonProps } from "react-day-picker";

interface ExportToCSVProps extends ButtonProps {
  data: any[];
  filename?: string;
  children:React.ReactNode
}

export function ExportToCSV({
  data,
  filename = "data",
  children,
  ...props
}: ExportToCSVProps) {
  const exportToCSV = useCallback(() => {
    if (!data || data.length === 0) return;

    // Convert data to CSV
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            const value = row[fieldName];
            return typeof value === "object"
              ? JSON.stringify(value)
              : `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}-${new Date().toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data, filename]);

  return (
    <Button onClick={exportToCSV} variant="outline" {...props}>
      {children || (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </>
      )}
    </Button>
  );
}