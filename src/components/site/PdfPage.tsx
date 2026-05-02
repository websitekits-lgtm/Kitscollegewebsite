import { FileText, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

interface PdfPageProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; to?: string }[];
  /** Optional description shown above the document card */
  description?: string;
  /** Optional file name shown on the card (e.g., "Code-of-Ethics.pdf") */
  fileName?: string;
  /** Optional last-updated label (e.g., "Updated June 2025") */
  lastUpdated?: string;
  /** Optional file size label (e.g., "1.2 MB") */
  fileSize?: string;
}

/**
 * Document download page template.
 * For now, the download button shows "Coming soon" — admin will upload later.
 */
export const PdfPage = ({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  description,
  fileName = "document.pdf",
  lastUpdated,
  fileSize,
}: PdfPageProps) => {
  return (
    <SiteLayout>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} breadcrumb={breadcrumb} />

      <section className="bg-background py-12 md:py-16 lg:py-20">
        <div className="container-tight max-w-3xl">
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              {description}
            </p>
          )}

          {/* Document card */}
          <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
            {/* PDF icon */}
            <div className="grid size-16 sm:size-20 place-items-center rounded-xl bg-accent/10 text-accent shrink-0">
              <FileText className="size-8 sm:size-10" />
            </div>

            {/* File info */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 break-all">{fileName}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground mb-5">
                {lastUpdated && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-accent" /> {lastUpdated}
                  </span>
                )}
                {fileSize && <span>{fileSize}</span>}
              </div>

              <Button disabled size="lg" className="rounded-sm cursor-not-allowed opacity-70">
                <Download className="size-4" /> Coming soon
              </Button>
              <p className="mt-3 text-xs text-muted-foreground italic">
                Document will be available shortly. Please check back later.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};
