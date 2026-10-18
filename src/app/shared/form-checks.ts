const DEMO_DISPOSABLE_DOMAINS = new Set([
  'yopmail.com',
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com',
  'trashmail.com',
]);

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Frontend sample only. Not a complete disposable-email list. */
export function disposableDemoMessage(email: string): string {
  const domain = email.trim().toLowerCase().split('@')[1] ?? '';
  if (!DEMO_DISPOSABLE_DOMAINS.has(domain)) {
    return '';
  }
  return `${domain} is on a short example list in this preview, including addresses such as yopmail.com. This is not a complete disposable-email check. Server-side validation will be added later.`;
}

export function passwordIssue(value: string): string {
  if (!value) {
    return 'Enter a password.';
  }
  if (value.length < 8 || !/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return 'Use at least 8 characters, including a letter and a number.';
  }
  return '';
}

export function passwordStrength(value: string): { label: string; level: number } {
  if (!value) {
    return { label: 'Not set', level: 0 };
  }
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  const level = Math.min(4, Math.max(1, score - 1));
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  return { label: labels[level - 1] ?? 'Weak', level };
}
