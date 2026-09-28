/* ============================================================
   SINGLE SOURCE OF TRUTH
   Every word on the site comes from this file. Edit here, never
   inside components.

   Career progression and tertiary education dates updated from the
   user-supplied LinkedIn Profile.pdf (September 2026). Existing
   contact details and qualification results are retained from the
   portfolio. Lines marked // VERIFY still need confirmation.
   ============================================================ */

import ezhu from "../assets/e.png";
import gasByGas from "../assets/g.png";
import proShine from "../assets/p.png";
import vanforce from "../assets/vanforce.png";
import prettyWoman from "../assets/pretty-woman.png";
import restaurantTemplates from "../assets/restaurant-templates.webp";
import crickChat from "../assets/c.png";
import portrait from "../assets/img.jpg";

export const identity = {
  name: "Kirushikan Ketheeswaran",
  initials: "KK",
  role: "Lead Software Engineer",
  company: "Qtechy Software Company",
  base: "Vavuniya, Sri Lanka",
  timezone: "Asia/Colombo",
  availability: "Open to lead and senior roles",
  portrait,
  introduction:
    "I turn complex ideas into considered digital products. Full-stack development, clear architecture, and the technical direction to bring it all together.",

  /* Optional hero video. Drop an .mp4 into /public and set the
     path here (e.g. "/showreel.mp4"). Leave empty for the dot field. */
  heroVideo: "",
  heroPoster: "",

  summary:
    "Lead Software Engineer at Qtechy, building web and mobile products with the MERN stack, AWS and Flutter. I work across frontend architecture, REST APIs, authentication and delivery, bringing a background in banking and bookkeeping that keeps data accuracy and business workflows central to my work.",

  resumeUrl:
    "https://drive.google.com/file/d/1XkAisKDFM4mPcw_W3BR3j2Em11tuQ-Kf/view?usp=sharing",
  email: "Ketheeswarankirushikan@gmail.com",
  phone: "+94 71 432 4135",
  github: "https://github.com/Ketheeswaran-Kirushikan",
  linkedin: "https://www.linkedin.com/in/kirushikan-ketheeswaran",
  mapUrl: "https://maps.app.goo.gl/D6uUYxZyMpgioQaq7",
};

/* EmailJS — same credentials as your previous site. */
export const emailConfig = {
  publicKey: "u2yD14V7k622YuQMG",
  serviceId: "service_rm7rqqb",
  templateId: "template_5dy08nc",
};

export type Section = { id: string; label: string };

export const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "passions", label: "Passions" },
  { id: "contact", label: "Contact" },
];

/* --- HEADLINE NUMBERS ---------------------------------------- */

export const scope = [
  {
    value: 2,
    label: "Years at Qtechy",
    note: "Software engineer through to lead",
  },
  {
    value: 12,
    label: "Projects shipped",
    note: "Web, mobile-ready, desktop and design",
  },
  {
    value: 4,
    label: "Engineers supported", // VERIFY
    needsVerification: true,
    note: "Code review, pairing, technical direction",
  },
  {
    value: 5,
    label: "Layers owned",
    note: "Web, API, data, cloud, deployment",
  },
];

/* --- HOW I WORK ---------------------------------------------- */

export const practice = [
  {
    n: "A",
    title: "Decide early, write it down",
    body: "Architecture arguments are cheap before code exists and expensive after. I get the shape of a system agreed — data model, boundaries, auth flow — before anyone opens an editor.",
    signals: ["Data modelling", "API boundaries", "Auth design"],
  },
  {
    n: "B",
    title: "Review is where standards live",
    body: "A codebase drifts one merge at a time. I read the pull requests that touch shared surface area and explain the why in the comment, so the next reviewer does not need to be me.",
    signals: ["Pull request review", "Conventions", "Refactoring"],
  },
  {
    n: "C",
    title: "Numbers before opinions",
    body: "Three years of bookkeeping and a bank traineeship left a habit that transfers directly: assume the figure is wrong until it reconciles. It is the same instinct as not trusting a green test you have not read.",
    signals: ["Reconciliation", "Estimation", "Verification"],
  },
  {
    n: "D",
    title: "Design is part of the job",
    body: "I work in Figma and Adobe XD as well as in the editor. Being able to take a brief to wireframe and then to component removes a whole handoff, and it means the build argues with the design early rather than late.",
    signals: ["Figma", "Adobe XD", "UI/UX"],
  },
];

/* --- PROJECTS ------------------------------------------------- */

