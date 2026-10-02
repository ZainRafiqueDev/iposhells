// Sample/mock data for the Phase 1 front-end. Names and categories come from the
// client's Workflow Marketplace copy; prices and impact figures are placeholders.

export type Category = "Outbound" | "Research" | "Operations" | "Data" | "Compliance";

export const CATEGORIES: Category[] = ["Outbound", "Research", "Operations", "Data", "Compliance"];

export interface Workflow {
  id: string;
  name: string;
  category: Category;
  description: string;
  integrations: string[];
  outputSchema: string;
  basePrice: number; // USD / month (sample)
  hoursSavedPerMonth: number;
  fteReplaced: number;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: "outbound-engine",
    name: "Autonomous Outbound Engine",
    category: "Outbound",
    description: "Identify, enrich, and route validated opportunities into your CRM.",
    integrations: ["Salesforce", "HubSpot"],
    outputSchema: "Enriched lead (company, contact, score, source)",
    basePrice: 149,
    hoursSavedPerMonth: 120,
    fteReplaced: 0.75,
  },
  {
    id: "abo-pipeline",
    name: "Account-Based Outreach Pipeline",
    category: "Outbound",
    description: "Coordinate account-level research and outreach steps with full logging.",
    integrations: ["Salesforce", "HubSpot", "Slack"],
    outputSchema: "Account plan (stakeholders, signals, next action)",
    basePrice: 129,
    hoursSavedPerMonth: 90,
    fteReplaced: 0.5,
  },
  {
    id: "lead-scoring",
    name: "Lead Enrichment & Scoring",
    category: "Outbound",
    description: "Enrich inbound records and score them before they reach your team.",
    integrations: ["HubSpot", "Salesforce"],
    outputSchema: "Scored lead (score, fit signals, source)",
    basePrice: 79,
    hoursSavedPerMonth: 60,
    fteReplaced: 0.35,
  },
  {
    id: "market-signals",
    name: "Market Signal Monitoring",
    category: "Research",
    description: "Continuous monitoring of markets and accounts, structured into datasets.",
    integrations: ["Google Workspace", "Cloud Storage"],
    outputSchema: "Signal feed (source, topic, timestamp, summary)",
    basePrice: 99,
    hoursSavedPerMonth: 80,
    fteReplaced: 0.5,
  },
  {
    id: "account-intel",
    name: "Account Intelligence Pipeline",
    category: "Research",
    description: "Deliver structured account research directly to analytics or CRM.",
    integrations: ["Salesforce", "Cloud Storage"],
    outputSchema: "Research summary (text) + structured fields",
    basePrice: 109,
    hoursSavedPerMonth: 85,
    fteReplaced: 0.5,
  },
  {
    id: "competitive-tracker",
    name: "Competitive Landscape Tracker",
    category: "Research",
    description: "Track competitor changes and publish structured updates.",
    integrations: ["Slack", "Google Workspace"],
    outputSchema: "Competitor change log (entity, change, source)",
    basePrice: 89,
    hoursSavedPerMonth: 55,
    fteReplaced: 0.3,
  },
  {
    id: "ticket-triage",
    name: "Ticket Triage & Routing",
    category: "Operations",
    description: "Classify incoming tickets and route them to the right owner.",
    integrations: ["Slack", "Email", "Custom APIs"],
    outputSchema: "Routed ticket (category, priority, owner)",
    basePrice: 69,
    hoursSavedPerMonth: 70,
    fteReplaced: 0.4,
  },
  {
    id: "sla-monitoring",
    name: "SLA Monitoring & Alerts",
    category: "Operations",
    description: "Watch SLA clocks and alert owners before breaches occur.",
    integrations: ["Slack", "Email"],
    outputSchema: "SLA alert (ticket, clock, breach risk)",
    basePrice: 59,
    hoursSavedPerMonth: 40,
    fteReplaced: 0.25,
  },
  {
    id: "status-broadcast",
    name: "Operational Status Broadcasting",
    category: "Operations",
    description: "Publish operational status updates to the channels that need them.",
    integrations: ["Slack", "Email"],
    outputSchema: "Status update (system, state, audience)",
    basePrice: 49,
    hoursSavedPerMonth: 30,
    fteReplaced: 0.2,
  },
  {
    id: "data-validation",
    name: "Data Validation & Cleansing",
    category: "Data",
    description: "Validate critical data before it hits downstream systems.",
    integrations: ["Salesforce", "Custom APIs", "Cloud Storage"],
    outputSchema: "Validation report (record_id, status, error)",
    basePrice: 79,
    hoursSavedPerMonth: 65,
    fteReplaced: 0.4,
  },
  {
    id: "multi-system-sync",
    name: "Multi-System Sync",
    category: "Data",
    description: "Route and synchronize data between CRM, ERP, analytics, and storage.",
    integrations: ["Salesforce", "HubSpot", "Custom APIs"],
    outputSchema: "Sync log (system, record, change, status)",
    basePrice: 119,
    hoursSavedPerMonth: 95,
    fteReplaced: 0.6,
  },
  {
    id: "analytics-feed",
    name: "Analytics Feed Preparation",
    category: "Data",
    description: "Prepare clean, structured feeds for analytics and reporting.",
    integrations: ["Cloud Storage", "Custom APIs"],
    outputSchema: "Analytics feed (schema-versioned rows)",
    basePrice: 89,
    hoursSavedPerMonth: 50,
    fteReplaced: 0.3,
  },
  {
    id: "audit-log",
    name: "Audit Log Aggregation",
    category: "Compliance",
    description: "Capture, normalize, and store compliance-relevant events.",
    integrations: ["Cloud Storage", "Custom APIs"],
    outputSchema: "Audit event (actor, action, resource, time)",
    basePrice: 99,
    hoursSavedPerMonth: 60,
    fteReplaced: 0.35,
  },
  {
    id: "policy-violation",
    name: "Policy Violation Detection",
    category: "Compliance",
    description: "Detect policy violations and route exceptions for review.",
    integrations: ["Slack", "Email", "Custom APIs"],
    outputSchema: "Exception record (policy, severity, owner)",
    basePrice: 119,
    hoursSavedPerMonth: 70,
    fteReplaced: 0.4,
  },
  {
    id: "compliance-reports",
    name: "Compliance Report Generation",
    category: "Compliance",
    description: "Aggregate required data and structure reports to regulatory schemas.",
    integrations: ["Google Workspace", "Cloud Storage"],
    outputSchema: "Regulatory report (schema-versioned)",
    basePrice: 139,
    hoursSavedPerMonth: 100,
    fteReplaced: 0.6,
  },
];

