import SectionCard from './SectionCard.jsx';

export default function AboutSection({ summary }) {
  if (!summary?.trim()) return null;

  return (
    <SectionCard title="About">
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base whitespace-pre-line">
        {summary}
      </p>
    </SectionCard>
  );
}
