"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// ---------- Extend the module to include custom meta properties ----------
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    numeric?: boolean;
  }
}

// ---------- Types ----------
type VideoRow = {
  title: string;
  visibility: "Public" | "Private" | "Unlisted";
  restrictions: "None" | "Age-restricted" | "Copyright claim";
  date: string; // pretty date string or ISO formatted (rendered as-is here)
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  ctr: number; // 0..1 (e.g. 0.052 = 5.2%)
  avgDuration: string; // "4:30"
};

// ---------- Small UI ----------
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex h-7 items-center rounded-full bg-white/80 px-3 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
    {children}
  </span>
);

const number = (n: number) => n.toLocaleString();
const percent = (p: number) =>
  (p * 100).toLocaleString(undefined, { maximumFractionDigits: 1 }) + "%";

// ---------- Columns ----------
const columns: ColumnDef<VideoRow>[] = [
  {
    header: "Video",
    accessorKey: "title",
    cell: ({ getValue }) => (
      <div className="max-w-[320px] truncate font-medium text-gray-800">
        {getValue<string>()}
      </div>
    ),
  },
  {
    header: "Visibility",
    accessorKey: "visibility",
    cell: ({ getValue }) => <Pill>{getValue<string>()}</Pill>,
  },
  {
    header: "Restrictions",
    accessorKey: "restrictions",
    cell: ({ getValue }) => <Pill>{getValue<string>()}</Pill>,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) => (
      <span className="text-gray-700">{getValue<string>()}</span>
    ),
  },
  {
    header: "Views",
    accessorKey: "views",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{number(getValue<number>())}</span>
    ),
    meta: { numeric: true },
  },
  {
    header: "Comments",
    accessorKey: "comments",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{number(getValue<number>())}</span>
    ),
    meta: { numeric: true },
  },
  {
    header: "Likes",
    accessorKey: "likes",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{number(getValue<number>())}</span>
    ),
    meta: { numeric: true },
  },
  {
    header: "Dislikes",
    accessorKey: "dislikes",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{number(getValue<number>())}</span>
    ),
    meta: { numeric: true },
  },
  {
    header: "CTR",
    accessorKey: "ctr",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{percent(getValue<number>())}</span>
    ),
    meta: { numeric: true },
  },
  {
    header: "Avg. view duration",
    accessorKey: "avgDuration",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{getValue<string>()}</span>
    ),
    meta: { numeric: true },
  },
];

// ---------- Sample data (swap with your data/props) ----------
const data: VideoRow[] = [
  {
    title: "Exploring the Hidden Gems of the Pacific Northwest",
    visibility: "Public",
    restrictions: "None",
    date: "May 15, 2024",
    views: 2500,
    comments: 120,
    likes: 350,
    dislikes: 15,
    ctr: 0.052,
    avgDuration: "4:30",
  },
  {
    title: "A Day in the Life of a Software Engineer",
    visibility: "Public",
    restrictions: "None",
    date: "May 10, 2024",
    views: 3200,
    comments: 150,
    likes: 400,
    dislikes: 20,
    ctr: 0.061,
    avgDuration: "5:15",
  },
  {
    title: "Top 5 Productivity Tips for Remote Workers",
    visibility: "Public",
    restrictions: "None",
    date: "May 5, 2024",
    views: 2800,
    comments: 130,
    likes: 380,
    dislikes: 18,
    ctr: 0.058,
    avgDuration: "4:45",
  },
  {
    title: "Behind the Scenes: Creating a Viral Video",
    visibility: "Public",
    restrictions: "None",
    date: "April 30, 2024",
    views: 2000,
    comments: 100,
    likes: 280,
    dislikes: 12,
    ctr: 0.049,
    avgDuration: "4:00",
  },
  {
    title: "The Future of Artificial Intelligence: A Discussion",
    visibility: "Public",
    restrictions: "None",
    date: "April 25, 2024",
    views: 1500,
    comments: 80,
    likes: 200,
    dislikes: 10,
    ctr: 0.045,
    avgDuration: "3:30",
  },
];

// ---------- Component ----------
export default function LatestVideosTableResponsive() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-100">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Latest videos
      </h2>

      {/* Desktop / Tablet: real table with horizontal scroll */}
      <div className="hidden sm:block overflow-x-auto rounded-xl bg-white ring-1 ring-gray-200">
        <table className="min-w-[980px] w-full border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className={[
                      "sticky top-0 z-10 bg-white text-left text-sm font-semibold",
                      "text-gray-500",
                      "px-5 py-3",
                      header.column.columnDef.meta?.numeric ? "text-right" : "",
                    ].join(" ")}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? "bg-rose-50/30" : "bg-white"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={[
                      "px-5 py-4 align-middle text-sm text-gray-800",
                      "border-t border-gray-100",
                      cell.column.columnDef.meta?.numeric ? "text-right" : "",
                    ].join(" ")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards with labels */}
      <div className="sm:hidden space-y-3">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="rounded-xl bg-white p-4 ring-1 ring-gray-200"
          >
            {row.getVisibleCells().map((cell, idx) => {
              const isNumeric = !!cell.column.columnDef.meta?.numeric;
              return (
                <div
                  key={cell.id}
                  className={[
                    "flex items-start justify-between gap-3 py-2",
                    idx === 0 ? "pt-0" : "",
                  ].join(" ")}
                >
                  <span className="min-w-[9rem] text-sm font-medium text-gray-500">
                    {cell.column.columnDef.header as string}
                  </span>
                  <div
                    className={[
                      "text-sm text-gray-800",
                      "max-w-[60%] text-right",
                      isNumeric ? "tabular-nums" : "",
                    ].join(" ")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
