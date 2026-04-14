interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export function usePasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map: Record<number, { label: string; color: string }> = {
    0: { label: '', color: '' },
    1: { label: 'WEAK', color: '#ef4444' },
    2: { label: 'FAIR', color: '#f97316' },
    3: { label: 'GOOD', color: '#3b82f6' },
    4: { label: 'STRONG', color: '#CBFF47' },
  };

  const entry = map[score] ?? map[0];

  return {
    score,
    label: entry.label,
    color: entry.color,
  };
}
