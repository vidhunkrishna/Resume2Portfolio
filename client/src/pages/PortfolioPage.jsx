import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPortfolio } from '../services/api.js';
import PortfolioHero from '../components/portfolio/PortfolioHero.jsx';
import AboutSection from '../components/portfolio/AboutSection.jsx';
import SkillsSection from '../components/portfolio/SkillsSection.jsx';
import EducationSection from '../components/portfolio/EducationSection.jsx';
import ExperienceSection from '../components/portfolio/ExperienceSection.jsx';
import ProjectsSection from '../components/portfolio/ProjectsSection.jsx';
import GitHubStatsSection from '../components/portfolio/GitHubStatsSection.jsx';
import CertificationsSection from '../components/portfolio/CertificationsSection.jsx';
import ContactSection from '../components/portfolio/ContactSection.jsx';

export default function PortfolioPage() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getPortfolio(id);
        if (!cancelled) setPortfolio(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Failed to load portfolio');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container-app py-16 text-center text-gray-500">
        Loading portfolio…
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="container-app py-12">
        <div className="card mx-auto max-w-md text-center">
          <p className="text-red-700">{error || 'Portfolio not found'}</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app space-y-6 py-8 sm:space-y-8 sm:py-10">
      <p className="text-sm font-medium text-gray-500">Generated portfolio preview</p>

      <PortfolioHero portfolio={portfolio} />
      <AboutSection summary={portfolio.summary} />
      <SkillsSection skills={portfolio.skills} />
      <EducationSection education={portfolio.education} />
      <ExperienceSection experience={portfolio.experience} />
      <ProjectsSection
        projects={portfolio.projects}
        githubRepos={portfolio.githubRepos}
      />
      <GitHubStatsSection githubProfile={portfolio.githubProfile} />
      <CertificationsSection certifications={portfolio.certifications} />
      <ContactSection
        email={portfolio.email}
        phone={portfolio.phone}
        githubUrl={portfolio.githubUrl}
        linkedinUrl={portfolio.linkedinUrl}
      />
    </div>
  );
}
