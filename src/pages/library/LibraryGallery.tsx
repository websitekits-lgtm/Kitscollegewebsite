import { Image as ImageIcon } from "lucide-react";
import { InfoPage } from "@/components/site/InfoPage";
import { librarySidebar } from "./LibrarySidebar";

const LibraryGallery = () => (
  <InfoPage
    eyebrow="Central Library"
    title="Library Gallery"
    subtitle="A glimpse of our reading halls, digital wing, and library events."
    breadcrumb={[{ label: "Library", to: "/library" }, { label: "Gallery" }]}
    sidebar={librarySidebar}
  >
    <div className="not-prose rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <ImageIcon className="size-12 text-muted-foreground/40 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Library gallery photos will be uploaded soon. Please check back later or visit the main{" "}
        <a href="/gallery" className="text-accent hover:underline">campus gallery</a> for more.
      </p>
    </div>
  </InfoPage>
);

export default LibraryGallery;
