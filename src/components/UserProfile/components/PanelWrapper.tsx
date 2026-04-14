import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PanelWrapperProps {
  label: string;
  children: ReactNode;
  headerRight?: ReactNode;
}

const PanelWrapper = ({ label, children, headerRight }: PanelWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-[#0f140f] border border-[#1f2a1f] rounded-none"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-[#1a221a]">
        <span className="font-mono uppercase tracking-[0.25em] text-xs text-[#4a5a4a]">
          {label}
        </span>
        {headerRight && <div className="flex items-center gap-3">{headerRight}</div>}
      </div>

      {/* Panel body */}
      <div>{children}</div>
    </motion.div>
  );
};

export default PanelWrapper;