export const getWorkflow = (id: string) => WORKFLOWS.find((w) => w.id === id);

// ----- Pricing (sample engine, per spec section 3) -----

export type Volume = "Low" | "Medium" | "High";
export type Governance = "Standard" | "Advanced";
export type IntegrationKey = "CRM" | "Slack" | "Workspace" | "APIs";

export const VOLUME_MULTIPLIER: Record<Volume, number> = { Low: 1, Medium: 1.5, High: 2 };
export const GOVERNANCE_ADDON: Record<Governance, number> = { Standard: 0, Advanced: 199 };
export const INTEGRATION_ADDON: Record<IntegrationKey, number> = {
  CRM: 49,
  Slack: 29,
  Workspace: 39,
  APIs: 59,
};
export const ANNUAL_DISCOUNT = 0.2;

export interface PricingInput {
  workflowIds: string[];
  volumes?: Record<string, Volume>;
  governance: Governance;
  integrations: IntegrationKey[];
}

export interface PricingResult {
  workflowCount: number;
  workflowsMonthly: number;
  governanceMonthly: number;
  integrationsMonthly: number;
  monthly: number;
  annual: number;
}

export function calculatePricing({ workflowIds, volumes = {}, governance, integrations }: PricingInput): PricingResult {
  const workflowsMonthly = workflowIds.reduce((sum, id) => {
    const wf = getWorkflow(id);
    return wf ? sum + wf.basePrice * VOLUME_MULTIPLIER[volumes[id] ?? "Low"] : sum;
  }, 0);
  const governanceMonthly = workflowIds.length ? GOVERNANCE_ADDON[governance] : 0;
  const integrationsMonthly = workflowIds.length
    ? integrations.reduce((sum, key) => sum + INTEGRATION_ADDON[key], 0)
    : 0;
  const monthly = Math.round(workflowsMonthly + governanceMonthly + integrationsMonthly);
  const annual = Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
  return {
    workflowCount: workflowIds.length,
    workflowsMonthly: Math.round(workflowsMonthly),
    governanceMonthly,
    integrationsMonthly,
    monthly,
    annual,
  };
}

export const formatUsd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
