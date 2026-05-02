// All KITS committees — listed once on a single page with PDF download placeholders.
// ADMIN: each committee will have its own member-list PDF managed from dashboard.

export interface CommitteeListing {
  id: string;
  name: string;
  description?: string;
  fileName: string;
}

export const ALL_COMMITTEES: CommitteeListing[] = [
  { id: "c1",  name: "College Academic Committee",                                  description: "Reviews academic plans, examinations, and curriculum implementation.",      fileName: "academic-committee.pdf" },
  { id: "c2",  name: "Anti-Ragging Committee",                                      description: "Ensures a ragging-free campus through proactive monitoring.",               fileName: "anti-ragging-committee.pdf" },
  { id: "c3",  name: "NSS Committee",                                                description: "Coordinates National Service Scheme activities and outreach.",              fileName: "nss-committee.pdf" },
  { id: "c4",  name: "Career Guidance & Placement Cell",                            description: "Drives placements, career counselling, and industry engagement.",          fileName: "placement-cell-committee.pdf" },
  { id: "c5",  name: "Central Library Committee",                                    description: "Oversees library policies, acquisitions, and user services.",                fileName: "library-committee.pdf" },
  { id: "c6",  name: "Alumni Committee",                                             description: "Coordinates alumni engagement, events, and registrations.",                  fileName: "alumni-committee.pdf" },
  { id: "c7",  name: "Canteen & Stores",                                              description: "Monitors canteen quality, hygiene, and store operations.",                   fileName: "canteen-stores-committee.pdf" },
  { id: "c8",  name: "Social Welfare (BC/SC/ST)",                                     description: "Supports students from socially and economically disadvantaged backgrounds.", fileName: "social-welfare-committee.pdf" },
  { id: "c9",  name: "Computational Facilities Committee",                            description: "Manages computer labs, software, and IT infrastructure.",                   fileName: "computational-facilities-committee.pdf" },
  { id: "c10", name: "Department Associations",                                        description: "Branch-wise student associations supporting curricular and co-curricular events.", fileName: "department-associations.pdf" },
  { id: "c11", name: "Public Relation / Press & Media Publication Committee",        description: "Handles official media communication, press releases, and publications.",     fileName: "pr-media-committee.pdf" },
  { id: "c12", name: "Student Grievance & Redressal Committee",                       description: "Addresses student grievances confidentially and impartially.",                fileName: "grievance-committee.pdf" },
  { id: "c13", name: "Sports & Games",                                                 description: "Plans sports calendar, intra/inter college tournaments, and events.",      fileName: "sports-committee.pdf" },
  { id: "c14", name: "R&D / Consultancy / Innovation",                                description: "Drives research output, consultancy, and innovation initiatives.",            fileName: "rnd-committee.pdf" },
  { id: "c15", name: "Examinations Committee",                                          description: "Coordinates the conduct of internal and external examinations.",            fileName: "examinations-committee.pdf" },
  { id: "c16", name: "Time Table Committee",                                            description: "Builds and reviews academic timetables across departments.",                  fileName: "timetable-committee.pdf" },
  { id: "c17", name: "Entrepreneurship Development Cell",                                description: "Supports student startups and entrepreneurial activities.",                    fileName: "edc-committee.pdf" },
  { id: "c18", name: "Internal Quality Assurance Cell (IQAC)",                          description: "Drives quality enhancement and prepares NAAC AQAR.",                            fileName: "iqac-committee.pdf" },
  { id: "c19", name: "General Maintenance Committee",                                    description: "Oversees campus building maintenance, plumbing, electrical, and civil works.",  fileName: "maintenance-committee.pdf" },
  { id: "c20", name: "Student Welfare Committee",                                         description: "Handles holistic student welfare beyond academics.",                            fileName: "student-welfare-committee.pdf" },
  { id: "c21", name: "Women Empowerment Committee",                                        description: "Drives initiatives for women's leadership, safety, and empowerment.",          fileName: "women-empowerment-committee.pdf" },
  { id: "c22", name: "Women Welfare / Sexual Harassment Eradication Cell",               description: "Ensures a safe campus through awareness and grievance handling.",            fileName: "women-welfare-committee.pdf" },
  { id: "c23", name: "Right to Information Cell",                                         description: "Handles RTI applications and disclosures.",                                    fileName: "rti-cell.pdf" },
  { id: "c24", name: "Class Representative Committee",                                     description: "Facilitates communication between classes and faculty/management.",          fileName: "cr-committee.pdf" },
  { id: "c25", name: "Medical Assistance Cell",                                            description: "Coordinates on-campus medical needs and emergency response.",                   fileName: "medical-assistance-cell.pdf" },
  { id: "c26", name: "Website Committee",                                                  description: "Maintains the institution's official website and digital presence.",         fileName: "website-committee.pdf" },
  { id: "c27", name: "Academic Monitoring Committee",                                      description: "Monitors academic delivery, attendance, and performance.",                       fileName: "academic-monitoring-committee.pdf" },
  { id: "c28", name: "Purchase Committee",                                                  description: "Reviews and approves institutional purchases as per policy.",                  fileName: "purchase-committee.pdf" },
  { id: "c29", name: "Hygiene and Sanitation Committee",                                   description: "Ensures campus hygiene, washroom maintenance, and sanitation drives.",         fileName: "hygiene-sanitation-committee.pdf" },
  { id: "c30", name: "Industry Institute Interaction Committee",                            description: "Drives industry tie-ups, MoUs, and joint research initiatives.",              fileName: "iiic-committee.pdf" },
  { id: "c31", name: "Hostel Committee",                                                    description: "Oversees hostel administration, mess, and resident welfare.",                  fileName: "hostel-committee.pdf" },
  { id: "c32", name: "Discipline Committee",                                                description: "Maintains campus discipline and addresses violations.",                       fileName: "discipline-committee.pdf" },
  { id: "c33", name: "Arts and Cultural Committee",                                          description: "Plans cultural fests, art events, and student talent showcases.",          fileName: "arts-cultural-committee.pdf" },
  { id: "c34", name: "Transport Committee",                                                  description: "Manages campus transport, routes, and student bus services.",               fileName: "transport-committee.pdf" },
  { id: "c35", name: "Internal Complaint Committee (ICC)",                                  description: "Handles complaints related to sexual harassment as per UGC norms.",         fileName: "icc-committee.pdf" },
  { id: "c36", name: "Budget Committee",                                                     description: "Plans and reviews institutional budget and expenditure.",                    fileName: "budget-committee.pdf" },
  { id: "c37", name: "Admission Committee",                                                  description: "Coordinates the admission process, counselling, and seat allotment.",      fileName: "admission-committee.pdf" },
  { id: "c38", name: "Co-Curricular and Extra-Curricular Activities Committee",            description: "Plans student events beyond academics — quizzes, hackathons, clubs.",       fileName: "cocurricular-committee.pdf" },
];
