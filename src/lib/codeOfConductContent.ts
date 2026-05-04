// Code of Conduct content — STATIC. Sourced from KITS Markapur policies.

export interface ConductSection {
  heading: string;
  body: string;
}

export interface ConductPage {
  audience: "Students" | "Teachers" | "Administrators" | "Employees";
  intro: string;
  sections: ConductSection[];
}

export const CODE_OF_CONDUCT: Record<string, ConductPage> = {
  students: {
    audience: "Students",
    intro:
      "The Code of Conduct for Students at KITS Markapur defines the standards of personal, academic, and disciplinary behaviour expected of every student. It exists to maintain a respectful, focused, and safe learning environment.",
    sections: [
      {
        heading: "Student Commitment",
        body: "Every student is expected to attend classes regularly, participate actively, complete assignments on time, respect faculty and peers, and represent the institution's values both on and off campus. Students must abide by all rules notified by the institution from time to time.",
      },
      {
        heading: "Academic Misconduct",
        body: "Academic misconduct includes plagiarism, cheating in examinations, unauthorised collaboration, fabrication of data, and submission of work not your own. Any form of academic dishonesty leads to disciplinary action, which may include cancellation of examination, debarment, or expulsion.",
      },
      {
        heading: "Disciplinary Misconduct",
        body: "Disciplinary misconduct covers ragging, physical or verbal abuse, possession of weapons or prohibited substances, vandalism of college property, and any disruption of academic or administrative functioning. Students engaging in such acts will face strict disciplinary action.",
      },
      {
        heading: "Causing Disrepute to Other Students",
        body: "Defaming, harassing, or causing reputational harm to fellow students through word, action, or social media is strictly prohibited. Such acts will be treated as disciplinary misconduct and dealt with accordingly.",
      },
      {
        heading: "Punishment and Penalties",
        body: "Penalties depend on the nature and severity of the offence — ranging from written warnings, suspension from classes/hostel, fines, debarment from examinations, to expulsion from the institution. Serious offences may also be reported to law-enforcement authorities.",
      },
    ],
  },

  teachers: {
    audience: "Teachers",
    intro:
      "The Code of Conduct for Teachers articulates the professional and ethical standards expected of every faculty member at KITS. Teachers play a foundational role in shaping students; this code preserves the dignity, fairness, and integrity of that role.",
    sections: [
      {
        heading: "The Code of Conduct for Teachers",
        body: "Teachers must demonstrate intellectual honesty, professional commitment, and respect for the academic process. Punctuality, syllabus adherence, fair evaluation, and continuous self-improvement are non-negotiable expectations.",
      },
      {
        heading: "Teachers and the Students",
        body: "Teachers must treat all students fairly, irrespective of caste, religion, gender, or background. Discrimination, favouritism, harassment of any form, or use of intimidating language is prohibited. Teachers should be mentors, guides, and accessible role-models.",
      },
      {
        heading: "Teachers and the Parent",
        body: "Teachers should communicate with parents respectfully and constructively, sharing students' progress and concerns through proper channels. Parent-Teacher Meetings should be conducted with empathy and discretion.",
      },
      {
        heading: "Teachers and Colleagues",
        body: "Teachers should maintain cordial, supportive relationships with colleagues. Disagreements should be resolved professionally, and credit for collaborative work must be fairly attributed. Backbiting, public criticism, or undermining of fellow teachers is unacceptable.",
      },
    ],
  },

  administrators: {
    audience: "Administrators",
    intro:
      "Administrators ensure the smooth, fair, and transparent functioning of the institution. The Code of Conduct for Administrators sets out their personal and professional responsibilities.",
    sections: [
      {
        heading: "Personal and Professional Responsibility",
        body: "Administrators must act with integrity, accountability, and transparency in all decisions. Personal interests must never override institutional interests. Confidentiality of student, faculty, and institutional records must be strictly preserved.",
      },
      {
        heading: "Functions",
        body: "The administrative function covers admissions, examinations, finance, HR, infrastructure, compliance, and student welfare. Administrators are expected to apply institutional policies consistently and fairly across these functions.",
      },
      {
        heading: "Functions of the Cell",
        body: "Specific cells (Examination, Admissions, Finance, IT, Library) operate within their charters and SOPs. Administrators in these cells must adhere to documented procedures and bring policy gaps to leadership attention.",
      },
      {
        heading: "Facility",
        body: "Administrators are responsible for the upkeep of campus facilities — classrooms, labs, library, hostel, transport, canteen, and grounds. They must ensure proactive maintenance, vendor accountability, and timely resolution of student / staff requests.",
      },
    ],
  },

  employees: {
    audience: "Employees",
    intro:
      "The Code of Conduct for Employees applies to non-teaching staff and support employees. It ensures professional conduct, confidentiality, and ethical behaviour at all times.",
    sections: [
      {
        heading: "Confidentiality",
        body: "Employees must maintain strict confidentiality of student, employee, and institutional information. Sharing internal documents, financial data, or personal records with unauthorised persons is a serious offence.",
      },
      {
        heading: "Gifts",
        body: "Employees must not accept gifts, cash, or any inducement from students, parents, vendors, or contractors that could compromise their judgement or institutional fairness.",
      },
      {
        heading: "Private Employment or Trade and Investment",
        body: "Employees must not engage in any private employment, trade, or business that conflicts with their institutional duties or uses institutional resources for personal gain. Prior written permission is required for any external activity.",
      },
      {
        heading: "Attendance at Meetings",
        body: "Punctual attendance at scheduled meetings, training, and institutional functions is mandatory. Unexplained absences or repeated lateness will be treated as misconduct.",
      },
      {
        heading: "Consumption of Intoxicating Drinks and Drugs",
        body: "Consumption of alcohol or any prohibited substances on the campus or while on duty is strictly forbidden. Reporting to duty under the influence is a serious disciplinary offence.",
      },
      {
        heading: "Misconduct",
        body: "Misconduct includes wilful disobedience, dishonesty, financial irregularities, harassment, theft, and any act that damages the reputation of the institution. All allegations are investigated through due process.",
      },
      {
        heading: "Explanation",
        body: "Where misconduct is alleged, the employee will be served a show-cause notice and given reasonable opportunity to submit a written explanation before any action is finalised.",
      },
      {
        heading: "Representations",
        body: "Employees may submit representations against any decision through proper administrative channels. Frivolous, anonymous, or repeated representations on the same matter will not be entertained.",
      },
      {
        heading: "Interpretation",
        body: "In case of any doubt or dispute about the interpretation of any clause of this Code, the decision of the Principal — in consultation with the management — shall be final and binding.",
      },
    ],
  },
};
