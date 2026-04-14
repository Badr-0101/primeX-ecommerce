import { useState } from 'react';
import PanelWrapper from './PanelWrapper';
import PasswordForm from './PasswordForm';

const SecurityPanel = () => {
  const [isPwFormOpen, setIsPwFormOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <PanelWrapper label="SECURITY">
      {/* Password Row */}
      <div className="px-6 py-4 border-b border-[#1a221a]">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-mono uppercase tracking-widest text-xs text-[#4a5a4a]">
                PASSWORD
              </span>
              <span className="text-sm text-[#6b7a6b]">••••••••••</span>
            </div>
            <p className="font-mono text-xs text-[#6b7a6b] mt-1">
              Last changed 3 months ago
            </p>
          </div>
          <button
            onClick={() => setIsPwFormOpen(!isPwFormOpen)}
            className="bg-transparent border border-[#2a3a2a] text-white uppercase tracking-widest text-xs font-mono px-5 py-2 hover:border-[#CBFF47] hover:text-[#CBFF47] transition-colors cursor-pointer rounded-none"
          >
            {isPwFormOpen ? 'CLOSE' : 'CHANGE PASSWORD'}
          </button>
        </div>
      </div>

      {/* Expandable Password Form */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isPwFormOpen ? '600px' : '0px',
          opacity: isPwFormOpen ? 1 : 0,
        }}
      >
        {isPwFormOpen && (
          <div className="border-b border-[#1a221a]">
            <PasswordForm onClose={() => setIsPwFormOpen(false)} />
          </div>
        )}
      </div>

      {/* 2FA Row */}
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <span className="font-mono uppercase tracking-widest text-xs text-[#4a5a4a] block">
            TWO-FACTOR AUTHENTICATION
          </span>
          <p className="text-xs text-[#6b7a6b] mt-1">
            Protect your account with an authenticator app
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Custom Toggle */}
          <button
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
            className={`relative w-12 h-6 rounded-none transition-colors duration-300 cursor-pointer border ${
              is2FAEnabled
                ? 'bg-[#CBFF47]/20 border-[#CBFF47]/50'
                : 'bg-[#1a221a] border-[#2a3a2a]'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-none transition-all duration-300 ${
                is2FAEnabled
                  ? 'left-[calc(100%-1.25rem)] bg-[#CBFF47]'
                  : 'left-1 bg-[#6b7a6b]'
              }`}
            />
          </button>
          <span
            className={`font-mono uppercase text-[10px] tracking-widest ${
              is2FAEnabled ? 'text-[#CBFF47]' : 'text-[#6b7a6b]'
            }`}
          >
            {is2FAEnabled ? '2FA IS ACTIVE' : '2FA IS OFF'}
          </span>
        </div>
      </div>
    </PanelWrapper>
  );
};

export default SecurityPanel;
