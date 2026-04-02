/** Shared password rules for signup and password change (Supabase Auth). */

export const MIN_PASSWORD_LENGTH: number = 8;

export function isPasswordLongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
