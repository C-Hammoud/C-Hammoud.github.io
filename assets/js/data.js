/* =========================================================================
   Site content. Edit this file to update the portfolio; no other code
   changes are needed. Every list below renders automatically.
   ========================================================================= */
window.PORTFOLIO = {
  email: "Chadihammoud96@gmail.com",
  cvPath: "assets/Chadi_Hammoud_CV.pdf",
  cvFileName: "Chadi_Hammoud_CV.pdf",

  /* Hero "search results" rows. href points at a case study. */
  statement: [
    { title: "Supply Chain Platform: invoice extraction & workflow", crumb: "eMcReY › banking › supply-chain", snip: "Current work. Suppliers, beneficiaries, invoices and receivables extracted into Java models, validated, and routed through user or automated decisions.", href: "#case-supply" },
    { title: "ECLO Credit Approval Platform", crumb: "eMcReY › banking › credit", snip: "Lead developer. Loan approvals, limit management and utilization, integrated with T24 core banking and ECM.", href: "#case-eclo" },
    { title: "eTrade: Letters of Guarantee & Credit", crumb: "eMcReY › banking › trade-finance", snip: "LG and LC issuance drawing on ECLO-approved limits, with automated instrument documents.", href: "#case-etrade" },
    { title: "Finance Tracker (Python & Django)", crumb: "github.com › C-Hammoud › Finance-Tracker", snip: "Budgets vs. actuals, CSV import with auto-categorization, loans, savings and net worth.", href: "#case-finance" }
  ],

  /* Competencies ledger. key: true = used daily (highlighted). */
  skills: [
    {
      code: "LNG", title: "Core Languages", note: "where applied",
      rows: [
        ["Java", "Expert · eMcReY, MobiNetS", true],
        ["SQL & PL/SQL", "Oracle tuning · eMcReY", true],
        ["Python", "Django products · personal", false],
        ["TypeScript / JavaScript", "React sites · personal", false],
        ["C#, C", "University & earlier work", false]
      ]
    },
    {
      code: "BCK", title: "Back-End & Frameworks", note: "where applied",
      rows: [
        ["Spring Boot microservices", "ECLO, eTrade, NEP", true],
        ["RESTful API design", "ECLO, NEP, Finance Tracker", true],
        ["Hibernate / JPA", "NEP entity mapping", false],
        ["Django & Django REST Framework", "Finance Tracker", false],
        ["JWT auth (SimpleJWT), CORS", "Finance Tracker API", false],
        ["JasperReports / iReport", "Banking documents", false]
      ]
    },
    {
      code: "DAT", title: "Databases & Storage", note: "where applied",
      rows: [
        ["Oracle", "Query tuning, scripting · eMcReY", true],
        ["PostgreSQL, MySQL", "Projects & services", false],
        ["Firebase Firestore", "Finance Tracker budgeting", false],
        ["SQLite", "Django development", false],
        ["ECM document storage", "ECLO integration", false]
      ]
    },
    {
      code: "OPS", title: "Cloud & DevOps", note: "where applied",
      rows: [
        ["Linux deployment & monitoring", "DEV, SIT, UAT · eMcReY", true],
        ["CI/CD with Jenkins, GitHub Actions", "With DevOps teams", true],
        ["IBM WebSphere", "Enterprise app servers", false],
        ["Docker", "Basic", false],
        ["Vercel, Heroku, Render, GitHub Pages", "Personal hosting", false]
      ]
    },
    {
      code: "QA", title: "Testing & Tooling", note: "where applied",
      rows: [
        ["SIT & UAT support, defect triage", "With QA teams", true],
        ["Code review & standards", "Mentoring juniors", true],
        ["Git, GitHub, SVN", "Daily", false],
        ["Jira", "Tasks, incidents, releases", false],
        ["Agile / Scrum", "MobiNetS, eMcReY", false]
      ]
    },
    {
      code: "UI", title: "Front-End", note: "where applied",
      rows: [
        ["Vaadin", "NEP network maps", false],
        ["React 19, React Router, Vite", "Envir site", false],
        ["Tailwind CSS", "Envir site", false],
        ["HTML, CSS, Django templates", "Several projects", false],
        ["Angular", "Basic", false]
      ]
    }
  ],

  /* Case studies. group: enterprise | python | web */
  cases: [
    {
      id: "supply", group: "enterprise", ref: "Case 01 · Supply chain",
      title: "Supply Chain Platform",
      org: "eMcReY", period: "Current", role: "Developer", status: ["In progress", "warn"],
      summary: "A supply chain module that takes suppliers, beneficiaries, invoices and receivable invoices from users, extracts them into Java domain models, validates them, and drives each one through the application's workflow executor.",
      overview: {
        context: "Supply chain programs depend on accurate supplier, beneficiary and invoice data moving through controlled approvals before anything is acted on.",
        challenge: "User-submitted data arrives in different shapes. It has to become clean, structured records, pass validation, and then follow the right path of actions and decisions, some made by people and some by rules.",
        approach: [
          "Built an extractor that maps submitted suppliers, beneficiaries, invoices and receivable invoices onto Java model classes.",
          "Persist extracted records to the database through the service layer.",
          "Designed a validation mechanism that checks each record before it enters the workflow.",
          "Integrated with the application's workflow executor, which resolves the next actions and decisions from a user's choice or from automated rules."
        ],
        outcome: [
          "One controlled entry path for all supply chain data.",
          "Manual and automated decisions run on the same workflow engine.",
          "Invalid records are caught at intake, before any approval step."
        ]
      },
      arch: [
        { n: 4, nodes: [["Suppliers", "user input", "ext"], ["Beneficiaries", "user input", "ext"], ["Invoices", "user input", "ext"], ["Receivable invoices", "user input", "ext"]] },
        { link: "submit" },
        { n: 1, nodes: [["Extractor", "parse · map to Java models", "core"]] },
        { link: "domain objects" },
        { n: 2, nodes: [["Validation", "field & business rules", "core"], ["Database", "persisted records"]] },
        { link: "valid records start a workflow" },
        { n: 1, nodes: [["Workflow Executor", "actions · decisions · user or automated", "core"]] }
      ],
      // api: [
      //   ["post", "/api/v1/supply-chain/suppliers", "Register suppliers"],
      //   ["post", "/api/v1/supply-chain/beneficiaries", "Register beneficiaries"],
      //   ["post", "/api/v1/supply-chain/invoices", "Submit invoices and receivable invoices for extraction"],
      //   ["get", "/api/v1/workflow/{caseId}/actions", "Actions available at the current step"],
      //   ["post", "/api/v1/workflow/{caseId}/decisions", "Record a user decision; automated rules can decide too"]
      // ],
      // apiNote: "Representative interface. Production contracts are confidential.",
      stack: ["Java", "Spring Boot", "Data extraction", "Java domain models", "Validation rules", "Workflow executor", "REST"]
    },
    {
      id: "eclo", group: "enterprise", ref: "Case 02 · Core banking",
      title: "ECLO Credit Approval Platform",
      org: "eMcReY", period: "Feb 2024 – Present", role: "Lead developer", status: ["Production", "ok"],
      summary: "End-to-end credit approval for corporate and private banking: applications, multi-level approvals, limit setup and limit utilization, integrated with T24 core banking and ECM.",
      overview: {
        context: "Banks need one controlled path from a credit request to an approved, usable limit, with a full audit trail and documents attached at every step.",
        challenge: "Approval workflows had to stay in sync with customer and facility data in T24, keep supporting documents in ECM, and expose approved limits to downstream trade systems without breaking existing consumers.",
        approach: [
          "Led development and enhancement of approval, limit management and utilization workflows.",
          "Integrated with T24, ECM and other enterprise services to automate data flow.",
          "Built document management and automated report generation with Jasper / iReport.",
          "Refactored Spring Boot microservices for scalability and backward compatibility."
        ],
        outcome: [
          "Approved limits are consumed directly by eTrade for LG and LC issuance.",
          "Faster queries on heavy workflow screens after Oracle SQL tuning.",
          "Repeatable releases across DEV, SIT and UAT with DevOps-built CI/CD."
        ]
      },
      arch: [
        { n: 3, nodes: [["Relationship Manager", "credit request"], ["Credit Officers", "review · approve · return"], ["Committee", "final sign-off"]] },
        { link: "REST / JSON" },
        { n: 1, nodes: [["ECLO Services", "applications · workflow · limits · utilization", "core"]] },
        { link: "integration" },
        { n: 3, nodes: [["T24 Core Banking", "customers · accounts · facilities", "ext"], ["ECM", "documents", "ext"], ["Oracle", "workflow state · audit"]] },
        { link: "approved limits" },
        { n: 2, nodes: [["eTrade", "LG / LC issuance", "ext"], ["Jasper Reports", "credit memos · approval packs"]] }
      ],
      // api: [
      //   ["post", "/api/v1/credit-applications", "Create a credit application"],
      //   ["patch", "/api/v1/credit-applications/{id}/decision", "Approve, return or reject at the current level"],
      //   ["get", "/api/v1/customers/{cif}/limits", "Approved limits with live utilization"],
      //   ["post", "/api/v1/limits/{id}/utilizations", "Reserve part of a limit for a facility or instrument"],
      //   ["get", "/api/v1/credit-applications/{id}/documents", "Supporting documents from ECM"]
      // ],
      // apiNote: "Representative interface. Production contracts are confidential.",
      stack: ["Java", "Spring Boot", "Microservices", "Oracle", "T24", "ECM", "JasperReports", "Linux", "Jenkins", "Jira"]
    },
    {
      id: "etrade", group: "enterprise", ref: "Case 03 · Trade finance",
      title: "eTrade · Letters of Guarantee & Credit",
      org: "eMcReY", period: "Feb 2024 – Present", role: "Developer", status: ["Production", "ok"],
      summary: "Issuance and lifecycle services for Letters of Guarantee and Letters of Credit. Every instrument draws on a limit approved in ECLO.",
      overview: {
        context: "Trade instruments are credit exposure. A guarantee or letter of credit must never exceed what the bank has approved for that customer.",
        challenge: "Keep issuance, amendment and release in step with ECLO limits in real time, and generate the formal instrument documents automatically.",
        approach: [
          "Developed and maintain the LG and LC modules end to end.",
          "Check and reserve ECLO limits on issuance and amendment.",
          "Generate instrument documents with Jasper / iReport."
        ],
        outcome: [
          "One source of truth for limits shared by credit and trade.",
          "Instrument documents produced without manual formatting."
        ]
      },
      arch: [
        { n: 2, nodes: [["Trade Operations", "LG / LC requests"], ["Corporate customer", "applicant · beneficiary", "ext"]] },
        { link: "REST / JSON" },
        { n: 1, nodes: [["eTrade Services", "issue · amend · release · expire", "core"]] },
        { link: "limit check & reservation" },
        { n: 3, nodes: [["ECLO Limits", "available vs. utilized", "ext"], ["Jasper", "instrument PDFs"], ["T24", "accounting", "ext"]] }
      ],
      // api: [
      //   ["post", "/api/v1/guarantees", "Issue a Letter of Guarantee against an approved limit"],
      //   ["put", "/api/v1/guarantees/{id}/amendments", "Amend amount, expiry or beneficiary"],
      //   ["post", "/api/v1/letters-of-credit", "Open a Letter of Credit with limit reservation"],
      //   ["get", "/api/v1/letters-of-credit/{id}/document", "Render the instrument as PDF"]
      // ],
      // apiNote: "Representative interface. Production contracts are confidential.",
      stack: ["Java", "Spring Boot", "REST", "Oracle", "JasperReports", "ECLO integration"]
    },
    {
      id: "nep", group: "enterprise", ref: "Case 04 · Telecom",
      title: "NEP Network Engineering Platform",
      org: "MobiNetS", period: "Aug 2022 – Feb 2024", role: "Software developer", status: ["Delivered", "ok"],
      summary: "Inventory and topology platform used by major network providers to model cabinets, shelves, ports and the connections between them.",
      overview: {
        context: "Network operators need an accurate model of physical infrastructure to plan changes and trace faults.",
        challenge: "Ingest large XML exports of network components, map them into a consistent relational model, and render topology interactively after moving off an ageing Polymer UI.",
        approach: [
          "Built core features in Spring Boot and Hibernate, including user access management.",
          "Implemented XML ingestion for cabinet, shelf and port connections and topology relationships.",
          "Migrated the UI visualization layer from Polymer to Vaadin, wired to the Java back end.",
          "Optimized REST APIs and Oracle queries through better entity mapping."
        ],
        outcome: [
          "Interactive network mapping on a maintained Java UI stack.",
          "Features delivered through SIT and UAT with QA in Agile teams."
        ]
      },
      arch: [
        { n: 2, nodes: [["Operator XML exports", "network components", "ext"], ["Network engineers", "topology map"]] },
        { link: "ingest · REST" },
        { n: 3, nodes: [["Ingestion", "parse · validate · map"], ["NEP Core API", "inventory · topology · access", "core"], ["Vaadin UI", "network map"]] },
        { link: "Hibernate / JPA" },
        { n: 1, nodes: [["Oracle", "components · relationships · users"]] }
      ],
      // api: [
      //   ["post", "/api/nep/imports", "Upload an XML batch of network components"],
      //   ["get", "/api/nep/cabinets/{id}/shelves", "Shelves and slot occupancy"],
      //   ["get", "/api/nep/ports/{id}/connections", "Port-to-port links for tracing"],
      //   ["get", "/api/nep/topology?site={code}", "Node and link graph for a site"]
      // ],
      // apiNote: "Representative interface. Production contracts are confidential.",
      stack: ["Java", "Spring Boot", "Hibernate", "Oracle", "XML", "Vaadin", "Polymer (legacy)"]
    },
    {
      id: "finance", group: "python", ref: "Case 05 · Personal finance",
      title: "Finance Tracker",
      org: "Personal project", period: "Ongoing", role: "Author", status: ["In progress", "warn"],
      links: [["GitHub", "https://github.com/C-Hammoud/Finance-Tracker"]],
      summary: "A Django web app for personal budgeting: monthly budgets against actuals, CSV transaction import with automatic categorization, savings goals, loan schedules and net-worth snapshots.",
      overview: {
        context: "Most budgeting apps track spending but not the full picture: loans, savings targets and assets against liabilities.",
        challenge: "Combine budgets, transactions, loan schedules and savings in one model, keep imports clean and avoid duplicates, without disturbing the existing expenses module.",
        approach: [
          "Added budgeting as a separate Django app, specified in a business requirements document.",
          "Stored budgeting data in Firebase Firestore across 10 collections, from categories to commitment schedule lines.",
          "CSV import with deduplication on date, amount and description, plus keyword-based merchant-to-category auto-classification.",
          "Exposed a REST API with Django REST Framework, JWT authentication and CORS for a separate front end.",
          "PDF reports with ReportLab and charts with Matplotlib."
        ],
        outcome: [
          "Dashboard with budget vs. actual by category, variance, utilization and top overspends.",
          "Savings actuals computed as income minus expenses minus loan payments due that month.",
          "Remaining loan principal derived from outstanding schedule lines.",
          "Planned next: investment analytics, multi-currency, tax handling and Open Banking."
        ]
      },
      arch: [
        { n: 2, nodes: [["Web UI", "Django templates · widget-tweaks"], ["Front-end client", "separate app via REST", "ext"]] },
        { link: "HTTP · JWT" },
        { n: 1, nodes: [["Django 5.2 project", "expenses · budgeting · api · data_transfer apps", "core"]] },
        { link: "services" },
        { n: 3, nodes: [["Firestore", "budgets · transactions · loans · savings", "ext"], ["SQLite", "Django data · auth"], ["ReportLab + Matplotlib", "PDF reports · charts"]] }
      ],
      api: [
        ["view", "/budgeting/", "Dashboard: budget vs. actual, variance, top overspends"],
        ["view", "/budgeting/transactions/upload/", "CSV import with dedup and auto-categorization"],
        ["view", "/budgeting/budgets/<y>/<m>/<cat_id>/", "Edit a monthly category forecast"],
        ["view", "/budgeting/savings/<y>/<m>/", "Monthly savings target and actual"],
        ["view", "/budgeting/commitments/", "Loans with schedule lines"],
        ["view", "/budgeting/financial-standing/", "Asset and liability snapshots"],
        ["view", "/budgeting/config/merchant-links/", "Keyword rules for categorization"]
      ],
      apiNote: "Routes from the project's budgeting module documentation.",
      stack: ["Python", "Django 5.2", "Django REST Framework", "SimpleJWT", "Firebase Firestore", "SQLite", "ReportLab", "Matplotlib", "python-dotenv"]
    },
    {
      id: "ai", group: "python", ref: "Case 06 · Applied AI",
      title: "Supportive AI Assistant",
      org: "Personal project", period: "In development", role: "Author", status: ["In development", "warn"],
      summary: "An AI-powered support assistant built with Python and Django. Full write-up coming once the first version ships.",
      overview: {
        context: "Details will be published with the first release.",
        challenge: "",
        approach: ["Python and Django back end.", "AI-assisted conversation flow."],
        outcome: []
      },
      stack: ["Python", "Django", "AI / LLM"]
    },
    {
      id: "envir", group: "web", ref: "Case 07 · Web",
      title: "Envir Consultancy Website",
      org: "Web project", period: "Recent", role: "Developer", status: ["Delivered", "ok"],
      links: [["GitHub", "https://github.com/C-Hammoud/Envir"]],
      summary: "A content-driven marketing site for an engineering consultancy. All copy lives in one JSON file, with a hidden admin page for editing drafts.",
      overview: {
        context: "The consultancy needed to update its site content without touching code.",
        challenge: "Give non-developers safe editing with preview, while keeping a static, fast site on free hosting.",
        approach: [
          "React 19 with Vite and TypeScript, styled with Tailwind CSS 4 in an engineering blueprint look.",
          "All published content in public/content.json, documented by a content schema.",
          "Unlinked /admin page saves drafts locally, exports content.json and previews with ?preview=1.",
          "GitHub Pages deployment with a 404 fallback so deep links like /admin work."
        ],
        outcome: [
          "Content updates are a JSON edit and redeploy, with no component changes.",
          "Separate test and production repositories for safer releases."
        ]
      },
      arch: [
        { n: 2, nodes: [["Visitors", "public site"], ["Site editor", "/admin · draft · preview"]] },
        { link: "static hosting" },
        { n: 1, nodes: [["React 19 + Vite SPA", "React Router 7 · Tailwind 4", "core"]] },
        { link: "fetch" },
        { n: 2, nodes: [["content.json", "sections · copy · links"], ["GitHub Pages", "dist/ + 404 fallback", "ext"]] }
      ],
      stack: ["React 19", "TypeScript", "Vite 6", "React Router 7", "Tailwind CSS 4", "GitHub Pages"]
    }
  ],

  /* Repositories table */
  repos: [
    { name: "Finance-Tracker", owner: "C-Hammoud", url: "https://github.com/C-Hammoud/Finance-Tracker", desc: "Django budgeting app: budgets, CSV import, loans, savings, Firestore", lang: "Python", activity: "30 commits" },
    { name: "Envir", owner: "C-Hammoud", url: "https://github.com/C-Hammoud/Envir", desc: "JSON-driven consultancy site in React, Vite and Tailwind", lang: "TypeScript", activity: "6 commits" },
    { name: "Agri-shop-Project", owner: "Chadi-Hammoud", url: "https://github.com/Chadi-Hammoud/Agri-shop-Project", live: "https://agri-shop-project.vercel.app", desc: "Agricultural e-shop web app, deployed on Vercel", lang: "Python", activity: "24 commits · ★ 1" },
    // { name: "GetDataFromAPI", owner: "Chadi-Hammoud", url: "https://github.com/Chadi-Hammoud/GetDataFromAPI", desc: "Consuming and rendering REST API data in JavaScript", lang: "JavaScript", activity: "★ 1" },
    // { name: "chadi-resume", owner: "Chadi-Hammoud", url: "https://github.com/Chadi-Hammoud/chadi-resume", desc: "Personal resume site", lang: "HTML", activity: "" },
    // { name: "Dynamic_WebSite", owner: "Chadi-Hammoud", url: "https://github.com/Chadi-Hammoud/Dynamic_WebSite", desc: "My first web project", lang: "CSS", activity: "" }
  ],

  /* Google Developer Student Clubs section.
     badges: add your Google Developer Profile badges, e.g. { name: "Android Basics", date: "2022" }
     profileUrl: your PUBLIC profile link (developers.google.com/profile/u/<your-id>), not /u/me */
  gdsc: {
    profileUrl: "https://developers.google.com/profile/u/Chadi-Hammoud",
    badges: [],
    pillars: [
      { color: "blue", icon: "share", title: "Knowledge sharing", text: "Helping fellow students learn Google developer technologies through talks and study sessions." },
      { color: "red", icon: "people", title: "Community building", text: "Growing a welcoming developer community on campus where students learn from each other." },
      { color: "yellow", icon: "rocket", title: "Empowering others", text: "Supporting members as they take their first steps in tech and build confidence." },
      { color: "green", icon: "code", title: "Learning by building", text: "Encouraging hands-on, project-based learning with real tools." }
    ]
  },

  /* Experience timeline */
  experience: [
    {
      now: true, from: "Feb 2024", to: "Present", where: "Riyadh, KSA",
      role: "Senior Software Developer", org: "eMcReY",
      lead: "Leading credit approval (ECLO), trade finance (eTrade) and supply chain development for corporate and private banking.",
      resp: [
        "Lead development of ECLO loan approval, limit management and utilization workflows.",
        "Integrate ECLO with T24 core banking, ECM and other enterprise services.",
        "Develop and maintain eTrade LG and LC modules on ECLO-approved limits.",
        "Build the supply chain module: extract suppliers, beneficiaries, invoices and receivables into Java models, validate them, and route them through the workflow executor.",
        "Deploy, configure and monitor applications on Linux across DEV, SIT and UAT.",
        "Track work, incidents and releases in Jira."
      ],
      wins: [
        "Refactored Spring Boot microservices for scalability, performance and backward compatibility.",
        "Improved performance with Oracle SQL tuning and automation scripts.",
        "Strengthened CI/CD pipelines and deployment automation with DevOps.",
        "Mentor junior developers and run code reviews."
      ],
      stack: ["Java", "Spring Boot", "Oracle", "T24", "ECM", "Jasper", "Linux", "Jenkins", "Jira"]
    },
    {
      from: "Aug 2022", to: "Feb 2024", where: "Lebanon",
      role: "Software Developer", org: "MobiNetS",
      lead: "Built core features of NEP, a network engineering platform for major network providers.",
      resp: [
        "Developed core features in Spring Boot and Hibernate, including user access management.",
        "Built XML ingestion for cabinets, shelves, ports and topology relationships.",
        "Deployed to SIT and UAT and supported QA with defect resolution."
      ],
      wins: [
        "Migrated the UI visualization layer from Polymer to Vaadin for interactive network maps.",
        "Improved REST API and Oracle performance with efficient queries and entity mapping.",
        "Delivered features in Agile teams with infrastructure and QA engineers."
      ],
      stack: ["Java", "Spring Boot", "Hibernate", "Oracle", "Vaadin", "XML"]
    },
    {
      from: "Ongoing", to: "", where: "Personal",
      role: "Independent Product Work", org: "Python · Django · React",
      lead: "Building my own products to go deeper on Python, Django and modern front ends.",
      resp: [
        "Finance Tracker: budgeting, CSV import, loans and savings on Django and Firestore.",
        "Supportive AI assistant on Django, in development.",
        "Envir Consultancy site in React, Vite and Tailwind."
      ],
      wins: [],
      stack: ["Python", "Django", "DRF", "Firestore", "React", "TypeScript"]
    },
    {
      from: "Sep 2022", to: "", where: "Lebanon",
      role: "B.Sc. Computer Science", org: "Lebanese University · Faculty of Science III",
      lead: "Foundations in algorithms, data structures, databases and software engineering. Google Developer Student Club lead.",
      resp: [], wins: [], stack: []
    }
  ]
};
