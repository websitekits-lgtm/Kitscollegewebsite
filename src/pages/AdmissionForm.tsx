import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Loader2, AlertCircle, RotateCcw, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";

// ─── EmailJS credentials ──────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com
// 2. Add an Email Service (Gmail / Outlook) and copy the Service ID below
// 3. Create an Email Template, set To Email = admissions@kits-anna.com, copy Template ID
// 4. Go to Account → API Keys, copy the Public Key
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // replace after EmailJS setup
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // replace after EmailJS setup
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // replace after EmailJS setup
// ─────────────────────────────────────────────────────────────────────────────

const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Others"];
const CATEGORIES = ["General", "OBC", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "SC", "ST", "EWS"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Puducherry",
  "Chandigarh","Andaman & Nicobar Islands","Dadra & Nagar Haveli","Lakshadweep",
];
const PROGRAM_COURSES: Record<string, string[]> = {
  "B.Tech": [
    "Computer Science & Engineering (CSE)",
    "Artificial Intelligence & Machine Learning (AI&ML)",
    "Electronics & Communication Engineering (ECE)",
    "Electrical & Electronics Engineering (EEE)",
    "Mechanical Engineering",
    "Civil Engineering",
  ],
};

const INITIAL_FORM = {
  firstName: "", lastName: "", fatherName: "", motherName: "",
  dob: "", gender: "", mobile: "", email: "", aadhaar: "",
  nationality: "Indian", religion: "", category: "", bloodGroup: "",
  physicallyChallenged: "", alternateMobile: "",
  address: "", landmark: "", city: "", district: "", state: "", pincode: "", country: "India",
  programType: "", course: "",
  hostel: "", transport: "",
  declaration: false,
};

type FormData = typeof INITIAL_FORM;
type Status = "idle" | "submitting" | "success" | "error";

/* ─── field helpers ─────────────────────────────────────────────────────────── */
const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors";
const labelCls = "block text-sm font-medium text-foreground mb-1";
const reqMark   = <span className="text-red-500 ml-0.5">*</span>;

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <label className={labelCls}>{label}{required && reqMark}</label>
    {children}
  </div>
);

const SectionHeading = ({ n, title }: { n: number; title: string }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-bold">{n}</span>
    <h2 className="font-semibold text-base text-foreground">{title}</h2>
    <div className="flex-1 h-px bg-border" />
  </div>
);

