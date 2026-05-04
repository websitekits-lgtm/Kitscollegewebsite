import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";

export interface FileRow {
  id: string;
  fileName: string;
  // Each cell is a key→value pair; keys become column headers in order
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
 * Generic table for listing downloadable files.
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
            className="w-full sm:max-w-md rounded-lg border-2 border-border bg-background pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:border-accent transition-colors"
          />
          {query && (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              {rows.length} documents
            </p>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card/50 p-10 sm:p-14 text-center">
          <div className="grid size-14 mx-auto mb-4 place-items-center rounded-2xl bg-secondary/20">
            <FileText className="size-7 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">{emptyMessage}</p>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-border bg-card shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.12)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent">
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="text-left px-4 sm:px-5 py-3.5 font-bold uppercase tracking-[0.14em] text-[11px] text-foreground/85 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                  <th className="text-right px-4 sm:px-5 py-3.5 font-bold uppercase tracking-[0.14em] text-[11px] text-foreground/85 whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={`border-b border-border last:border-b-0 hover:bg-accent/5 transition-colors ${
                      idx % 2 === 0 ? "bg-background" : "bg-secondary/5"
                    }`}
                  >
                    {columns.map((c) => (
                      <td key={c} className="px-4 sm:px-5 py-3 text-foreground/85 whitespace-nowrap">
                        {r.cells[c] ?? "—"}
                      </td>
                    ))}
                    <td className="px-4 sm:px-5 py-3 text-right">
                      <button
                        type="button"
                        disabled
                        title={r.fileName}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground cursor-not-allowed opacity-70 hover:opacity-100 transition-opacity"
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
