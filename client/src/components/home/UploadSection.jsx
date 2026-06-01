import FileDropzone from '../FileDropzone.jsx';

export default function UploadSection({ file, loading, error, onFileSelect, onGenerate }) {
  return (
    <section id="upload" className="scroll-mt-20 pb-10">
      <div className="card">
        <div className="mb-6">
          <h2 className="section-heading text-xl sm:text-2xl">Upload your resume</h2>
          <p className="section-subheading">
            Your resume is the source of truth. We extract skills, experience, education,
            and projects automatically.
          </p>
        </div>

        <FileDropzone onFileSelect={onFileSelect} disabled={loading} />

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {file ? (
              <>
                Selected: <span className="font-medium text-gray-900">{file.name}</span>
              </>
            ) : (
              'No file selected yet'
            )}
          </p>
          <button
            type="button"
            onClick={onGenerate}
            disabled={loading || !file}
            className="btn-primary w-full sm:w-auto sm:min-w-[200px]"
          >
            {loading ? 'Generating portfolio…' : 'Generate Portfolio'}
          </button>
        </div>
      </div>
    </section>
  );
}
