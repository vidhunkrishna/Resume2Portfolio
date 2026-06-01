import SectionCard from './SectionCard.jsx';
import { externalUrl } from '../../utils/portfolioUtils.js';

function ContactRow({ label, href, children, external }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-500 break-all sm:text-right"
      >
        {children}
      </a>
    </div>
  );
}

export default function ContactSection({ email, phone, githubUrl, linkedinUrl }) {
  const hasContact = email || phone || githubUrl || linkedinUrl;
  if (!hasContact) return null;

  return (
    <SectionCard title="Contact">
      <div>
        {email && (
          <ContactRow label="Email" href={`mailto:${email}`}>
            {email}
          </ContactRow>
        )}
        {phone && (
          <ContactRow label="Phone" href={`tel:${phone.replace(/\s/g, '')}`}>
            {phone}
          </ContactRow>
        )}
        {githubUrl && (
          <ContactRow label="GitHub" href={externalUrl(githubUrl)} external>
            {githubUrl.replace(/^https?:\/\//, '')}
          </ContactRow>
        )}
        {linkedinUrl && (
          <ContactRow label="LinkedIn" href={externalUrl(linkedinUrl)} external>
            {linkedinUrl.replace(/^https?:\/\//, '')}
          </ContactRow>
        )}
      </div>
    </SectionCard>
  );
}
