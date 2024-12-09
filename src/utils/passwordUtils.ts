import zxcvbn from 'zxcvbn';

export const generatePassword = (
  length: number,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string => {
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  let chars = '';
  if (options.uppercase) chars += charSets.uppercase;
  if (options.lowercase) chars += charSets.lowercase;
  if (options.numbers) chars += charSets.numbers;
  if (options.symbols) chars += charSets.symbols;

  if (!chars) chars = charSets.lowercase + charSets.uppercase;

  let password = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    password += chars[randomValues[i] % chars.length];
  }

  return password;
};

export const calculatePasswordStrength = (password: string) => {
  const result = zxcvbn(password);
  return {
    score: result.score,
    feedback: result.feedback,
    crackTimesDisplay: result.crack_times_display
  };
};

export const getStrengthColor = (score: number): string => {
  const colors = {
    0: 'text-red-500 dark:text-red-400',
    1: 'text-orange-500 dark:text-orange-400',
    2: 'text-yellow-500 dark:text-yellow-400',
    3: 'text-blue-500 dark:text-blue-400',
    4: 'text-green-500 dark:text-green-400'
  };
  return colors[score as keyof typeof colors];
};