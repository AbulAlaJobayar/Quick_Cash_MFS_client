'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: string; // Made optional since you're not using it
}

export function StatCard({ title, value }: StatCardProps) {
  const [isBlurred, setIsBlurred] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={`text-2xl font-bold transition-all duration-300 ${
            isBlurred ? "filter blur-md" : "filter-none"
          }`}
        >
          {value}
        </div>
        <p
          onClick={() => setIsBlurred(!isBlurred)} 
          className="text-xs text-muted-foreground mt-1 cursor-pointer"
        >
          {isBlurred ? "Click to reveal" : "Click to hide"}
        </p>
      </CardContent>
    </Card>
  );
}