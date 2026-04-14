import { useState } from 'react';
import PanelWrapper from './PanelWrapper';

interface Session {
  id: string;
  location: string;
  device: string;
  isCurrent: boolean;
  lastActive: string;
}

const sessionsData: Session[] = [
  {
    id: '1',
    location: 'Cairo, EG',
    device: 'Chrome on Windows',
    isCurrent: true,
    lastActive: 'NOW',
  },
  {
    id: '2',
    location: 'Cairo, EG',
    device: 'Mobile Safari',
    isCurrent: false,
    lastActive: '2 hours ago',
  },
];

const SessionsPanel = () => {
  const [sessions, setSessions] = useState<Session[]>(sessionsData);

  const handleRevoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSignOutAll = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
  };

  return (
    <PanelWrapper label="SESSIONS">
      {sessions.map((session, index) => {
        const isLast = index === sessions.length - 1;
        return (
          <div
            key={session.id}
            className={`flex items-center justify-between px-6 py-4 ${
              !isLast ? 'border-b border-[#1a221a]' : ''
            } hover:bg-[#151a15] transition-colors`}
          >
            <div className="flex items-center gap-3">
              {/* Status dot */}
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  session.isCurrent ? 'bg-[#CBFF47]' : 'bg-[#6b7a6b]'
                }`}
              />
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white font-sans">
                    {session.location} — {session.device}
                  </span>
                  {session.isCurrent && (
                    <span className="border border-[#CBFF47]/40 text-[#CBFF47] bg-[#CBFF47]/5 uppercase tracking-widest text-[10px] font-mono px-3 py-0.5 rounded-none">
                      THIS DEVICE
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#6b7a6b] font-mono">{session.lastActive}</span>
              {!session.isCurrent && (
                <button
                  onClick={() => handleRevoke(session.id)}
                  className="font-mono uppercase text-[10px] tracking-widest text-[#CBFF47] bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                >
                  REVOKE
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Sign out all footer */}
      {sessions.filter((s) => !s.isCurrent).length > 0 && (
        <div className="px-6 py-4 border-t border-[#1a221a]">
          <button
            onClick={handleSignOutAll}
            className="border border-red-800/50 text-red-500 hover:border-red-500 uppercase tracking-widest text-xs font-mono px-5 py-2 transition-colors cursor-pointer bg-transparent rounded-none"
          >
            SIGN OUT ALL OTHER DEVICES
          </button>
        </div>
      )}
    </PanelWrapper>
  );
};

export default SessionsPanel;
