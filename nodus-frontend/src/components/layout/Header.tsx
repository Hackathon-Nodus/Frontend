import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="bg-surface-white border-b border-outline-subtle fixed top-0 left-0 right-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-content-charcoal" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span className="text-xl font-display font-bold text-content-charcoal">Nodus</span>
          </div>

          <nav className="flex gap-6">
            <a href="#" className="text-content-slate hover:text-content-charcoal text-sm">Browse</a>
            <a href="#" className="text-content-slate hover:text-content-charcoal text-sm">Post Problems</a>
          </nav>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search problems..."
              className="w-96 pl-10 pr-4 py-2 border border-outline-subtle rounded-nodus text-sm focus:outline-none focus:ring-2 focus:ring-indigo-electric"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-content-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-content-charcoal hover:text-content-slate">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <Avatar src="" alt="User" size="sm" fallback="U" />
        </div>
      </div>
    </header>
  );
}
