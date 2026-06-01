import SectionCard from './SectionCard.jsx';
import { externalUrl, getTopGithubRepos } from '../../utils/portfolioUtils.js';

function ProjectCard({ name, description, language, url }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900">
        {url ? (
          <a
            href={externalUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700 hover:underline"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {language && (
          <span className="rounded border border-gray-200 bg-white px-2 py-0.5 text-gray-600">
            {language}
          </span>
        )}
        {url && (
          <a
            href={externalUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 hover:underline"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </article>
  );
}

export default function ProjectsSection({ projects = [], githubRepos = [] }) {
  const topRepos = getTopGithubRepos(githubRepos, 5);
  const resumeProjects = (projects || []).filter((p) => p?.name?.trim());

  if (!resumeProjects.length && !topRepos.length) return null;

  return (
    <SectionCard title="Projects">
      <div className="grid gap-4 sm:grid-cols-1">
        {resumeProjects.map((project, index) => (
          <ProjectCard
            key={`resume-${index}`}
            name={project.name}
            description={project.description}
            language={project.technologies?.[0]}
            url={project.url}
          />
        ))}
        {topRepos.map((repo) => (
          <ProjectCard
            key={repo.url || repo.name}
            name={repo.name}
            description={repo.description}
            language={repo.language}
            url={repo.url}
          />
        ))}
      </div>
    </SectionCard>
  );
}
