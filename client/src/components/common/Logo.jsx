export default function Logo({ showText = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-bold text-slate-700 shadow-sm">
        PG
      </span>
      {showText && (
        <span className="text-base font-semibold text-gray-900">Portfolio Generator</span>
      )}
    </span>
  );
}
