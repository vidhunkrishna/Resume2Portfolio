import SectionCard from './SectionCard.jsx';
import { normalizeSkills } from '../../utils/portfolioUtils.js';

export default function SkillsSection({ skills = [] }) {
  const tags = normalizeSkills(skills);
  if (!tags.length) return null;

  return (
    <SectionCard title="Skills">
      <div className="flex flex-wrap gap-2">
        {tags.map((skill) => (
          <span key={skill} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}