export type Project = {
  title: string;
  year: string;
  kind: string;
  category: string;
  role: string;
  scope: string;
  brief: string;
  detail: string;
  responsibilities: string[];
  hardParts: string[];
  stack: string[];
  live?: string;
  portals?: { label: string; href: string }[];
  repo?: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Vanforce",
    year: "2026",
    kind: "Delivery marketplace",
    category: "Full stack",
    role: "Lead Developer",
    scope: "User, admin and provider sites",
    brief:
      "A delivery marketplace connecting customers with transport providers in Melbourne and across Australia, with a public website and separate user, admin and provider sites.",
    detail:
      "I led development of the public website and the user, admin and provider experiences. The platform brings delivery search, provider profiles and booking flows together, with dedicated sites for customers, platform administrators and delivery providers.",
    responsibilities: [
      "Led development across the public website and three role-specific sites",
      "Built the delivery search and booking interfaces",
      "Organised service listings, vehicle options and provider profiles",
      "Connected user, admin and provider account flows",
      "Delivered the responsive website on its live Australian domain",
    ],
    hardParts: [
      "Making varied delivery services easy to browse and compare",
      "Keeping pickup, drop-off, vehicle and scheduling details clear throughout a booking",
      "Keeping user, admin and provider workflows consistent across separate sites",
    ],
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "AWS"],
    live: "https://vanforce.com.au/",
    portals: [
      { label: "User site", href: "https://app.vanforce.com.au/user" },
      { label: "Admin site", href: "https://app.vanforce.com.au/admin" },
      { label: "Provider site", href: "https://app.vanforce.com.au/provider" },
    ],
    image: vanforce,
  },
  {
    title: "Restaurant Template Studio",
    year: "2026",
    kind: "Restaurant template platform",
    category: "Website",
    role: "Lead Developer",
    scope: "Template discovery and device previews",
    brief:
      "A restaurant website template platform where businesses can browse designs, search and filter the collection, and explore live demos before choosing a template.",
    detail:
      "I developed a complete showcase for restaurant website templates, bringing discovery, package information and template previews into one platform. Visitors can compare designs across desktop, tablet and mobile layouts, open live demos, and choose a starting point for their restaurant's website.",
    responsibilities: [
      "Built the restaurant template collection and browsing experience",
      "Added template search and category and package filters",
      "Created desktop, tablet and mobile preview experiences",
      "Connected template details with live demos and selection enquiries",
    ],
    hardParts: [
      "Presenting visually different restaurant designs in a consistent collection",
      "Making it easy to compare templates across screen sizes",
      "Keeping template discovery, previews and selection clear on mobile",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    live: "https://restaurant-templates-iota.vercel.app/#/templates",
    image: restaurantTemplates,
  },
  {
    title: "Pretty Woman Beauty Parlour",
    year: "2026",
    kind: "Beauty and bridal website",
    category: "Website",
    role: "Lead Developer",
    scope: "Services, gallery and enquiries",
    brief:
      "A beauty parlour website for Pretty Woman in Manipay, Jaffna, showcasing bridal artistry, salon services and a gallery of beauty transformations.",
    detail:
      "I led development of the responsive website, pairing service pages with bridal photography and transformation videos. Visitors can explore treatments, view the salon's work and reach the team through appointment enquiries or WhatsApp.",
    responsibilities: [
      "Built the responsive salon website and service pages",
      "Created the bridal showcase and photo and video gallery",
      "Added appointment enquiry and WhatsApp contact paths",
    ],
    hardParts: [
      "Balancing rich photography and video with clear service information",
      "Keeping the gallery and appointment journey easy to use on mobile",
    ],
    stack: ["React", "Tailwind CSS"],
    live: "https://pretty-woman-beauty-manipay.kirushikanketheeswar.chatgpt.site/",
    image: prettyWoman,
  },
  {
    title: "Ezhu — Grow Together",
    year: "2025",
    kind: "Marketplace",
    category: "Full stack",
    role: "Lead developer",
    scope: "Real-time, three-sided",
    brief:
      "A platform connecting skilled workers, users and investors, with authentication, live messaging and Stripe payments.",
    detail:
      "The interesting problem was not the CRUD. It was making a Flask-based assistant, a Node API and a real-time layer behave like one product, while three roles read and write the same feed with different rights.",
    responsibilities: [
      "Integrated a Python service into a Node runtime without splitting the auth model",
      "Built the real-time messaging and notification layer",
      "Set up secure upload handling for the ticket system",
      "Wired Stripe payments and JWT auth into one session model",
    ],
    hardParts: [
      "Keeping real-time state consistent across three role dashboards",
      "Signed upload access without exposing credentials to the client",
      "Custom JWT headers across two backends in different languages",
    ],
    stack: [
      "React",
      "MongoDB",
      "Express",
      "Node.js",
      "JWT",
      "Stripe",
      "Render",
      "Vercel",
    ],
    live: "https://ezhu-new-work.vercel.app/",
    repo: "https://github.com/Ketheeswaran-Kirushikan/ezhu-new-work",
    image: ezhu,
  },
  {
    title: "Gas By Gas",
    year: "2025",
    kind: "Booking and logistics",
    category: "Full stack",
    role: "Full-stack engineer",
    scope: "Payments and dispatch",
    brief:
      "A gas delivery management system with real-time data handling, authentication and a scheduling flow across customers, outlets and dispatchers.",
    detail:
      "Money and logistics in the same request path means failure modes matter more than features. The work went into idempotent booking, payment handling, and making delivery state legible to three different operators.",
    responsibilities: [
      "Built the booking flow and payment handling",
      "Implemented role-based access across admin, outlet and dispatcher",
      "Designed the delivery status and notification model",
    ],
    hardParts: [
      "Payment callbacks that stay correct under retry",
      "Cross-role coordination without conflicting state",
      "Delivery updates that reflect reality, not optimism",
    ],
    stack: [
      "Next.js",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Tailwind CSS",
    ],
    live: "https://gasbygas-fe.vercel.app/",
    repo: "https://github.com/Ketheeswaran-Kirushikan/gasbygasFE",
    image: gasByGas,
  },
  {
    title: "CrickChat",
    year: "2025",
    kind: "Applied ML",
    category: "AI & ML",
    role: "Full-stack engineer",
    scope: "Model plus product",
    brief:
      "A behavioural chat bot for cricket fans, pairing an intent-classification model with a React chat client.",
    detail:
      "Built before hosted LLM APIs made this easy — which is the point. It forced real decisions about intent classification, fallback behaviour, and keeping response latency usable under load.",
    responsibilities: [
      "Trained and served an intent classification model",
      "Connected a Flask inference service to a Node API",
      "Designed conversational fallback and error states",
    ],
    hardParts: [
      "Sourcing training data reliable enough to serve",
      "Response latency across two runtimes",
      "Graceful behaviour on queries outside the trained intents",
    ],
    stack: ["React", "MongoDB", "Node.js", "Flask", "Python"],
    repo: "https://github.com/Ketheeswaran-Kirushikan/AIFrontend",
    image: crickChat,
  },
  {
    title: "ProShine",
    year: "2024",
    kind: "Marketing site",
    category: "Website",
    role: "Sole developer",
    scope: "Static, performance-first",
    brief:
      "A business website for a cleaning service, built for fast load and straightforward deployment.",
    detail:
      "Small brief, strict constraints: no backend, fast first paint, and an enquiry path that converts on a phone. Included because knowing when not to build a platform is part of the job.",
    responsibilities: [
      "Built the full responsive front end",
      "Handled client-side enquiry validation with no backend",
      "Optimised for load speed and deployment simplicity",
    ],
    hardParts: [
      "Trustworthy form validation with nothing server-side",
      "Mobile-first layout under a tight scope",
    ],
    stack: ["React", "Tailwind CSS", "Vercel"],
    live: "https://silver-chebakia-88f199.netlify.app/",
    repo: "https://github.com/Ketheeswaran-Kirushikan/Pro-shine",
    image: proShine,
  },
];

