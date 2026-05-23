import { FileText, GraduationCap, Award, Settings2 } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { DataTable, type DataTableColumn } from "@/portal/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { regulations, gradeScale, type Regulation, type GradePoint } from "@/portal/mock/examData";

const regCols: DataTableColumn<Regulation>[] = [
  { key: "code", header: "Code", render: (r) => <span className="font-mono text-sm font-bold">{r.code}</span> },
  { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "scheme", header: "Scheme", render: (r) => r.scheme, hideOnMobile: true },
  { key: "from", header: "Effective", render: (r) => <span className="tabular-nums">{r.effectiveFrom}</span>, align: "center", hideOnMobile: true },
  { key: "cred", header: "Credits", render: (r) => r.totalCredits, align: "center" },
  { key: "pass", header: "Pass", render: (r) => `${r.passMarks}%`, align: "center", hideOnMobile: true },
  {
    key: "active", header: "Status", align: "center",
    render: (r) => (
      <Badge variant="outline" className={r.active ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border"}>
        {r.active ? "Active" : "Legacy"}
      </Badge>
    ),
  },
];

const gradeCols: DataTableColumn<GradePoint>[] = [
  { key: "range", header: "Marks Range", render: (g) => <span className="font-mono">{g.range}</span> },
  { key: "grade", header: "Grade", render: (g) => <span className="font-display text-lg font-bold text-accent">{g.grade}</span>, align: "center" },
  { key: "points", header: "Grade Points", render: (g) => <span className="tabular-nums font-bold">{g.points.toFixed(1)}</span>, align: "center" },
  {
    key: "desc", header: "Description", align: "center",
    render: (g) => (
      <Badge variant="outline" className={
        g.points >= 9 ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : g.points >= 6 ? "border-accent/30 bg-accent/10 text-accent"
        : g.points > 0 ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "border-destructive/30 bg-destructive/10 text-destructive"
      }>{g.description}</Badge>
    ),
  },
];

const cbcsRules = [
  { title: "Choice of electives", detail: "Students choose 4 electives per semester from a pool of 12+ subjects." },
  { title: "Credit transfer", detail: "Up to 20% credits transferable from approved partner universities and MOOC platforms." },
  { title: "Audit courses", detail: "Up to 2 mandatory audit courses per programme — pass / fail only, no credits." },
  { title: "Internships", detail: "Mandatory 8-week summer internship with 4 credits after 4th semester." },
  { title: "Project work", detail: "Capstone project in 7th and 8th semesters worth 12 credits combined." },
];

const graceRules = [
  { title: "Borderline pass", detail: "Up to 3 marks may be added to fail papers if the student is within 3 marks of pass." },
  { title: "Distinction support", detail: "Up to 2 marks may be added in one paper to award First class with distinction." },
  { title: "Final semester", detail: "Up to 5 grace marks total in the final semester to clear pending requirements." },
  { title: "Restrictions", detail: "Grace marks cannot be added to subjects where the student has been absent or detained." },
];

const policies = [
  { title: "Attendance — minimum 75%", detail: "Students below 75% are detained from end-sem exams unless condoned by the principal." },
  { title: "Maximum duration", detail: "Students must complete the 4-year programme within 8 years from admission." },
  { title: "Re-admission", detail: "Discontinued students may seek re-admission within 2 years subject to vacancy." },
  { title: "Plagiarism", detail: "Reports and theses must pass plagiarism check below 25% similarity index." },
];

const ExamRegulations = () => (
  <PortalLayout>
    <PortalPageHeader
      title="Regulations & Autonomous System"
      subtitle="Active regulations, grade scale, CBCS rules and academic policies."
      icon={FileText}
      breadcrumb={[{ label: "Exam Cell", to: "/portal/exam" }, { label: "Regulations" }]}
    />

    <Tabs defaultValue="regs">
      <TabsList className="bg-secondary/10 mb-5 flex-wrap h-auto">
        <TabsTrigger value="regs">Regulations</TabsTrigger>
        <TabsTrigger value="grades">Grade Scale</TabsTrigger>
        <TabsTrigger value="cbcs">CBCS Rules</TabsTrigger>
        <TabsTrigger value="grace">Grace Marks</TabsTrigger>
        <TabsTrigger value="policies">Academic Policies</TabsTrigger>
      </TabsList>

      <TabsContent value="regs">
        <SectionCard title="JNTUA / Autonomous Regulations" description="One row per regulation — links each to its active batches.">
          <DataTable columns={regCols} rows={regulations} rowKey={(r) => r.code} />
        </SectionCard>
      </TabsContent>

      <TabsContent value="grades">
        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard title="10-Point Grade Scale" className="lg:col-span-2">
            <DataTable columns={gradeCols} rows={gradeScale} rowKey={(g) => g.grade} />
          </SectionCard>
          <SectionCard title="SGPA / CGPA formula">
            <div className="space-y-3 text-sm text-foreground/85">
              <div className="rounded-md border border-border p-3 bg-secondary/5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">SGPA</p>
                <p className="mt-1 font-mono">Σ (Cᵢ × Gᵢ) / Σ Cᵢ</p>
                <p className="mt-1 text-xs text-muted-foreground">Per semester</p>
              </div>
              <div className="rounded-md border border-border p-3 bg-secondary/5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">CGPA</p>
                <p className="mt-1 font-mono">Σ (Cⱼ × SGPAⱼ) / Σ Cⱼ</p>
                <p className="mt-1 text-xs text-muted-foreground">Across all completed semesters</p>
              </div>
              <p className="text-xs text-muted-foreground">
                <Award className="size-3.5 inline mr-1 text-amber-500" />
                ≥ 8.0 with no first-attempt fail = First class with distinction.
              </p>
            </div>
          </SectionCard>
        </div>
      </TabsContent>

      <TabsContent value="cbcs">
        <SectionCard title="CBCS — Choice Based Credit System" description="Key rules for elective selection and credits.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {cbcsRules.map((r) => (
              <li key={r.title} className="rounded-md border border-border p-4">
                <div className="flex items-start gap-3">
                  <div className="grid size-9 place-items-center rounded-md bg-accent/10 text-accent shrink-0">
                    <Settings2 className="size-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="grace">
        <SectionCard title="Grace Marks Rules" description="When and how grace marks can be awarded.">
          <ul className="space-y-3">
            {graceRules.map((r) => (
              <li key={r.title} className="rounded-md border border-border p-4">
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 size-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>

      <TabsContent value="policies">
        <SectionCard title="Academic Policies" description="Standing rules referenced by HoDs, faculty and students.">
          <ul className="space-y-3">
            {policies.map((p) => (
              <li key={p.title} className="rounded-md border border-border p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 size-4 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </TabsContent>
    </Tabs>
  </PortalLayout>
);

export default ExamRegulations;
