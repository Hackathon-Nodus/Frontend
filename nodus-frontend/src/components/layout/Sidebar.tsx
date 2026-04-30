interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface SidebarProps {
  title: string;
  subtitle?: string;
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  statusTitle?: string;
  statusItems?: SidebarItem[];
}

export function Sidebar({ title, subtitle, items, activeItem, onItemClick, statusTitle, statusItems }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-6 fixed left-0 top-16 bottom-0 overflow-y-auto transition-colors duration-200">
      <div className="mb-6">
        <h2 className="text-lg font-display font-semibold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>

      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeItem === item.id
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
            }`}
          >
            {item.icon && (
              <span className={`${activeItem === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500'}`}>
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-left">{item.label}</span>
            {item.count !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-500">{item.count}</span>
            )}
          </button>
        ))}
      </nav>

      {statusTitle && statusItems && statusItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {statusTitle}
          </h3>
          <nav className="space-y-1">
            {statusItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeItem === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                }`}
              >
                {item.icon && (
                  <span className={`${activeItem === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500'}`}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
}
