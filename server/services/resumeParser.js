import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX =
  /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}(?:[-.\s]?\d{2,4})?/g;
const GITHUB_REGEX =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?)/gi;
const LINKEDIN_REGEX =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/gi;

const KNOWN_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP',
  'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'HTML', 'CSS', 'SASS', 'SCSS',
  'React', 'Angular', 'Vue', 'Vue.js', 'Next.js', 'Nuxt', 'Svelte', 'Node.js', 'Express',
  'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot', '.NET', 'ASP.NET',
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git', 'GitHub',
  'GraphQL', 'REST', 'REST API', 'Tailwind', 'Tailwind CSS', 'Bootstrap', 'Material UI',
  'Webpack', 'Vite', 'Babel', 'Jest', 'Cypress', 'Mocha', 'Selenium',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
  'Agile', 'Scrum', 'Jira', 'Figma', 'Linux', 'Bash', 'PowerShell',
  'Microservices', 'API', 'SQL', 'NoSQL', 'Elasticsearch', 'Kafka', 'RabbitMQ',
];

const SECTION_HEADERS = {
  education: /^(education|academic background|academics)$/i,
  experience: /^(experience|work experience|employment|professional experience|work history)$/i,
  projects: /^(projects|personal projects|key projects|portfolio projects)$/i,
  certifications: /^(certifications?|licenses?|credentials)$/i,
  skills: /^(skills|technical skills|core competencies|technologies|tech stack)$/i,
  summary: /^(summary|professional summary|profile|about me|objective)$/i,
};

function normalizeText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00a0]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function linesOf(text) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

function extractEmails(text) {
  const matches = text.match(EMAIL_REGEX) || [];
  return [...new Set(matches.map((e) => e.toLowerCase()))];
}

function extractPhones(text) {
  const matches = text.match(PHONE_REGEX) || [];
  return matches
    .map((p) => p.trim())
    .filter((p) => p.replace(/\D/g, '').length >= 10)
    .slice(0, 2);
}

function extractGitHub(text) {
  const urls = [];
  let match;
  const regex = new RegExp(GITHUB_REGEX.source, 'gi');
  while ((match = regex.exec(text)) !== null) {
    const username = match[1];
    urls.push(`https://github.com/${username}`);
  }
  return urls[0] || '';
}

function extractLinkedIn(text) {
  const matches = text.match(LINKEDIN_REGEX) || [];
  return matches[0] ? matches[0].replace(/\/$/, '') : '';
}

function extractSkills(text) {
  const found = new Set();
  const lowerText = text.toLowerCase();

  for (const skill of KNOWN_SKILLS) {
    const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (pattern.test(text) || lowerText.includes(skill.toLowerCase())) {
      found.add(skill);
    }
  }

  const skillsSection = extractSection(text, 'skills');
  if (skillsSection) {
    const tokens = skillsSection
      .split(/[,|•·\n\t|;/]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1 && t.length < 40);
    for (const token of tokens) {
      if (!SECTION_HEADERS.education.test(token)) {
        found.add(token);
      }
    }
  }

  return [...found].slice(0, 50);
}

