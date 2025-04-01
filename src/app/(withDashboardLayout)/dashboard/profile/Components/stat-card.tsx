'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
// import { Icons } from "@/components/icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
}

export function StatCard({ title, value }: StatCardProps) {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <Icon className="h-4 w-4 text-muted-foreground" /> */}
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
        onClick={()=>setIsBlurred(!isBlurred)} className="text-xs text-muted-foreground mt-1 cursor-pointer">
          {isBlurred ? "Click to reveal" : "Click to hide"}
        </p>
      </CardContent>
    </Card>
  );
}