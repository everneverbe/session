import db from "./db.js";
import { randomUUID } from "crypto";

/* =========================
   CASE 1 — BRAND CRISIS
========================= */
const case1Id = randomUUID();

db.prepare(`
  INSERT INTO cases
  (id, meta, context, decision, outcome, reflection, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(
  case1Id,
  JSON.stringify({
    title: "Brand Crisis After Misinterpreted Campaign",
    industry: "Consumer Goods",
    region: "Southeast Asia",
    timeframe: "2023",
    coreTension: "Creative freedom vs cultural sensitivity"
  }),
  JSON.stringify({
    situationSummary:
      "A regional consumer brand launched a digital campaign intended to be humorous, but the message was interpreted as culturally insensitive by a specific community. The backlash escalated rapidly on social media within 24 hours.",
    stakeholders: [
      "Brand leadership",
      "Local community groups",
      "Social media users",
      "Retail partners"
    ],
    constraints: [
      "Campaign already live",
      "Regional cultural differences",
      "Limited response time"
    ]
  }),
  JSON.stringify({
    decisionQuestion:
      "Should the brand immediately pull the campaign and issue a public apology, or attempt to clarify the intent first?",
    options: [
      "Pull campaign immediately and issue apology",
      "Clarify intent through spokesperson statement",
      "Remain silent while monitoring sentiment"
    ],
    chosenApproach:
      "Pull campaign immediately and issue a public apology acknowledging the harm caused."
  }),
  JSON.stringify({
    whatHappened:
      "The brand removed the campaign within 36 hours and issued a formal apology. While initial backlash remained strong, sentiment stabilized after several days and major retail partners continued collaboration."
  }),
  JSON.stringify({
    transferableLesson:
      "Crisis response speed and empathy often outweigh the need to defend original intent."
  }),
  "published"
);

/* =========================
   CASE 2 — INTERNAL COMMUNICATION
========================= */
const case2Id = randomUUID();

db.prepare(`
  INSERT INTO cases
  (id, meta, context, decision, outcome, reflection, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(
  case2Id,
  JSON.stringify({
    title: "Internal Layoff Communication Leak",
    industry: "Technology",
    region: "Global",
    timeframe: "2022",
    coreTension: "Transparency vs operational confidentiality"
  }),
  JSON.stringify({
    situationSummary:
      "A company planned a phased internal announcement regarding upcoming layoffs. Before the official communication, an internal memo was leaked externally, causing employee anxiety and media speculation.",
    stakeholders: [
      "Employees",
      "Executive leadership",
      "HR department",
      "Media"
    ],
    constraints: [
      "Incomplete internal alignment",
      "Legal considerations",
      "Employee morale at risk"
    ]
  }),
  JSON.stringify({
    decisionQuestion:
      "Should leadership accelerate internal communication immediately or wait until legal and operational details are finalized?",
    options: [
      "Immediate all-hands communication",
      "Wait for finalized details",
      "Limited clarification through managers only"
    ],
    chosenApproach:
      "Accelerate internal communication with clear acknowledgment of uncertainty."
  }),
  JSON.stringify({
    whatHappened:
      "Leadership held an emergency all-hands meeting, addressing the leak and outlining known facts. While uncertainty remained, employee trust stabilized and misinformation was reduced."
  }),
  JSON.stringify({
    transferableLesson:
      "In internal crises, acknowledging uncertainty early is often better than waiting for perfect information."
  }),
  "published"
);

/* =========================
   CASE 3 — GOVERNMENT RELATIONS
========================= */
const case3Id = randomUUID();

db.prepare(`
  INSERT INTO cases
  (id, meta, context, decision, outcome, reflection, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(
  case3Id,
  JSON.stringify({
    title: "Regulatory Statement Misalignment",
    industry: "Energy",
    region: "Asia-Pacific",
    timeframe: "2021",
    coreTension: "Public positioning vs regulatory relationships"
  }),
  JSON.stringify({
    situationSummary:
      "A company issued a public statement on sustainability targets that exceeded what had been formally discussed with regulators, creating concern among government stakeholders.",
    stakeholders: [
      "Government regulators",
      "Corporate affairs team",
      "Investors",
      "NGOs"
    ],
    constraints: [
      "Existing regulatory negotiations",
      "Investor expectations",
      "Public commitments already announced"
    ]
  }),
  JSON.stringify({
    decisionQuestion:
      "Should the company walk back the public statement or proactively engage regulators to realign expectations?",
    options: [
      "Publicly revise the statement",
      "Privately engage regulators",
      "Maintain position and wait"
    ],
    chosenApproach:
      "Privately engage regulators to realign expectations before making any public adjustment."
  }),
  JSON.stringify({
    whatHappened:
      "Through closed-door discussions, the company clarified its intent and timelines. Regulators accepted the explanation, and no public correction was required."
  }),
  JSON.stringify({
    transferableLesson:
      "In regulated environments, quiet alignment often prevents unnecessary public escalation."
  }),
  "published"
);

console.log("✅ 3 seed cases inserted successfully.");
process.exit(0);
