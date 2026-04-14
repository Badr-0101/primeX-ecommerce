import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { usePasswordStrength } from '../hooks/usePasswordStrength';
import StrengthMeter from './StrengthMeter';

const PasswordForm = ({ onClose }: { onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { score, label, color } = usePasswordStrength(newPassword);

  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!currentPassword || !newPassword || !confirmPassword || passwordsMismatch) return;

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  // Measure content height for smooth animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [showSuccess, submitted, newPassword, confirmPassword, currentPassword]);

  const inputBaseClass =
    'bg-[#0a0e0a] border text-white text-sm font-sans px-4 py-2.5 w-full rounded-none outline-none transition-colors placeholder:text-[#4a5a4a]';
  const inputNormalBorder = 'border-[#1f2a1f] focus:border-[#CBFF47] focus:border-opacity-60';
  const inputErrorBorder = 'border-red-700 focus:border-red-500';

  return (
    <div className="overflow-hidden">
      <div ref={contentRef}>
        {showSuccess ? (
          <div className="px-6 py-4">
            <div className="bg-[#CBFF47]/10 border border-[#CBFF47]/30 px-6 py-4 rounded-none">
              <span className="font-mono uppercase tracking-widest text-[10px] text-[#CBFF47]">
                ✓&nbsp;&nbsp;PASSWORD UPDATED — YOU WILL REMAIN LOGGED IN ON THIS DEVICE
              </span>
            </div>
          </div>
        ) : (
          <div className="px-8 py-6 flex flex-col gap-5">
            {/* Current Password */}
            <div>
              <label className="font-mono uppercase tracking-widest text-[10px] text-[#4a5a4a] block mb-2">
                CURRENT PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`${inputBaseClass} pr-10 ${
                    submitted && !currentPassword ? inputErrorBorder : inputNormalBorder
                  }`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  {showCurrent ? (
                    <EyeOff size={16} className="text-[#4a5a4a]" />
                  ) : (
                    <Eye size={16} className={currentPassword ? 'text-[#CBFF47]' : 'text-[#4a5a4a]'} />
                  )}
                </button>
              </div>
              {submitted && !currentPassword && (
                <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-1.5">
                  FIELD REQUIRED
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="font-mono uppercase tracking-widest text-[10px] text-[#4a5a4a] block mb-2">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`${inputBaseClass} pr-10 ${
                    submitted && !newPassword ? inputErrorBorder : inputNormalBorder
                  }`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff size={16} className="text-[#4a5a4a]" />
                  ) : (
                    <Eye size={16} className={newPassword ? 'text-[#CBFF47]' : 'text-[#4a5a4a]'} />
                  )}
                </button>
              </div>
              {newPassword && <StrengthMeter score={score} label={label} color={color} />}
              {submitted && !newPassword && (
                <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-1.5">
                  FIELD REQUIRED
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="font-mono uppercase tracking-widest text-[10px] text-[#4a5a4a] block mb-2">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputBaseClass} pr-10 ${
                    (submitted && !confirmPassword) || passwordsMismatch
                      ? inputErrorBorder
                      : inputNormalBorder
                  }`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff size={16} className="text-[#4a5a4a]" />
                  ) : (
                    <Eye size={16} className={confirmPassword ? 'text-[#CBFF47]' : 'text-[#4a5a4a]'} />
                  )}
                </button>
              </div>
              {passwordsMismatch && (
                <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-1.5">
                  PASSWORDS DO NOT MATCH
                </p>
              )}
              {submitted && !confirmPassword && !passwordsMismatch && (
                <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-1.5">
                  FIELD REQUIRED
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="bg-transparent border border-[#2a3a2a] text-white uppercase tracking-widest text-xs font-mono px-5 py-2 hover:border-[#CBFF47] hover:text-[#CBFF47] transition-colors cursor-pointer rounded-none"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#CBFF47] text-black uppercase tracking-widest text-xs font-mono font-bold px-6 py-2 hover:bg-[#d4ff6a] transition-colors cursor-pointer rounded-none"
              >
                UPDATE PASSWORD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
