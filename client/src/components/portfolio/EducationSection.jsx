import SectionCard from './SectionCard.jsx';
import { extractCgpa } from '../../utils/portfolioUtils.js';

export default function EducationSection({ education = [] }) {
  if (!education.length) return null;

  return (
    <SectionCard title="Education">
      <ol className="relative space-y-8 border-l border-gray-200 pl-6">
        {education.map((edu, index) => {
          const cgpa = extractCgpa(edu);
          const degreeLine = [edu.degree, edu.field].filter(Boolean).join(' in ');
          const isLast = index === education.length - 1;

          return (
            <li key={index} className="relative">
              <span
                className={`absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-600 ring-1 ring-gray-200 ${
                  isLast ? '' : ''
                }`}
              />
              {degreeLine ? (
                <h3 className="text-base font-semibold text-gray-900">{degreeLine}</h3>
              ) : (
                <h3 className="text-base font-semibold text-gray-900">
                  {edu.institution || 'Education'}
                </h3>
              )}
              {edu.institution && degreeLine && (
                <p className="mt-1 text-sm text-gray-600">{edu.institution}</p>
              )}
              {cgpa && (
                <p className="mt-2 inline-block rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-800">
                  CGPA: {cgpa}
                </p>
              )}
              {(edu.startDate || edu.endDate) && (
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                </p>
              )}
              {edu.description && !cgpa && (
                <p className="mt-2 text-sm text-gray-600">{edu.description}</p>
              )}
              {edu.description && cgpa && !edu.description.includes('CGPA') && !edu.description.includes('GPA') && (
                <p className="mt-2 text-sm text-gray-600">{edu.description}</p>
              )}
            </li>
          );
        })}
      </ol>
    </SectionCard>
  );
}
