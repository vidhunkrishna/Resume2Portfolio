import SectionCard from './SectionCard.jsx';
import { externalUrl } from '../../utils/portfolioUtils.js';

function CertificateIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
      />
    </svg>
  );
}

export default function CertificationsSection({ certifications = [] }) {
  if (!certifications.length) return null;

  return (
    <SectionCard title="Certifications">
      <ul className="space-y-4">
        {certifications.map((cert, index) => (
          <li key={index} className="flex gap-3">
            <CertificateIcon />
            <div className="min-w-0 flex-1">
              {cert.url ? (
                <a
                  href={externalUrl(cert.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 hover:underline"
                >
                  {cert.name}
                </a>
              ) : (
                <p className="font-medium text-gray-900">{cert.name}</p>
              )}
              {cert.issuer && <p className="mt-0.5 text-sm text-gray-500">{cert.issuer}</p>}
              {cert.date && <p className="mt-0.5 text-xs text-gray-400">{cert.date}</p>}
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
