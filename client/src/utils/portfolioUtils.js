const CGPA_REGEX = /(?:CGPA|GPA)\s*[:=]?\s*([0-9]+(?:\.[0-9]+)?(?:\s*\/\s*[0-9]+(?:\.[0-9]+)?)?)/i;

export function externalUrl(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
}

/**
 * Converts "Category: Skill" or comma-separated strings into clean skill tags.
 */
export function normalizeSkills(skills = []) {
  const result = new Set();

  for (const raw of skills) {
    if (!raw || typeof raw !== 'string') continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;

    let segment = trimmed;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx > 0 && colonIdx < trimmed.length - 1) {
      const before = trimmed.slice(0, colonIdx).trim();
      const after = trimmed.slice(colonIdx + 1).trim();
      if (after) {
        segment = after;
      } else if (before) {
        segment = before;
      }
    }

    segment.split(/[,;|]/).forEach((part) => {
      const skill = part.trim().replace(/^[-•*]\s*/, '');
      if (skill && skill.length <= 48) {
        result.add(skill);
      }
    });
  }

  return [...result];
}

export function extractCgpa(edu) {
  const text = [edu.description, edu.field, edu.degree, edu.institution]
    .filter(Boolean)
    .join(' ');
  const match = text.match(CGPA_REGEX);
  return match ? match[1] : null;
}

export function deriveCollegeName(education = []) {
  if (!education.length) return '';
  return education[0].institution?.trim() || '';
}

export function deriveLocation(portfolio) {
  const fromExperience = portfolio.experience?.find((e) => e.location?.trim())?.location;
  if (fromExperience) return fromExperience.trim();

  const eduText = portfolio.education
    ?.map((e) => e.description || '')
    .join(' ');
  const cityMatch = eduText?.match(
    /(?:^|[,·\n])\s*([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?),\s*([A-Z]{2,})\b/
  );
  if (cityMatch) return `${cityMatch[1]}, ${cityMatch[2]}`;

  return '';
}

export function getTopGithubRepos(repos = [], limit = 5) {
  return repos
    .filter((repo) => repo?.name?.trim() && repo?.description?.trim())
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
    .slice(0, limit);
}
