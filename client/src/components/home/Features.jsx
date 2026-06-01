const FEATURES = [
  {
    title: 'Resume parsing',
    description:
      'Extracts name, contact info, skills, education, experience, and projects from your uploaded file.',
  },
  {
    title: 'GitHub enrichment',
    description:
      'If your resume includes a GitHub link, we pull your profile and public repositories automatically.',
  },
  {
    title: 'Structured portfolio',
    description:
      'Generates a clean preview page with sections you can share or extend for interviews and applications.',
  },
  {
    title: 'MongoDB storage',
    description:
      'Each generated portfolio is saved with a unique ID so you can revisit and share the preview link.',
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-gray-200 bg-white py-12 sm:py-14">
      <div className="container-app max-w-4xl">
        <p className="section-label">Features</p>
        <h2 className="section-heading mt-2">Built for real resumes</h2>
        <p className="section-subheading max-w-lg">
          Practical extraction and display—no AI-generated filler, just what&apos;s in your document.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card !p-5 sm:!p-6">
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
