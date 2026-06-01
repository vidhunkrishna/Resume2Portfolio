import { useRef, useState } from 'react';

const ACCEPT = '.pdf,.docx';

export default function FileDropzone({ onFileSelect, disabled }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (selected) => {
    if (!selected) return;
    const ext = selected.name.toLowerCase().split('.').pop();
    if (!['pdf', 'docx'].includes(ext)) {
      setError('Only PDF and DOCX files are allowed.');
      onFileSelect(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      onFileSelect(null);
      return;
    }
    setError('');
    setFile(selected);
    onFileSelect(selected);
  };

  const clear = (e) => {
    e.stopPropagation();
    setFile(null);
    setError('');
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`
          flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-150
          ${dragOver ? 'border-slate-500 bg-slate-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'}
          ${disabled ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <ResumeIcon />

        {file ? (
          <div className="mt-4">
            <p className="font-semibold text-gray-900">{file.name}</p>
            <p className="mt-1 text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB · Ready to generate</p>
            {!disabled && (
              <button
                type="button"
                onClick={clear}
                className="mt-3 text-sm font-medium text-slate-700 hover:underline"
              >
                Choose a different file
              </button>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <p className="font-medium text-gray-900">Drag & drop your resume here</p>
            <p className="mt-1 text-sm text-gray-500">or click to browse · PDF or DOCX up to 10 MB</p>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function ResumeIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
      <svg
        className="h-7 w-7 text-slate-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </div>
  );
}
