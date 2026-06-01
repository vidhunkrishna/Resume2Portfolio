const STEPS = [
  {
    step: '1',
    title: 'Upload resume',
    description: 'Drop a PDF or DOCX file (max 10 MB).',
  },
  {
    step: '2',
    title: 'Parse & extract',
    description: 'The server reads your resume and pulls out structured sections.',
  },
  {
    step: '3',
    title: 'Enrich (optional)',
    description: 'GitHub profile and repos are added when a GitHub URL is found.',
  },
  {
    step: '4',
    title: 'View portfolio',
    description: 'Open your generated preview page and share the link.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-12 sm:py-14">
      <div className="container-app max-w-4xl">
        <p className="section-label">How it works</p>
        <h2 className="section-heading mt-2">Four simple steps</h2>
        <p className="section-subheading max-w-lg">
          From upload to preview in under a minute when your resume is well structured.
        </p>

        <ol className="mt-8 space-y-4">
          {STEPS.map((item) => (
            <li key={item.step} className="card-muted flex gap-4 !p-5 sm:!p-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-sm font-bold text-white">
                {item.step}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
