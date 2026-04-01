export function withAuthGuard(isAuthenticated, navigateToLogin) {
  if (!isAuthenticated) {
    navigateToLogin();
    return false;
  }
  return true;
}
