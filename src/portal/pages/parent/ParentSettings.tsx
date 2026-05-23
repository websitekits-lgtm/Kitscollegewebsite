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
import { parentProfile, ward } from "@/portal/mock/parentData";

const ParentSettings = () => {
  const { signOut } = useAuth();

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Settings"
        subtitle="Profile, password and notification preferences."
        icon={Settings}
        breadcrumb={[{ label: "Parent Portal", to: "/portal/parent" }, { label: "Settings" }]}
      />

      <Tabs defaultValue="profile">
        <TabsList className="bg-secondary/10 mb-5">
          <TabsTrigger value="profile"><User className="size-4 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="password"><KeyRound className="size-4 mr-1.5" /> Password</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="size-4 mr-1.5" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SectionCard title="Your Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={parentProfile.name} />
              <Field label="Relation" value={parentProfile.relation} readOnly />
              <Field label="Email" value={parentProfile.email} />
              <Field label="Phone" value={parentProfile.phone} />
              <Field label="Occupation" value={parentProfile.occupation} />
              <Field label="Address" value={parentProfile.address} />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </SectionCard>

          <div className="mt-6">
            <SectionCard title="Linked Ward" description="Your child's basic info — managed by the office.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" value={ward.name} readOnly />
                <Field label="Roll Number" value={ward.rollNo} readOnly />
                <Field label="Branch" value={`${ward.branch} • Sec ${ward.section}`} readOnly />
                <Field label="Semester" value={`${ward.semester} (Year ${ward.year})`} readOnly />
                <Field label="Email" value={ward.email} readOnly />
                <Field label="Phone" value={ward.phone} readOnly />
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <SectionCard title="Change Password">
            <div className="grid gap-4 max-w-md">
              <div><Label htmlFor="c">Current Password</Label><Input id="c" type="password" className="mt-1.5" /></div>
              <div><Label htmlFor="n">New Password</Label><Input id="n" type="password" className="mt-1.5" /></div>
              <div><Label htmlFor="cf">Confirm New Password</Label><Input id="cf" type="password" className="mt-1.5" /></div>
            </div>
            <div className="mt-5"><Button>Update Password</Button></div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SectionCard title="Notification Preferences">
            <div className="space-y-3">
              {[
                { id: "att", label: "Daily attendance summary", desc: "Get a daily digest of your ward's classes.", on: true },
                { id: "fee", label: "Fee due reminders", desc: "7 / 3 / 1 day before due dates.", on: true },
                { id: "exam", label: "Exam schedules + results", desc: "Each time the Exam Cell publishes.", on: true },
                { id: "mentor", label: "Mentor messages", desc: "Email + SMS for personal messages.", on: true },
                { id: "weekly", label: "Weekly progress digest", desc: "Every Monday morning.", on: false },
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
        <SectionCard title="Session">
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
    <Input defaultValue={value} readOnly={readOnly} className={`mt-1.5 ${readOnly ? "bg-secondary/10 cursor-not-allowed" : ""}`} />
  </div>
);

export default ParentSettings;
