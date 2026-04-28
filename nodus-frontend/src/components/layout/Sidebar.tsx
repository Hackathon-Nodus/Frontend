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
    <aside className="w-64 bg-surface-white border-r border-outline-subtle p-6 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-display font-semibold text-content-charcoal">{title}</h2>
        {subtitle && <p className="text-xs text-content-slate mt-1">{subtitle}</p>}
      </div>

      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-nodus text-sm transition-colors ${
              activeItem === item.id
                ? 'bg-indigo-50 text-indigo-electric font-medium'
                : 'text-content-slate hover:bg-surface-gray'
            }`}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.count !== undefined && (
              <span className="text-xs text-content-slate">{item.count}</span>
            )}
          </button>
        ))}
      </nav>

      {statusTitle && statusItems && statusItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-content-slate uppercase tracking-wider mb-3">
            {statusTitle}
          </h3>
          <nav className="space-y-1">
            {statusItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-nodus text-sm transition-colors ${
                  activeItem === item.id
                    ? 'bg-indigo-50 text-indigo-electric font-medium'
                    : 'text-content-slate hover:bg-surface-gray'
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
}
