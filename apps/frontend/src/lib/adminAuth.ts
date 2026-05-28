// =====================================================
// ADMIN AUTH - Standalone, does NOT modify any other files
// =====================================================

export const ADMIN_CREDENTIALS = {
  email: 'admin@collegehunt.in',
  password: 'CollegeHunt@Admin2026',
};

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ch_admin_auth') === 'true';
}

export function adminLogin(email: string, password: string): boolean {
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem('ch_admin_auth', 'true');
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem('ch_admin_auth');
}
