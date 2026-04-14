import type { ReactNode } from 'react';

interface FieldRowProps {
  label: string;
  value: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  isLast?: boolean;
}

const FieldRow = ({ label, value, badge, action, isLast = false }: FieldRowProps) => {
  return (
    <div
      className={`flex items-center justify-between px-6 py-4 ${
        !isLast ? 'border-b border-[#1a221a]' : ''
      } hover:bg-[#151a15] transition-colors`}
    >
      <div className="flex items-center gap-6 min-w-0">
        <span className="font-mono uppercase tracking-widest text-xs text-[#4a5a4a] w-32 shrink-0">
          {label}
        </span>
        <span className="text-sm text-white font-sans truncate">{value}</span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {badge}
        {action}
      </div>
    </div>
  );
};

export default FieldRow;
