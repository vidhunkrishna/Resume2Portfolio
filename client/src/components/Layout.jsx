import { Link, useLocation } from 'react-router-dom';
import Logo from './common/Logo.jsx';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="container-app flex h-14 max-w-4xl items-center justify-between">
          <Link to="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <nav className="flex items-center gap-3">
            {isHome ? (
              <>
                <a href="#features" className="hidden text-sm text-gray-600 hover:text-gray-900 sm:inline">
                  Features
                </a>
                <a href="#upload" className="btn-primary py-2 text-xs sm:text-sm">
                  Upload resume
                </a>
              </>
            ) : (
              <Link to="/" className="btn-secondary py-2 text-xs sm:text-sm">
                New Upload
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden">{children}</main>

      {!isHome && (
        <footer className="border-t border-gray-200 bg-white py-4">
          <div className="container-app max-w-4xl text-center text-sm text-gray-500">
            Portfolio Generator · MERN Stack Project
          </div>
        </footer>
      )}
    </div>
  );
}
