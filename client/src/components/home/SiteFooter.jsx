export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <div className="container-app max-w-4xl text-center text-sm text-gray-500">
        <p className="font-medium text-gray-700">Portfolio Generator</p>
        <p className="mt-1">MERN stack · React · Express · MongoDB</p>
        <p className="mt-2 text-xs text-gray-400">
          © {new Date().getFullYear()} Portfolio Generator
        </p>
      </div>
    </footer>
  );
}
