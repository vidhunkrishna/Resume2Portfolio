import SectionCard from './SectionCard.jsx';

export default function ExperienceSection({ experience = [] }) {
  if (!experience.length) return null;

  return (
    <SectionCard title="Experience">
      <ul className="space-y-6">
        {experience.map((exp, index) => (
          <li key={index} className="border-l-2 border-gray-200 pl-4">
            <p className="font-semibold text-gray-900">
              {exp.role || 'Role'}
              {exp.company && (
                <span className="font-normal text-gray-600"> · {exp.company}</span>
              )}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-gray-500">
              {(exp.startDate || exp.endDate) && (
                <span>{[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}</span>
              )}
              {exp.location && <span>{exp.location}</span>}
            </div>
            {exp.description && (
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{exp.description}</p>
            )}
            {exp.highlights?.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-600">
                {exp.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
