import type { ReactNode } from "react";
import { SectionCard } from "./SectionCard";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: { label: string; to?: string; onClick?: () => void };
  /** Tailwind height class for the chart container (default h-64) */
  height?: string;
  /** Extra class names for the outer container (e.g. "lg:col-span-2") */
  className?: string;
  children: ReactNode;
}

/**
 * SectionCard variant pre-sized for a recharts ResponsiveContainer.
 * Pass the chart (ResponsiveContainer + chart type) as children.
 */
export const ChartCard = ({ title, description, action, height = "h-64", className, children }: ChartCardProps) => (
  <SectionCard title={title} description={description} action={action} className={className}>
    <div className={`w-full ${height}`}>{children}</div>
  </SectionCard>
);
