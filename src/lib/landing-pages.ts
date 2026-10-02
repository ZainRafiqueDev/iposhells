export interface LandingPageData {
  slug: string;
  navLabel: string;
  title: string; // H1 / page name
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  workflowId: string; // matches an id in WORKFLOWS (used for "Add to cart")
  problem: { heading: string; points: string[] };
  steps: { title: string; body: string }[];
  outputs: { label: string; language: string; code: string }[];
  integrations: { name: string; capability: string }[];
  governance: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // other slugs
}

export const LANDING_PAGES: LandingPageData[] = [
  {
    slug: "document-generation-compliance-workflow",
    navLabel: "Document Generation & Compliance",
    title: "Automated Document Generation & Compliance Workflow",
    metaTitle: "Automated Document Generation & Compliance Workflow | iposhells",
    metaDescription:
      "Aggregate required data, generate structured documents and regulatory reports, and log every step for auditability with an autonomous compliance workflow.",
    eyebrow: "Compliance Workflow",
    intro:
      "Aggregate the data your documents depend on, structure it to the required schema, and log every step automatically. Agentic pipelines generate compliance documents and reports continuously, with a complete audit trail behind each output.",
    workflowId: "compliance-reports",
    problem: {
      heading: "Manual document and reporting cycles create compliance risk",
      points: [
        "Source data is scattered across CRM, storage, and internal systems.",
        "Reports are assembled by hand, so formats drift and steps get missed.",
        "Evidence of who did what, and when, is hard to reconstruct for an audit.",
      ],
    },
    steps: [
      {
        title: "Aggregate and capture",
        body: "Collect the required data and compliance-relevant events from connected systems on a schedule or trigger.",
      },
      {
        title: "Structure and validate",
        body: "Normalize and tag records, then validate them against the regulatory or internal schema before any document is produced.",
      },
      {
        title: "Generate, store, and log",
        body: "Produce the document or report, store it in your workspace or cloud storage, and write every step to the audit log.",
      },
    ],
    outputs: [
      {
        label: "Compliance event (JSON)",
        language: "json",
        code: `{
  "event_id": "evt_20481",
  "workflow": "Compliance Report Generation",
  "action": "report_generated",
  "schema_version": "v1",
  "stored_at": "s3://reports/2026-09/regulatory-summary.pdf",
  "logged_at": "2026-09-24T08:30:00Z"
}`,
      },
      {
        label: "Validation report (CSV)",
        language: "csv",
        code: `record_id,status,error
12345,valid,
12346,invalid,missing_field
12347,valid,`,
      },
    ],
    integrations: [
      { name: "Google Workspace", capability: "Document organization and sheet updates" },
      { name: "Cloud Storage (S3, GCS)", capability: "Output archiving and retrieval" },
      { name: "Slack", capability: "Approval requests and status updates" },
      { name: "Internal APIs", capability: "Custom workflow steps under governance" },
    ],
    governance: [
      "Role-based access control per workflow",
      "Encryption in transit and at rest",
      "Structured, queryable audit logging",
      "Alignment with GDPR, SOC 2, and HIPAA requirements",
    ],
    outcomes: [
      "Consistent document structure on every run",
      "Every step traceable for audits",
      "Less manual assembly and rework",
    ],
    faqs: [
      {
        q: "What kinds of documents can this workflow generate?",
        a: "The workflow structures data to the schema you define, such as regulatory reports, compliance summaries, and audit extracts. The exact templates are scoped during the Architecture Audit.",
      },
      {
        q: "How is each step logged?",
        a: "Every capture, validation, generation, and storage step is written to a structured audit log that records the actor, inputs, outputs, and timestamp.",
      },
      {
        q: "Which systems can it read from and write to?",
        a: "Salesforce, HubSpot, Slack, email, Google Workspace, cloud storage, and custom APIs, all under role-based access control.",
      },
    ],
    related: ["investor-onboarding-background-verification-audit", "crm-sync-pipeline-integration-workflow"],
  },
  {
    slug: "investor-onboarding-background-verification-audit",
    navLabel: "Investor Onboarding & Verification",
    title: "Investor Onboarding & Background Verification Audit",
    metaTitle: "Investor Onboarding & Background Verification Audit | iposhells",
    metaDescription:
      "Autonomous KYC data aggregation, validation, and routing for investor onboarding, with every verification step logged for auditability.",
    eyebrow: "Financial Services Audit",
    intro:
      "Financial services operations demand precision, compliance, and speed. This audit maps and automates investor onboarding: collecting data from multiple sources, validating completeness and consistency, and routing structured profiles into your core systems.",
    workflowId: "data-validation",
    problem: {
      heading: "Onboarding and verification stall on manual data handling",
      points: [
        "Investor data arrives from many sources in inconsistent formats.",
        "Completeness and consistency checks are repeated by hand.",
        "Verification evidence is difficult to assemble when regulators ask.",
      ],
    },
    steps: [
      {
        title: "Aggregate customer data",
        body: "Collect investor and background data from multiple sources into one structured profile.",
      },
      {
        title: "Validate completeness and consistency",
        body: "Run schema and rule checks, plus cross-system consistency checks. Exceptions are routed to a reviewer instead of blocking the pipeline.",
      },
      {
        title: "Route and log",
        body: "Deliver the structured profile into your core systems and log every verification step for auditability.",
      },
    ],
    outputs: [
      {
        label: "Verified investor profile (JSON)",
        language: "json",
        code: `{
  "investor": "Sterling Investment Corp",
  "domain": "sterlinginvest.com",
  "contact_name": "Jane Doe",
  "role": "VP Finance",
  "verification_status": "complete",
  "exceptions": [],
  "last_updated": "2026-09-24T08:30:00Z"
}`,
      },
      {
        label: "Validation report (CSV)",
        language: "csv",
        code: `record_id,status,error
12345,valid,
12346,invalid,missing_email
12347,valid,`,
      },
    ],
    integrations: [
      { name: "Salesforce", capability: "Lead creation, field updates, activity logging" },
      { name: "HubSpot", capability: "Contact enrichment and lifecycle stage updates" },
      { name: "Email (SMTP / APIs)", capability: "Notifications and workflow triggers" },
      { name: "Databases", capability: "Governed read/write operations" },
    ],
    governance: [
      "Role-based access control for sensitive investor data",
      "Encryption and data isolation",
      "Exception routing with full audit trail",
      "Compliance alignment for GDPR, SOC 2, and HIPAA",
    ],
    outcomes: [
      "Faster, more consistent onboarding",
      "Fewer errors reaching downstream systems",
      "A complete verification record for every investor",
    ],
    faqs: [
      {
        q: "What does the Investor Onboarding & Background Verification Audit cover?",
        a: "It maps your onboarding data sources, validation rules, routing destinations, and governance requirements, then recommends the workflows and plan to automate them.",
      },
      {
        q: "What happens when a record fails validation?",
        a: "Failed records are routed as exceptions to the right reviewer with the reason attached, so valid records keep moving.",
      },
      {
        q: "Is this a legal or regulatory determination?",
        a: "No. The workflow aggregates, validates, and logs data. Your compliance team retains decision-making authority over verification outcomes.",
      },
    ],
    related: ["document-generation-compliance-workflow", "crm-sync-pipeline-integration-workflow"],
  },
  {
    slug: "crm-sync-pipeline-integration-workflow",
    navLabel: "CRM Sync & Pipeline Integration",
    title: "CRM Sync & Pipeline Integration Workflow",
    metaTitle: "CRM Sync & Pipeline Integration Workflow | iposhells",
    metaDescription:
      "Keep Salesforce and HubSpot records enriched, validated, and synchronized across systems without manual updates, with full audit logging.",
    eyebrow: "CRM Workflow",
    intro:
      "Keep CRM records enriched, validated, and synchronized across systems without manual updates. Agents detect changes, enrich and validate the data, and sync it back with every action logged.",
    workflowId: "multi-system-sync",
    problem: {
      heading: "Out-of-date CRM data slows the pipeline",
      points: [
        "Records drift between the CRM and the systems around it.",
        "Enrichment and clean-up depend on manual updates.",
        "It is hard to tell which system changed a record, or why.",
      ],
    },
    steps: [
      {
        title: "Detect changes",
        body: "Watch connected systems for new or changed records and trigger the pipeline immediately.",
      },
      {
        title: "Enrich and validate",
        body: "Enrich records, then validate fields and cross-system consistency before anything is written back.",
      },
      {
        title: "Sync and log",
        body: "Write validated updates to Salesforce or HubSpot and record every change in the audit log.",
      },
    ],
    outputs: [
      {
        label: "CRM update payload (JSON)",
        language: "json",
        code: `{
  "crm_system": "Salesforce",
  "record_id": "001XXXXXXXXXXX",
  "fields": {
    "Lead_Status": "Qualified",
    "Last_Contacted": "2026-09-23",
    "Agentic_Workflow": "Outbound Engine v2"
  }
}`,
      },
      {
        label: "Enriched lead (JSON)",
        language: "json",
        code: `{
  "company": "Sterling Investment Corp",
  "contact_name": "Jane Doe",
  "role": "VP Finance",
  "score": 87,
  "source": "Outbound Engine",
  "last_updated": "2026-09-24T08:30:00Z"
}`,
      },
    ],
    integrations: [
      { name: "Salesforce", capability: "Lead creation, field updates, activity logging" },
      { name: "HubSpot", capability: "Contact enrichment, lifecycle stage updates" },
      { name: "Slack", capability: "Workflow alerts and status updates" },
      { name: "REST / GraphQL APIs", capability: "Internal system orchestration" },
    ],
    governance: [
      "Field-level permissions through role-based access control",
      "Audit logging for every sync",
      "Encryption in transit and at rest",
      "Exception routing for conflicting records",
    ],
    outcomes: [
      "Consistent records across systems",
      "Higher pipeline velocity",
      "No manual copy-and-paste updates",
    ],
    faqs: [
      {
        q: "Which CRMs are supported?",
        a: "Salesforce and HubSpot, with the option to extend to other systems through custom APIs.",
      },
      {
        q: "Does the workflow overwrite existing CRM data?",
        a: "Updates follow the rules defined for each workflow and are validated first. Every change is logged so it can be traced and reviewed.",
      },
      {
        q: "How fast can it be deployed?",
        a: "Typical rollouts are measured in days and weeks, not months. Integration setup usually takes days 3 to 5 of a deployment.",
      },
    ],
    related: ["document-generation-compliance-workflow", "investor-onboarding-background-verification-audit"],
  },
];

export const getLandingPage = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug);
