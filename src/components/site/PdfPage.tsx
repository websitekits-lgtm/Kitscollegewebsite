import { FileText, Download, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { useDocument, docKeyFromTitle } from "@/lib/useDocuments";

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
  /** Document slot key. Defaults to the slugified title — matches Admin → Documents. */
  docKey?: string;
}

/**
 * Document download page template.
 * The download button goes live automatically once the admin uploads a file
 * into this page's document slot (Admin → Documents); until then "Coming soon".
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
  docKey,
}: PdfPageProps) => {
  const doc = useDocument(docKey ?? docKeyFromTitle(title));
  const shownFileName = doc?.file_name ?? fileName;
  const shownUpdated = doc
    ? `Updated ${new Date(doc.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`
    : lastUpdated;
  const shownSize = doc?.file_size ?? fileSize;
  return (
    <SiteLayout>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} breadcrumb={breadcrumb} />

      <section className="relative bg-background bg-dots py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/8 blur-3xl pointer-events-none" aria-hidden />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-3xl pointer-events-none" aria-hidden />

        <div className="container-tight max-w-3xl relative">
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 text-center">
              {description}
            </p>
          )}

          {/* Document card */}
          <div className="relative rounded-2xl border-2 border-border bg-card shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.18)] p-6 sm:p-10 overflow-hidden">
            {/* Decorative corner shape */}
            <span className="absolute -top-20 -right-20 size-48 rounded-full bg-accent/5" aria-hidden />
            <span className="absolute -bottom-20 -left-20 size-40 rounded-full bg-secondary/5" aria-hidden />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7">
              {/* PDF icon — bigger and more prominent */}
              <div className="grid size-20 sm:size-24 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent/70 text-accent-foreground shrink-0 shadow-[0_12px_30px_-10px_hsl(var(--accent)/0.4)]">
                <FileText className="size-10 sm:size-12" strokeWidth={1.8} />
              </div>

              {/* File info */}
              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20 mb-3">
                  <ShieldCheck className="size-3" /> Official Document
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 break-all font-mono bg-secondary/10 px-3 py-1 rounded-md inline-block">
                  {shownFileName}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground mb-6">
                  {shownUpdated && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5 text-accent" />
                      <span className="font-medium">{shownUpdated}</span>
                    </span>
                  )}
                  {shownSize && (
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <FileText className="size-3.5 text-accent" /> {shownSize}
                    </span>
                  )}
                </div>

                {doc ? (
                  <Button asChild size="lg" className="rounded-md shadow-md">
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="size-4" /> Download PDF
                    </a>
                  </Button>
                ) : (
                  <>
                    <Button disabled size="lg" className="rounded-md cursor-not-allowed opacity-80 shadow-md">
                      <Download className="size-4" /> Coming soon
                    </Button>
                    <p className="mt-3 text-xs text-muted-foreground italic">
                      Document will be available shortly. Please check back later.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};
