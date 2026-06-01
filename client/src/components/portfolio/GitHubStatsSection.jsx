import SectionCard from './SectionCard.jsx';

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center shadow-sm">
      <p className="text-2xl font-bold text-gray-900">{value ?? 0}</p>
      <p className="mt-1 text-xs font-medium text-gray-500">{label}</p>
    </div>
  );
}

export default function GitHubStatsSection({ githubProfile }) {
  if (!githubProfile) return null;

  const stats = [
    { label: 'Public Repositories', value: githubProfile.publicRepos },
    { label: 'Followers', value: githubProfile.followers },
    { label: 'Following', value: githubProfile.following },
  ];

  return (
    <SectionCard title="GitHub Overview">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
      {githubProfile.username && (
        <p className="mt-4 text-sm text-gray-600">
          Profile:{' '}
          <a
            href={githubProfile.profileUrl || `https://github.com/${githubProfile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-900 underline decoration-gray-300 hover:decoration-gray-500"
          >
            @{githubProfile.username}
          </a>
        </p>
      )}
    </SectionCard>
  );
}
