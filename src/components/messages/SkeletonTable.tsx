import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function SkeletonTable() {
  return (
    <div className="rounded-md border border-slate-800 bg-[#1C1C24] shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-[#13131A]">
          <TableRow className="border-slate-800">
            <TableHead className="w-[300px]"><Skeleton className="h-4 w-20 bg-slate-800" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16 bg-slate-800" /></TableHead>
            <TableHead className="w-[180px] text-right"><Skeleton className="h-4 w-24 ml-auto bg-slate-800" /></TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="border-slate-800">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full bg-slate-800" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-32 bg-slate-800" />
                    <Skeleton className="h-3 w-24 bg-slate-800" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-40 bg-slate-800" />
                    <Skeleton className="h-5 w-16 rounded-full bg-slate-800" />
                  </div>
                  <Skeleton className="h-3 w-64 bg-slate-800" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-4 w-20 bg-slate-800" />
                  <Skeleton className="h-3 w-16 bg-slate-800" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
