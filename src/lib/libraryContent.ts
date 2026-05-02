// Central Library content. Mostly STATIC.

export interface LibraryStaff {
  name: string;
  designation: string;
  qualifications: string;
}

export const LIBRARY_OVERVIEW = {
  intro:
    "The Central Library at KITS Markapur is the academic hub of the campus — a calm, well-resourced space that supports learning, research, and reading habits across all departments.",
  stats: [
    { label: "Total Volumes",           value: "55,000+" },
    { label: "Book Titles",              value: "18,500+" },
    { label: "Subscribed e-Journals",    value: "6,000+" },
    { label: "Print Journals",           value: "120+" },
    { label: "Reading Capacity",          value: "300 seats" },
    { label: "Working Hours",             value: "8 AM – 8 PM" },
  ],
  hours: "Mon–Sat: 8:00 AM – 8:00 PM · Sunday: 10:00 AM – 4:00 PM (during exams)",
};

export const LIBRARY_ABOUT = {
  intro:
    "Our library was established alongside the institution in 2008 and has grown into a comprehensive learning resource centre serving students, faculty, and researchers.",
  features: [
    "Spacious reading hall with natural light and dedicated study zones",
    "Separate reference, periodical, and book-borrowing sections",
    "Air-conditioned digital library with high-speed internet access",
    "Reprographic facility (photocopy, print, scan)",
    "Book reservation and request system",
    "Lockers for students' personal belongings",
    "Disability-friendly access at all levels",
  ],
  rules: [
    "Students must produce valid ID cards for entry.",
    "Maintain absolute silence inside reading halls.",
    "Books may be issued for 14 days; renewable once if not reserved.",
    "Lost / damaged books must be replaced or paid for.",
    "Mobile phones in silent mode only.",
    "No food / beverages allowed in the library.",
  ],
};

export const DIGITAL_LIBRARY = {
  intro:
    "The Digital Library wing at KITS provides 24/7 access to a vast collection of e-books, e-journals, video lectures, and academic databases.",
  resources: [
    { name: "DELNET (Developing Library Network)",     description: "Inter-library loans and resource sharing across India.",      access: "Campus-wide" },
    { name: "NPTEL Local Chapter",                       description: "Video lectures from IIT/IISc faculty across all branches.",   access: "Open" },
    { name: "IEEE Xplore",                               description: "Engineering, computing and electronics journals.",            access: "Subscribed" },
    { name: "Springer Link",                             description: "Multidisciplinary journals and books.",                       access: "Subscribed" },
    { name: "ACM Digital Library",                       description: "Computer science research and conference proceedings.",      access: "Subscribed" },
    { name: "ScienceDirect (Elsevier)",                  description: "Scientific journals across engineering and life sciences.",   access: "Subscribed" },
    { name: "JNTUK Online Library",                       description: "JNTUK's centralised digital library access for affiliates.", access: "Open via JNTUK" },
    { name: "SWAYAM / DIKSHA",                            description: "Government-of-India MOOC platforms.",                       access: "Free" },
  ],
  facilities: [
    "30+ networked terminals with Wi-Fi access",
    "Audio-video learning corner",
    "Plagiarism check (Turnitin) for thesis / dissertation submissions",
    "Online catalog (OPAC) for searching and reserving books",
  ],
};

export const LIBRARY_RESOURCES = {
  collections: [
    { category: "Engineering Books",          count: "30,000+" },
    { category: "Reference Books",            count: "8,500+" },
    { category: "Project & Thesis Reports",   count: "5,000+" },
    { category: "Magazines & Periodicals",    count: "120 titles" },
    { category: "Newspapers (English/Telugu)", count: "8 dailies" },
    { category: "Question Paper Bank",        count: "10 years" },
  ],
  services: [
    "Book lending and reservations",
    "Reference and information services",
    "Bibliographic services",
    "User awareness programmes for new entrants",
    "Inter-library loans through DELNET",
    "Document delivery service",
    "Photocopying and printing",
    "Research support — citations, plagiarism check",
  ],
};

// ADMIN: this list will be DB-driven
export const LIBRARY_STAFF: LibraryStaff[] = [
  { name: "Librarian (Head)",        designation: "Chief Librarian",            qualifications: "M.L.I.Sc, Ph.D" },
  { name: "Asst. Librarian",          designation: "Assistant Librarian",         qualifications: "M.L.I.Sc" },
  { name: "Library Asst. - Cataloguing", designation: "Cataloguing & Classification", qualifications: "B.L.I.Sc" },
  { name: "Library Asst. - Issues",   designation: "Circulation Desk",            qualifications: "B.L.I.Sc" },
  { name: "Digital Library Operator",  designation: "Digital Resources",           qualifications: "DCA, BCA" },
  { name: "Library Attendant",         designation: "Stack Maintenance",           qualifications: "Diploma" },
];
