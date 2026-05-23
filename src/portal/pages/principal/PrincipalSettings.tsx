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
import { principalProfile } from "@/portal/mock/principalData";

const PrincipalSettings = () => {
  const { signOut } = useAuth();

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Settings"
        subtitle="Profile, security and notification preferences."
        icon={Settings}
        breadcrumb={[{ label: "Principal Portal", to: "/portal/principal" }, { label: "Settings" }]}
      />

      <Tabs defaultValue="profile">
        <TabsList className="bg-secondary/10 mb-5">
          <TabsTrigger value="profile"><User className="size-4 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="password"><KeyRound className="size-4 mr-1.5" /> Password</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="size-4 mr-1.5" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SectionCard title="Profile Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={principalProfile.name} />
              <Field label="Employee ID" value={principalProfile.id} readOnly />
              <Field label="Designation" value={principalProfile.designation} readOnly />
              <Field label="Email" value={principalProfile.email} />
              <Field label="Phone" value={principalProfile.phone} />
              <Field label="Qualification" value={principalProfile.qualification} />
              <Field label="Experience" value={`${principalProfile.experience} years`} />
              <Field label="Joined" value={String(principalProfile.joinedYear)} readOnly />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </SectionCard>
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
                { id: "critical", label: "Critical alerts", desc: "AICTE/NBA/NAAC, accreditation, emergencies.", on: true },
                { id: "approvals", label: "High-priority approvals", desc: "Email + SMS when raised.", on: true },
                { id: "weekly", label: "Weekly digest", desc: "Friday institution summary.", on: true },
                { id: "events", label: "Department events", desc: "Workshops, FDPs, conferences.", on: false },
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

export default PrincipalSettings;
