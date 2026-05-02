import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";

export interface FileRow {
  id: string;
  fileName: string;
  // Each cell is a key→value pair; keys become column headers in order
  // Example: { Branch: "CSE", Semester: "II-I", "Exam Type": "Regular", "Date Range": "12 May – 30 May 2025" }
  cells: Record<string, string>;
}

interface FileListTableProps {
  rows: FileRow[];
  /** Columns in order — keys must match those used in row.cells */
  columns: string[];
  /** Toggle search box (default true) */
  searchable?: boolean;
  /** Empty-state message */
  emptyMessage?: string;
}

/**
 * Generic table for listing downloadable files (timetables, question papers, forms).
 * Each row has metadata cells + a "Coming soon" download button.
 */
export const FileListTable = ({
  rows,
  columns,
  searchable = true,
  emptyMessage = "No documents available right now. Please check back later.",
}: FileListTableProps) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.fileName, ...Object.values(r.cells)].join(" ").toLowerCase().includes(q),
    );
  }, [rows, query]);

  return (
    <div>
      {searchable && (
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by branch, subject, semester..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:max-w-md rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <FileText className="size-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/10">
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="text-left px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs text-foreground/80 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold uppercase tracking-[0.14em] text-xs text-foreground/80 whitespace-nowrap">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors"
                  >
                    {columns.map((c) => (
                      <td key={c} className="px-4 py-3 text-foreground/85 whitespace-nowrap">
                        {r.cells[c] ?? "—"}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled
                        title={r.fileName}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-70"
                      >
                        <Download className="size-3.5" /> Coming soon
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