/* ─── Main component ─────────────────────────────────────────────────────────── */
const AdmissionForm = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "programType" ? { course: "" } : {}),
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.declaration) return;
    setStatus("submitting");
    setErrorMsg("");

    const templateParams = {
      to_email: "admissions@kits-anna.com",
      student_name: `${form.firstName} ${form.lastName}`,
      first_name: form.firstName,
      last_name: form.lastName,
      father_name: form.fatherName,
      mother_name: form.motherName,
      dob: form.dob,
      gender: form.gender,
      mobile: form.mobile,
      email: form.email,
      aadhaar: form.aadhaar,
      nationality: form.nationality,
      religion: form.religion,
      category: form.category,
      blood_group: form.bloodGroup,
      physically_challenged: form.physicallyChallenged,
      alternate_mobile: form.alternateMobile,
      address: form.address,
      landmark: form.landmark,
      city: form.city,
      district: form.district,
      state: form.state,
      pincode: form.pincode,
      country: form.country,
      program_type: form.programType,
      course: form.course,
      hostel: form.hostel,
      transport: form.transport,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or contact admissions@kits-anna.com directly.");
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admissions 2026 – 27"
        title="Apply for Admission"
        subtitle="Fill in the form below to apply for B.Tech programmes at KITS Markapur. Our admissions team will contact you within 2 working days."
        breadcrumb={[{ label: "Admissions", to: "/admissions" }, { label: "Apply Now" }]}
      />

      <div className="bg-background py-10 sm:py-14 md:py-16">
        <div className="container-tight max-w-3xl">

          {/* Success state */}
          {status === "success" && (
            <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 p-6 mb-8 flex items-start gap-4">
              <CheckCircle2 className="size-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 dark:text-green-400">Application submitted successfully!</p>
                <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                  Your application has been sent to <strong>admissions@kits-anna.com</strong>. Our team will reach out to you within 2 working days.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-3 text-sm font-medium text-green-700 dark:text-green-400 underline hover:no-underline"
                >
                  Submit another application
                </button>
              </div>
            </div>
          )}

          {status !== "success" && (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-10">

              {/* ── Section 1: Personal Details ── */}
              <section>
                <SectionHeading n={1} title="Personal Details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Student First Name" required>
                    <input required className={inputCls} placeholder="Enter first name"
                      value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                  </Field>
                  <Field label="Student Last Name (As per Aadhaar)" required>
                    <input required className={inputCls} placeholder="Enter last name"
                      value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                  </Field>
                  <Field label="Father / Guardian Name" required>
                    <input required className={inputCls} placeholder="Enter father / guardian name"
                      value={form.fatherName} onChange={e => set("fatherName", e.target.value)} />
                  </Field>
                  <Field label="Mother Name">
                    <input className={inputCls} placeholder="Enter mother name"
                      value={form.motherName} onChange={e => set("motherName", e.target.value)} />
                  </Field>
                  <Field label="Date of Birth">
                    <input type="date" className={inputCls}
                      value={form.dob} onChange={e => set("dob", e.target.value)} />
                  </Field>
                  <Field label="Gender">
                    <div className="flex items-center gap-5 pt-2">
                      {["Male", "Female", "Other"].map(g => (
                        <label key={g} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="gender" value={g}
                            checked={form.gender === g} onChange={() => set("gender", g)}
                            className="accent-accent" />
                          {g}
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Field label="Mobile Number" required>
                    <input required type="tel" className={inputCls} placeholder="Enter mobile number" maxLength={10}
                      value={form.mobile} onChange={e => set("mobile", e.target.value)} />
                  </Field>
                  <Field label="Alternate Mobile Number">
                    <input type="tel" className={inputCls} placeholder="Enter alternate mobile number" maxLength={10}
                      value={form.alternateMobile} onChange={e => set("alternateMobile", e.target.value)} />
                  </Field>
                  <Field label="Email ID">
                    <input type="email" className={inputCls} placeholder="Enter email id"
                      value={form.email} onChange={e => set("email", e.target.value)} />
                  </Field>
                  <Field label="Aadhaar Number">
                    <input className={inputCls} placeholder="Enter aadhaar number" maxLength={12}
                      value={form.aadhaar} onChange={e => set("aadhaar", e.target.value)} />
                  </Field>
                  <Field label="Nationality">
                    <select className={inputCls} value={form.nationality} onChange={e => set("nationality", e.target.value)}>
                      <option value="Indian">Indian</option>
                      <option value="NRI">NRI</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Religion">
                    <select className={inputCls} value={form.religion} onChange={e => set("religion", e.target.value)}>
                      <option value="">Select</option>
                      {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Category">
                    <select className={inputCls} value={form.category} onChange={e => set("category", e.target.value)}>
                      <option value="">Select</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Blood Group">
                    <select className={inputCls} value={form.bloodGroup} onChange={e => set("bloodGroup", e.target.value)}>
                      <option value="">Select</option>
                      {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Are you Physically Challenged?">
                    <div className="flex items-center gap-5 pt-2">
                      {["Yes", "No"].map(v => (
                        <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="physicallyChallenged" value={v}
                            checked={form.physicallyChallenged === v} onChange={() => set("physicallyChallenged", v)}
                            className="accent-accent" />
                          {v}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </section>

              {/* ── Section 2: Address Details ── */}
              <section>
                <SectionHeading n={2} title="Address Details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="Address (House No. / Street)">
                      <input className={inputCls} placeholder="Enter address"
                        value={form.address} onChange={e => set("address", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Landmark (Optional)">
                    <input className={inputCls} placeholder="Enter landmark"
                      value={form.landmark} onChange={e => set("landmark", e.target.value)} />
                  </Field>
                  <Field label="City / Village">
                    <input className={inputCls} placeholder="Enter city or village"
                      value={form.city} onChange={e => set("city", e.target.value)} />
                  </Field>
                  <Field label="District">
                    <input className={inputCls} placeholder="Enter district"
                      value={form.district} onChange={e => set("district", e.target.value)} />
                  </Field>
                  <Field label="State">
                    <select className={inputCls} value={form.state} onChange={e => set("state", e.target.value)}>
                      <option value="">Select state</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Pincode">
                    <input className={inputCls} placeholder="Enter pincode" maxLength={6}
                      value={form.pincode} onChange={e => set("pincode", e.target.value)} />
                  </Field>
                  <Field label="Country">
                    <select className={inputCls} value={form.country} onChange={e => set("country", e.target.value)}>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                </div>
              </section>

              {/* ── Section 3: Program ── */}
              <section>
                <SectionHeading n={3} title="Choose the Program" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Program Type">
                    <select className={inputCls} value={form.programType} onChange={e => set("programType", e.target.value)}>
                      <option value="">Select program type</option>
                      {Object.keys(PROGRAM_COURSES).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Program / Course">
                    <select className={inputCls} value={form.course} onChange={e => set("course", e.target.value)}
                      disabled={!form.programType}>
                      <option value="">Select program / course</option>
                      {(PROGRAM_COURSES[form.programType] ?? []).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </section>

              {/* ── Section 4: Other Details ── */}
              <section>
                <SectionHeading n={4} title="Other Details" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Do you require Hostel Facility?">
                    <div className="flex items-center gap-5 pt-2">
                      {["Yes", "No"].map(v => (
                        <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="hostel" value={v}
                            checked={form.hostel === v} onChange={() => set("hostel", v)}
                            className="accent-accent" />
                          {v}
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Field label="Do you require Transport Facility?">
                    <div className="flex items-center gap-5 pt-2">
                      {["Yes", "No"].map(v => (
                        <label key={v} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="transport" value={v}
                            checked={form.transport === v} onChange={() => set("transport", v)}
                            className="accent-accent" />
                          {v}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </section>

              {/* ── Section 5: Declaration ── */}
              <section>
                <SectionHeading n={5} title="Declaration" />
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.declaration}
                    onChange={e => set("declaration", e.target.checked)}
                    className="mt-0.5 size-4 accent-accent shrink-0"
                  />
                  <span className="text-sm text-foreground/80 leading-relaxed">
                    I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.
                    I understand that any false information may lead to cancellation of my admission.
                  </span>
                </label>
              </section>

              {/* ── Error banner ── */}
              {status === "error" && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-4">
                  <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
                </div>
              )}

              {/* ── Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!form.declaration || status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="size-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><Send className="size-4" /> Submit Application</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                >
                  <RotateCcw className="size-4" /> Reset
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </SiteLayout>
  );
};

export default AdmissionForm;
