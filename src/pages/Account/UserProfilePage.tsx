import { useRef } from 'react';
import PageHeader from '../../components/UserProfile/components/PageHeader';
import EditableProfilePanel from '../../components/UserProfile/components/EditableProfilePanel';
import SecurityPanel from '../../components/UserProfile/components/SecurityPanel';
import SessionsPanel from '../../components/UserProfile/components/SessionsPanel';

const UserProfilePage = () => {
  const securityRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const scrollToSecurity = () => {
    securityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToProfile = () => {
    profileRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (

      <div className="min-h-screen bg-[#000000] flex-1" >
        <div className="px-6 sm:px-10 lg:px-16 py-10 lg:py-12 max-w-[1100px] mx-auto">
          {/* Page Header */}
          <PageHeader onEditProfile={scrollToProfile} onSecurity={scrollToSecurity} />

          {/* Sections */}
          <div className="flex flex-col gap-6 mt-10">
            {/* Section 2: Identity / Editable Profile */}
            <div ref={profileRef}>
              <EditableProfilePanel />
            </div>

            {/* Section 3: Security */}
            <div ref={securityRef}>
              <SecurityPanel />
            </div>

            {/* Section 4: Sessions */}
            <SessionsPanel />
          </div>
        </div>
      </div>
  );
};

export default UserProfilePage;
