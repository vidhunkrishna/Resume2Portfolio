import { deriveCollegeName, deriveLocation, externalUrl } from '../../utils/portfolioUtils.js';

export default function PortfolioHero({ portfolio }) {
  const { name, role, email, githubUrl, linkedinUrl } = portfolio;
  const college = deriveCollegeName(portfolio.education);
  const location = deriveLocation(portfolio);

  const links = [
    email && {
      label: 'Email',
      href: `mailto:${email}`,
      text: email,
    },
    githubUrl && {
      label: 'GitHub',
      href: externalUrl(githubUrl),
      text: 'GitHub Profile',
      external: true,
    },
    linkedinUrl && {
      label: 'LinkedIn',
      href: externalUrl(linkedinUrl),
      text: 'LinkedIn Profile',
      external: true,
    },
  ].filter(Boolean);

  return (
    <section className="card">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {name || 'Your Name'}
      </h1>
      {role && (
        <p className="mt-2 text-lg font-medium text-slate-700">{role}</p>
      )}
      {college && <p className="mt-2 text-base text-gray-600">{college}</p>}
      {location && <p className="mt-1 text-sm text-gray-500">{location}</p>}

      <hr className="my-5 border-gray-200" />

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        {links.map((link) => (
          <div key={link.label}>
            <dt className="font-medium text-gray-500">{link.label}</dt>
            <dd className="mt-0.5">
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-slate-800 underline decoration-gray-300 underline-offset-2 hover:text-slate-900 hover:decoration-gray-500"
              >
                {link.text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
