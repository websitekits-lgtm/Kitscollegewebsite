import { Settings, User, KeyRound, Bell, LogOut } from "lucide-react";
import { PortalLayout } from "@/portal/components/PortalLayout";
import { PortalPageHeader } from "@/portal/components/PortalPageHeader";
import { SectionCard } from "@/portal/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/portal/lib/auth";
import { studentProfile } from "@/portal/mock/studentData";

const StudentSettings = () => {
  const { signOut } = useAuth();

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Settings"
        subtitle="Manage your profile, password and notification preferences."
        icon={Settings}
        breadcrumb={[{ label: "Student Portal", to: "/portal/student" }, { label: "Settings" }]}
      />

      <Tabs defaultValue="profile">
        <TabsList className="bg-secondary/10 mb-5">
          <TabsTrigger value="profile"><User className="size-4 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="password"><KeyRound className="size-4 mr-1.5" /> Password</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="size-4 mr-1.5" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SectionCard title="Profile Information" description="Some fields are read-only and managed by the college office.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={studentProfile.name} />
              <Field label="Roll Number" value={studentProfile.rollNo} readOnly />
              <Field label="Department" value={studentProfile.department} readOnly />
              <Field label="Year / Semester" value={`Year ${studentProfile.year} • Sem ${studentProfile.semester}`} readOnly />
              <Field label="Email" value={studentProfile.email} />
              <Field label="Phone" value={studentProfile.phone} />
              <Field label="Blood Group" value={studentProfile.bloodGroup} />
              <Field label="Address" value={studentProfile.address} />
              <Field label="Father's Name" value={studentProfile.fatherName} />
              <Field label="Mother's Name" value={studentProfile.motherName} />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="password">
          <SectionCard title="Change Password" description="Use at least 8 characters with a mix of letters, numbers and symbols.">
            <div className="grid gap-4 max-w-md">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" className="mt-1.5" />
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <Button>Update Password</Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SectionCard title="Notification Preferences" description="Choose how you want to be alerted.">
            <div className="space-y-3">
              {[
                { id: "exam-email", label: "Exam alerts via email", desc: "Hall tickets, results, schedules.", on: true },
                { id: "placement-email", label: "Placement alerts via email", desc: "New drives, eligible companies.", on: true },
                { id: "academic-sms", label: "Academic alerts via SMS", desc: "Assignment deadlines, fee reminders.", on: false },
                { id: "circulars-push", label: "General circulars (push)", desc: "Holiday notices, announcements.", on: true },
                { id: "weekly-digest", label: "Weekly attendance digest", desc: "Every Monday morning.", on: false },
              ].map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 rounded-md border border-border p-4">
                  <div>
                    <Label htmlFor={p.id} className="text-sm font-semibold text-foreground cursor-pointer">{p.label}</Label>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <Switch id={p.id} defaultChecked={p.on} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <SectionCard title="Session" description="Sign out from this device.">
          <Button variant="outline" className="gap-2" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </SectionCard>
      </div>
    </PortalLayout>
  );
};

const Field = ({ label, value, readOnly = false }: { label: string; value: string; readOnly?: boolean }) => (
  <div>
    <Label className="text-foreground/85">{label}</Label>
    <Input
      defaultValue={value}
      readOnly={readOnly}
      className={`mt-1.5 ${readOnly ? "bg-secondary/10 cursor-not-allowed" : ""}`}
    />
  </div>
);

export default StudentSettings;
