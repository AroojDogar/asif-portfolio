import { profile, about, services, skills, experience, projects } from "./data";

// Everything the AI assistant knows about Asif, generated from data.ts.
export const knowledge = `
Name: ${profile.name}
Title: ${profile.title}, ${profile.subtitle}
Current position: ${profile.position} at ${profile.org}
Location: ${profile.location}
Summary: ${profile.intro}
About: ${about.join(" ")}
Services: ${services.map((s) => `${s.title} (${s.text})`).join("; ")}
Skills: ${skills.join(", ")}
Experience: ${experience.map((e) => `${e.company}: ${e.role}, ${e.date}`).join("; ")}
Projects: ${projects.map((p) => `${p.title} [${p.category}]: ${p.text} Built with ${p.tags.join(", ")}.`).join(" ")}
Contact: email ${profile.email}, WhatsApp ${profile.phone}, LinkedIn ${profile.linkedin}, GitHub ${profile.github}
`.trim();

export const systemPrompt = `You are the AI assistant on the portfolio website of ${profile.name}. Visitors are potential clients, employers, students and collaborators.

Answer questions about Asif using only the facts below. Keep answers short and friendly (2-4 sentences), speak about Asif in the third person, and reply in the visitor's language (English, Urdu or Roman Urdu). If something is not covered by the facts, say you don't have that detail and suggest contacting Asif directly. When someone wants to hire Asif or start a project, point them to WhatsApp or email. Use plain text with no markdown.

<facts>
${knowledge}
</facts>`;

// Offline answers used when no API key is configured.
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has("contact", "hire", "email", "whatsapp", "reach", "rabta", "number"))
    return `You can reach Asif on WhatsApp at ${profile.phone} or by email at ${profile.email}. He's also on LinkedIn.`;
  if (has("project", "work", "portfolio", "built", "kaam"))
    return `Some of Asif's projects: ${projects.map((p) => p.title).join(", ")}. Scroll to the Work section for details and GitHub links.`;
  if (has("skill", "tech", "stack", "language", "tools"))
    return `Asif works with ${skills.slice(0, 14).join(", ")} and more.`;
  if (has("experience", "job", "company", "career", "paib", "piaic", "head"))
    return `Asif is currently ${profile.position} at ${profile.org}. Before that he worked with ${experience.slice(1).map((e) => e.company).join(", ")}.`;
  if (has("service", "offer", "help", "do you", "agent", "chatbot", "gpt"))
    return `Asif offers ${services.map((s) => s.title).join(", ")}. Want to discuss a project? Message him on WhatsApp.`;
  if (has("who", "about", "kon", "introduce"))
    return `${profile.name} is a ${profile.title} and ${profile.subtitle}, and ${profile.position} at ${profile.orgShort}. He builds AI agents, chatbots, GPTs and full-stack web platforms, and leads programs that train industry-ready AI engineers.`;
  return `I can tell you about Asif's experience, projects, skills, services or how to contact him. What would you like to know?`;
}
