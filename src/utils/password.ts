const CHARS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export const generatePassword = (
  length: number = 16,
  options = {
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  }
): string => {
  let chars = '';
  if (options.lowercase) chars += CHARS.lowercase;
  if (options.uppercase) chars += CHARS.uppercase;
  if (options.numbers) chars += CHARS.numbers;
  if (options.symbols) chars += CHARS.symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};