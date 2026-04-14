import { motion } from 'framer-motion';

interface PageHeaderProps {
  onEditProfile: () => void;
  onSecurity: () => void;
}

const PageHeader = ({ onEditProfile, onSecurity }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
    >
      <div>
        <p className="  tracking-ultra  font-bold   text-accent-dim mb-3">
          إعدادات الحساب
        </p>
        <h1 className="font-black  text-5xl lg:text-6xl text-white leading-none">
          معلومات الحساب
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onEditProfile}
          className="bg-transparent border border-border-hover text-white  tracking-ultra text-xs font-mono px-5 py-2 hover:border-accent hover:text-accent transition-colors cursor-pointer rounded-none"
        >
          تعديل الملف الشخصي
        </button>
        <button
          onClick={onSecurity}
          className="bg-transparent border border-border-hover text-white  tracking-ultra text-xs font-mono px-5 py-2 hover:border-accent hover:text-accent transition-colors cursor-pointer rounded-none"
        >
          الأمان  
        </button>
      </div>
    </motion.div>
  );
};

export default PageHeader;
