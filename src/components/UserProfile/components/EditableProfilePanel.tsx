import { useState } from 'react';
import PanelWrapper from './PanelWrapper';
import FieldRow from './FieldRow';

interface ProfileField {
  key: string;
  label: string;
  value: string;
  badge?: string;
  editable?: boolean;
}

const initialFields: ProfileField[] = [
  { key: 'firstName', label: 'الاسم الاول', value: 'احمد', editable: true },
  { key: 'lastName', label: 'الاسم الاخير', value: 'كريم', editable: true },
  { key: 'email', label: 'البريد الالكتروني', value: 'ahmed.karim@email.com', badge: 'VERIFIED', editable: true },
  { key: 'phone', label: 'رقم الهاتف', value: '+20 100 000 0000', editable: true },
  { key: 'role', label: 'الدور', value: 'عضو', editable: false },
  { key: 'memberSince', label: 'تاريخ الانضمام', value: 'يناير 2023', editable: false },
];

const EditableProfilePanel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>(
    Object.fromEntries(initialFields.map((f) => [f.key, f.value]))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSave = () => {
    setSubmitted(true);
    const hasEmpty = initialFields
      .filter((f) => f.editable)
      .some((f) => !formValues[f.key]?.trim());
    if (hasEmpty) return;

    setIsEditing(false);
    setSubmitted(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSubmitted(false);
    setFormValues(Object.fromEntries(initialFields.map((f) => [f.key, f.value])));
  };

  const headerRight = isEditing ? (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCancel}
        className="bg-transparent border border-[#2a3a2a] text-white uppercase tracking-widest text-xs font-mono px-5 py-2 hover:border-[#CBFF47] hover:text-[#CBFF47] transition-colors cursor-pointer rounded-none"
      >
        الغاء
      </button>
      <button
        onClick={handleSave}
        className="bg-[#CBFF47] text-black uppercase tracking-widest text-xs font-mono font-bold px-6 py-2 hover:bg-[#d4ff6a] transition-colors cursor-pointer rounded-none"
      >
        حفظ التعديلات
      </button>
    </div>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className="font-mono uppercase tracking-widest text-xs text-[#CBFF47] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
    >
      تعديل
    </button>
  );

  return (
    <PanelWrapper label="هوية المستخدم  " headerRight={headerRight}>
      {initialFields.map((field, index) => {
        const isLast = index === initialFields.length - 1;
        const isEmpty = submitted && field.editable && !formValues[field.key]?.trim();

        if (isEditing && field.editable) {
          return (
            <div
              key={field.key}
              className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 ${
                !isLast ? 'border-b border-[#1a221a]' : ''
              } hover:bg-[#151a15] transition-colors`}
            >
              <span className="font-mono uppercase tracking-widest text-xs text-[#4a5a4a] w-32 shrink-0">
                {field.label}
              </span>
              <div className="flex-1">
                <input
                  type="text"
                  value={formValues[field.key]}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className={`bg-[#0a0e0a] border text-white text-sm font-sans px-4 py-2.5 w-full rounded-none outline-none transition-colors placeholder:text-[#4a5a4a] ${
                    isEmpty
                      ? 'border-red-700 focus:border-red-500'
                      : 'border-[#1f2a1f] focus:border-[#CBFF47] focus:border-opacity-60'
                  }`}
                />
                {isEmpty && (
                  <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest mt-1.5">
                    FIELD REQUIRED
                  </p>
                )}
              </div>
            </div>
          );
        }

        return (
          <FieldRow
            key={field.key}
            label={field.label}
            value={
              field.key === 'email' ? (
                <span className="font-mono text-[#CBFF47] text-sm">{field.value}</span>
              ) : (
                field.value
              )
            }
            badge={
              field.badge ? (
                <span className="border border-[#CBFF47]/40 text-[#CBFF47] bg-[#CBFF47]/5 uppercase tracking-widest text-[10px] font-mono px-3 py-1 rounded-none">
                  {field.badge}
                </span>
              ) : undefined
            }
            isLast={isLast}
          />
        );
      })}
    </PanelWrapper>
  );
};

export default EditableProfilePanel;
