import { profile, about, services, skills, stats, projects } from "./data";

const roles = [...profile.roles, profile.deployedRole].join(", ");

// Everything the AI assistant knows about Asif, generated from data.ts.
export const knowledge = `
Name: ${profile.name}
Roles: ${roles}
Location: ${profile.location}
Summary: ${profile.intro}
About: ${about.join(" ")}
Highlights: ${stats.map((s) => `${s.value}${s.suffix} ${s.label.toLowerCase()}`).join(", ")}
Services: ${services.map((s) => `${s.title} (${s.text} Tools: ${s.tags.join(", ")})`).join("; ")}
Skills: ${skills.join(", ")}
Projects: ${projects.map((p) => `${p.title} [${p.category}]: ${p.text} Built with ${p.tags.join(", ")}.`).join(" ")}
Contact: email ${profile.email}, WhatsApp ${profile.phone}, LinkedIn ${profile.linkedin}, GitHub ${profile.github}
`.trim();

export const systemPrompt = `You are the AI assistant on the portfolio website of ${profile.name}. Visitors are potential clients, employers, students and collaborators.

Answer questions about Asif using only the facts below. Keep answers short and friendly (2-4 sentences), speak about Asif in the third person, and reply in the visitor's language (English, Urdu or Roman Urdu). Do not name specific employers or software houses; if asked where he works, describe his roles and experience instead. If something is not covered by the facts, say you don't have that detail and suggest contacting Asif directly. When someone wants to hire Asif or start a project, point them to WhatsApp or email. Use plain text with no markdown.

<facts>
${knowledge}
</facts>`;

// Offline answers used when no API key is configured.
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has("contact", "hire", "email", "whatsapp", "reach", "rabta", "number"))
    return `You can reach Asif on WhatsApp at ${profile.phone} or by email at ${profile.email}. He's also on LinkedIn.`;
  if (has("automat", "n8n", "zapier", "make", "lovable"))
    return `Asif builds AI automations with tools like n8n, Make, Zapier, Lovable and MCP, connecting your apps so repetitive work runs on its own.`;
  if (has("project", "work", "portfolio", "built", "kaam"))
    return `Asif has delivered 200+ projects. A few highlights: ${projects.map((p) => p.title).join(", ")}. Scroll to the Work section for details.`;
  if (has("skill", "tech", "stack", "language", "tools"))
    return `Asif works with ${skills.slice(0, 14).join(", ")} and more.`;
  if (has("experience", "job", "company", "career", "year"))
    return `Asif has 7+ years of experience and has delivered 200+ projects as an ${roles}.`;
  if (has("service", "offer", "help", "do you", "agent", "employee", "chatbot", "gpt"))
    return `Asif offers ${services.map((s) => s.title).join(", ")}. Want to discuss a project? Message him on WhatsApp.`;
  if (has("who", "about", "kon", "introduce"))
    return `${profile.name} is an ${roles}. He builds AI agents, AI automations and AI-powered applications, and trains teams and students in Generative and Agentic AI.`;
  return `I can tell you about Asif's experience, projects, skills, services or how to contact him. What would you like to know?`;
}