function isSectionHeader(line) {
  const cleaned = line.replace(/[:\-#*]/g, '').trim();
  for (const pattern of Object.values(SECTION_HEADERS)) {
    if (pattern.test(cleaned)) return true;
  }
  return false;
}

function getSectionType(line) {
  const cleaned = line.replace(/[:\-#*]/g, '').trim();
  for (const [type, pattern] of Object.entries(SECTION_HEADERS)) {
    if (pattern.test(cleaned)) return type;
  }
  return null;
}

function extractSection(text, sectionType) {
  const lines = linesOf(text);
  let capturing = false;
  const content = [];

  for (const line of lines) {
    const type = getSectionType(line);
    if (type) {
      if (type === sectionType) {
        capturing = true;
        continue;
      }
      if (capturing) break;
    } else if (capturing) {
      content.push(line);
    }
  }

  return content.join('\n').trim();
}

function extractName(lines, email) {
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.length < 3 || line.length > 60) continue;
    if (EMAIL_REGEX.test(line)) continue;
    if (PHONE_REGEX.test(line) && line.replace(/\D/g, '').length > 8) continue;
    if (/github|linkedin|http/i.test(line)) continue;
    if (isSectionHeader(line)) continue;
    if (/^[A-Z][a-z]+(\s+[A-Z][a-z'.-]+){1,4}$/.test(line)) return line;
    if (/^[A-Z\s'.-]{3,50}$/.test(line) && line.split(/\s+/).length <= 5) {
      return line
        .split(/\s+/)
        .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
        .join(' ');
    }
  }
  if (email) {
    const local = email.split('@')[0];
    return local
      .replace(/[._-]/g, ' ')
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return 'Portfolio Owner';
}

function extractRole(lines) {
  const rolePatterns = [
    /^(senior |junior |lead |staff |principal )?(software|full[- ]?stack|front[- ]?end|back[- ]?end|web|mobile|data|devops|cloud|ml|machine learning|ai|product|ui\/ux|qa|test|systems|platform|security|network|embedded|blockchain)[\s/-]*(engineer|developer|architect|analyst|scientist|designer|manager|consultant|specialist|intern)/i,
    /^(senior |junior |lead )?(developer|engineer|designer|architect|consultant)/i,
  ];

  for (let i = 0; i < Math.min(8, lines.length); i++) {
    const line = lines[i];
    if (line.length > 80) continue;
    for (const pattern of rolePatterns) {
      if (pattern.test(line)) return line;
    }
  }
  return '';
}

function parseEducationBlock(block) {
  const entries = [];
  const chunks = block.split(/\n(?=[A-Z][^a-z]{0,5}|[\d]{4})/).filter(Boolean);

  for (const chunk of chunks) {
    const chunkLines = linesOf(chunk);
    if (!chunkLines.length) continue;

    const dateMatch = chunk.match(
      /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4}|present|current)/i
    );

    entries.push({
      institution: chunkLines[0] || '',
      degree: chunkLines[1] || '',
      field: chunkLines[2] || '',
      startDate: dateMatch ? dateMatch[1] : '',
      endDate: dateMatch ? dateMatch[2] : '',
      description: chunkLines.slice(3).join(' '),
    });
  }

  if (!entries.length && block.trim()) {
    entries.push({
      institution: block.split('\n')[0] || block.slice(0, 80),
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: block,
    });
  }

  return entries;
}

function parseExperienceBlock(block) {
  const entries = [];
  const parts = block.split(/\n(?=\S.{0,5}.*(?:\d{4}|present|current))/i);

  for (const part of parts) {
    const partLines = linesOf(part);
    if (!partLines.length) continue;

    const dateMatch = part.match(
      /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4}|present|current)/i
    );

    const bullets = partLines.filter((l) => /^[•\-*▪]/.test(l)).map((l) => l.replace(/^[•\-*▪]\s*/, ''));

    entries.push({
      company: partLines[0] || '',
      role: partLines[1] || '',
      location: '',
      startDate: dateMatch ? dateMatch[1] : '',
      endDate: dateMatch ? dateMatch[2] : '',
      description: bullets.length ? '' : partLines.slice(2).join(' '),
      highlights: bullets,
    });
  }

  if (!entries.length && block.trim()) {
    entries.push({
      company: '',
      role: block.split('\n')[0] || 'Experience',
      location: '',
      startDate: '',
      endDate: '',
      description: block,
      highlights: [],
    });
  }

  return entries;
}

function parseProjectsBlock(block) {
  const entries = [];
  const chunks = block.split(/\n(?=[A-Z•\-*])/).filter(Boolean);

  for (const chunk of chunks) {
    const chunkLines = linesOf(chunk);
    if (!chunkLines.length) continue;

    const urlMatch = chunk.match(/https?:\/\/[^\s]+/);
    const techMatch = chunk.match(/(?:technologies?|tech stack|built with)[:\s]+(.+)/i);

    entries.push({
      name: chunkLines[0].replace(/^[•\-*]\s*/, ''),
      description: chunkLines.slice(1).join(' ').replace(urlMatch?.[0] || '', '').trim(),
      technologies: techMatch
        ? techMatch[1].split(/[,|]/).map((t) => t.trim()).filter(Boolean)
        : [],
      url: urlMatch ? urlMatch[0] : '',
    });
  }

  return entries;
}

function parseCertificationsBlock(block) {
  const entries = [];
  const lines = linesOf(block);

  for (const line of lines) {
    const dateMatch = line.match(/\b(20\d{2}|19\d{2})\b/);
    entries.push({
      name: line.replace(/^[•\-*]\s*/, '').replace(/\b(20\d{2}|19\d{2})\b.*/, '').trim(),
      issuer: '',
      date: dateMatch ? dateMatch[0] : '',
      url: (line.match(/https?:\/\/[^\s]+/) || [])[0] || '',
    });
  }

  return entries;
}

export async function extractTextFromFile(buffer, mimetype, originalname) {
  const ext = originalname.toLowerCase().split('.').pop();

  if (ext === 'pdf' || mimetype === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    ext === 'docx' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error('Unsupported file format');
}

export function parseResumeText(rawText) {
  const text = normalizeText(rawText);
  const lines = linesOf(text);

  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const githubUrl = extractGitHub(text);
  const linkedinUrl = extractLinkedIn(text);
  const email = emails[0] || '';
  const phone = phones[0] || '';

  const name = extractName(lines, email);
  const role = extractRole(lines);
  const skills = extractSkills(text);
  const summary = extractSection(text, 'summary') || '';

  const education = parseEducationBlock(extractSection(text, 'education'));
  const experience = parseExperienceBlock(extractSection(text, 'experience'));
  const projects = parseProjectsBlock(extractSection(text, 'projects'));
  const certifications = parseCertificationsBlock(extractSection(text, 'certifications'));

  return {
    name,
    email,
    phone,
    role,
    summary,
    githubUrl,
    linkedinUrl,
    skills,
    education,
    experience,
    projects,
    certifications,
  };
}