/* Smaller builds and design work — listed rather than shown,
   because they don't have screenshots worth a full card. */
export const alsoBuilt = [
  {
    title: "Todo List",
    note: "Task management for daily activities",
    stack: "React · Express · Node.js · MongoDB",
  },
  { title: "Autocars", note: "Car booking platform", stack: "Web app" },
  { title: "EVC", note: "Movie-watching platform", stack: "Web app" },
  {
    title: "Figma UI/UX projects",
    note: "Interface and product design work",
    stack: "Figma · Adobe XD",
  },
];

/* --- EXPERIENCE ----------------------------------------------- */

export type Role = {
  title: string;
  org: string;
  place: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const track: Role[] = [
  {
    title: "Lead Software Engineer",
    org: "Qtechy Software Company",
    place: "Sri Lanka",
    period: "Jun 2025 — Present",
    current: true,
    points: [
      "Lead full-stack development across web and mobile products, from technical planning and responsive interfaces through integration and delivery.",
      "Develop React and Redux interfaces, Node.js and Express APIs, MongoDB workflows, and authentication and authorization features.",
      "Contribute to code review, debugging, testing and AWS deployment support, working with developers and stakeholders to turn business requirements into software.",
    ],
    stack: [
      "React",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS",
      "Flutter",
    ],
  },
  {
    title: "Associate Software Engineer",
    org: "Qtechy Software Company",
    place: "Sri Lanka",
    period: "Feb 2025 — Jun 2025",
    points: [
      "Contributed to production MERN applications across frontend and backend development after progressing from an internship.",
      "Built reusable React components, managed application state with Redux, and integrated REST APIs and authentication flows.",
      "Resolved application bugs and supported testing, integration and deployment for customer and internal projects.",
    ],
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Software Engineer Intern",
    org: "Qtechy Software Company",
    place: "Sri Lanka",
    period: "Aug 2024 — Feb 2025",
    points: [
      "Started my professional software engineering career building and supporting web applications in a MERN development team.",
      "Built responsive interfaces, supported Node.js and MongoDB development, and practised REST API integration and Git collaboration.",
      "Helped test applications and fix interface, responsiveness and data-management issues.",
    ],
    stack: ["React", "JavaScript", "Node.js", "MongoDB", "Git"],
  },
  {
    title: "Welder & Tool Handler",
    org: "Family metal workshop",
    place: "Vavuniya, Sri Lanka",
    period: "Jan 2021 — Aug 2024",
    points: [
      "Fabrication and tool handling alongside full-time study and freelance development.",
      "Where I learned that measuring twice is not a saying, it is a cost control.",
    ],
    stack: ["Fabrication", "Machine handling", "Quality control"],
  },
  {
    title: "Accounts & Bookkeeping (part-time)",
    org: "Abirami Ubaasagi Trust",
    place: "Denmark — remote",
    period: "Jan 2020 — Aug 2023",
    points: [
      "Maintained financial records and reconciliation with a zero-tolerance accuracy requirement.",
      "The habit that transferred: assume the number is wrong until you can prove it.",
    ],
    stack: ["Reconciliation", "Record keeping", "Documentation"],
  },
  {
    title: "Development Officer",
    org: "NTP Development Pvt Ltd",
    place: "Sri Lanka",
    period: "Jan 2021 — Jul 2021",
    points: [
      "Field and administrative work on development programmes.",
      "First sustained exposure to coordinating between people who each held one part of a process.",
    ],
    stack: ["Coordination", "Reporting", "Stakeholder communication"],
  },
  {
    title: "Bank Trainee",
    org: "Bank of Ceylon, Centre Branch",
    place: "Vavuniya, Sri Lanka",
    period: "Jan 2020 — Jun 2020",
    points: [
      "Branch operations, customer handling and account documentation.",
      "First exposure to systems where an error has a name attached to it.",
    ],
    stack: ["Banking operations", "Customer service"],
  },
];

/* --- SKILLS --------------------------------------------------- */

export type SkillGroup = {
  id:
    | "lead"
    | "frontend"
    | "backend"
    | "data"
    | "delivery"
    | "mobile"
    | "animation"
    | "prompting"
    | "design";
  group: string;
  description: string;
  items: string[];
};

export const stack: SkillGroup[] = [
  {
    id: "lead",
    group: "Leadership & interviewing",
    description:
      "Technical direction, team development and interviewing candidates.",
    items: [
      "System architecture",
      "Code review",
      "Technical mentoring",
      "Estimation",
      "Data modelling",
      "Technical decisions",
      "Technical interviews",
      "Candidate assessment",
    ],
  },
  {
    id: "frontend",
    group: "Front end & Next.js",
    description: "Building responsive web applications with React and Next.js.",
    items: [
      "React",
      "Next.js",
      "Redux",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    group: "Back end",
    description: "APIs, authentication and the services behind the interface.",
    items: [
      "Node.js",
      "Express.js",
      "REST design",
      "JWT & sessions",
      "Java (basic)",
    ],
  },
  {
    id: "data",
    group: "Data",
    description: "Structuring application data and managing media and storage.",
    items: [
      "MongoDB",
      "Mongoose",
      "MySQL",
      "Schema design",
      "Indexing",
      "Cloudinary",
    ],
  },
  {
    id: "delivery",
    group: "Delivery",
    description: "Version control, cloud platforms and getting products live.",
    items: ["AWS", "Vercel", "Render", "GitHub", "GitLab", "CI workflows"],
  },
  {
    id: "mobile",
    group: "Mobile & AI",
    description: "Mobile interfaces and applications connected to AI services.",
    items: [
      "Flutter",
      "React Native",
      "Applied ML",
      "Flask services",
      "Python",
    ],
  },
  {
    id: "animation",
    group: "Animation & interaction",
    description:
      "Interface transitions, scroll reveals and interactive 3D experiences.",
    items: [
      "Motion (Framer Motion)",
      "Three.js",
      "CSS animations",
      "Scroll animations",
      "Interactive 3D",
    ],
  },
  {
    id: "prompting",
    group: "AI & prompt engineering",
    description:
      "Writing and refining prompts for coding, content and creative work.",
    items: [
      "Claude",
      "ChatGPT",
      "Cursor",
      "Gemini",
      "Prompt engineering",
      "Prompt refinement",
    ],
  },
  {
    id: "design",
    group: "Design & other",
    description:
      "Product design, communication and a grounding in business processes.",
    items: [
      "Figma",
      "Adobe XD",
      "UI/UX",
      "Accounting knowledge",
      "Computer hardware",
      "Presentation",
    ],
  },
];

/* --- PASSIONS ------------------------------------------------- */

export type Passion = {
  id: "create" | "discover" | "move";
  title: string;
  description: string;
  interests: string[];
};

export const passions: Passion[] = [
  {
    id: "create",
    title: "Stories & visual arts",
    description:
      "I enjoy writing books, creating content and exploring ideas through anime videos, paintings and drawings.",
    interests: [
      "Book writing",
      "Content creation",
      "Anime video generation",
      "Painting",
      "Drawing",
    ],
  },
  {
    id: "discover",
    title: "Books & music",
    description:
      "Reading books and listening to music are two of my favourite ways to spend time outside work.",
    interests: ["Reading books", "Listening to music"],
  },
  {
    id: "move",
    title: "Fitness & sport",
    description:
      "I enjoy gym workouts and calisthenics, and stay active as a cricketer and athlete.",
    interests: ["Gym workouts", "Calisthenics", "Cricket", "Athletics"],
  },
];

/* --- EDUCATION & CERTIFICATES --------------------------------- */

export type Credential = {
  title: string;
  org: string;
  period: string;
  result: string;
  detail: string;
  assetUrl?: string;
};

export const education: Credential[] = [
  {
    title: "BSc in Software Engineering",
    org: "ESOFT Metro Campus, Jaffna",
    period: "Sep 2024 — Sep 2025",
    result: "Second Upper · GPA 3.4",
    detail:
      "Completed a bachelor's degree in software engineering while working in a professional development team. Studying alongside project delivery connected academic learning with practical decisions about application structure, implementation and software quality.",
  },
  {
    title: "Pearson BTEC Level 5 HND in Computing — Software Engineering",
    org: "ESOFT Metro Campus, Jaffna",
    period: "Jun 2022 — Sep 2024",
    result: "Merit Pass",
    detail:
      "Built a foundation in the software development lifecycle, systems analysis and design, networking, security and user experience. This programme connected technical implementation with the planning and design needed to build useful software, and prepared me for degree-level study.",
  },
  {
    title: "Full Stack Development (MERN Stack)",
    org: "Yarl IT Hub Uki, Vavuniya",
    period: "Dec 2023 — Jun 2024",
    result: "Completed",
    detail:
      "Practical full-stack training in MongoDB, Express, React and Node.js, with a focus on building applications as a team. The programme helped me connect responsive interfaces with backend services and data, and prepared me for professional MERN development at Qtechy.",
  },
  {
    title: "G.C.E Advanced Level — Commerce",
    org: "Vavuniya Tamil Madhiya Maha Vidyalayam",
    // Preserve the existing resume's qualification year. LinkedIn's
    // 2011–2019 school attendance range is not an A-level completion date.
    period: "2020",
    result: "A · B · C",
    detail:
      "Studied commerce before moving into software engineering. This background underpins my experience in banking and bookkeeping, and informs how I approach financial records, business processes and data accuracy in software products.",
  },
];

export const certificates: Credential[] = [
  {
    title: "IELTS General Training",
    org: "British Council · IDP · Cambridge English",
    period: "May 2026",
    result: "Band 5.5", // The previous CEFR equivalency was not supported by a certificate asset.
    detail: "Listening 6.0, Writing 5.5, Reading 5.0, Speaking 5.0.",
  },
  {
    title: "Fundamentals of Digital Marketing",
    org: "Google",
    period: "October 2022",
    result: "Certificate",
    detail:
      "Search, analytics and campaign fundamentals — useful context when a client's brief is really a growth problem.",
  },
  {
    title: "Introduction to Programming Using Java",
    org: "Simplilearn",
    period: "March 2024",
    result: "Certificate",
    detail: "Language fundamentals and object-oriented principles.",
  },
];
