import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

export interface DataTableColumn<T> {
  /** Stable column key */
  key: string;
  /** Header label */
  header: string;
  /** Cell renderer — receives the row and the row index */
  render: (row: T, index: number) => ReactNode;
  /** Optional alignment */
  align?: "left" | "center" | "right";
  /** Optional Tailwind classes for the column cells */
  className?: string;
  /** Hide on small screens */
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Stable identifier for each row */
  rowKey: (row: T, index: number) => string | number;
  /** Empty-state message */
  emptyTitle?: string;
  emptyDescription?: string;
  /** Row click handler */
  onRowClick?: (row: T) => void;
}

/**
 * Lightweight tabular component used throughout the portals.
 * Uses simple Tailwind tables rather than a full data-grid library —
 * easy to customise per page (sorting / pagination can be added later).
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyTitle = "Nothing to show",
  emptyDescription = "Data will appear here once available.",
  onRowClick,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/10">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                  c.align !== "right" && c.align !== "center" && "text-left",
                  c.hideOnMobile && "hidden md:table-cell",
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={rowKey(row, idx)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-t border-border transition-colors",
                idx % 2 === 1 && "bg-secondary/5",
                onRowClick && "cursor-pointer hover:bg-accent/5",
              )}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "px-4 py-3 text-foreground",
                    c.align === "right" && "text-right tabular-nums",
                    c.align === "center" && "text-center",
                    c.hideOnMobile && "hidden md:table-cell",
                    c.className,
                  )}
                >
                  {c.render(row, idx)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
