export default function SectionCard({ title, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {title && <h2 className="portfolio-section-title">{title}</h2>}
      {children}
    </section>
  );
}
