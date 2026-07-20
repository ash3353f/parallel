export * from "./badge";
export * from "./button";
export * from "./button-link";
export * from "./card";
export * from "./input";
export * from "./motion";

export const navigationItems = ["Platform", "Workflows", "Security", "Pricing"] as const;

export const trustMetrics = [
  { value: "12x", label: "faster design review cycles" },
  { value: "98%", label: "policy coverage before launch" },
  { value: "4.8m", label: "AI decisions orchestrated monthly" },
] as const;

export const workflowCards = [
  {
    title: "Model-aware briefs",
    description:
      "Transform roadmap intent into scoped product, data, and interface plans with every dependency mapped before kickoff.",
  },
  {
    title: "Parallel review rooms",
    description:
      "Invite design, engineering, legal, and GTM leaders into one synchronized decision space with traceable context.",
  },
  {
    title: "Launch-grade governance",
    description:
      "Continuously evaluate prompts, datasets, and UI states against brand, compliance, and quality standards.",
  },
] as const;

export const marqueeSignals = [
  "Prompt diffs",
  "Brand memory",
  "Risk gates",
  "Human approval",
  "Live provenance",
  "Release notes",
] as const;
