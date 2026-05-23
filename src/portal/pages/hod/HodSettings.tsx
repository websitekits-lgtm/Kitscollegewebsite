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
import { hodProfile } from "@/portal/mock/hodData";

const HodSettings = () => {
  const { signOut } = useAuth();

  return (
    <PortalLayout>
      <PortalPageHeader
        title="Settings"
        subtitle="Profile, password and notification preferences."
        icon={Settings}
        breadcrumb={[{ label: "HOD Portal", to: "/portal/hod" }, { label: "Settings" }]}
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
              <Field label="Full Name" value={hodProfile.name} />
              <Field label="Employee ID" value={hodProfile.id} readOnly />
              <Field label="Designation" value={hodProfile.designation} readOnly />
              <Field label="Department" value={hodProfile.department} readOnly />
              <Field label="Email" value={hodProfile.email} />
              <Field label="Phone" value={hodProfile.phone} />
              <Field label="Qualification" value={hodProfile.qualification} />
              <Field label="Experience" value={`${hodProfile.experience} years`} />
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
                { id: "approvals", label: "Approval pings", desc: "Email when a faculty raises a request.", on: true },
                { id: "shortage", label: "Daily shortage report", desc: "Students below 75% — every morning.", on: true },
                { id: "fdp", label: "FDP / event reminders", desc: "Department event nudges.", on: false },
                { id: "weekly", label: "Weekly digest", desc: "Friday summary of all activity.", on: true },
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

export default HodSettings;
