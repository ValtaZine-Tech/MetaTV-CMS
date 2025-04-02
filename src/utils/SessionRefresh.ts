// Create src/utils/sessionRefresh.ts
import { UserService } from "../services/userService";
import { UserSessionUtils } from "./UserSessionUtils";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const setupSessionRefresh = () => {
  const refreshSession = async () => {
    if (!UserSessionUtils.isAuthenticated()) return;
    
    try {
      const service = new UserService();
      const user = await service.getAuthenticatedUser();
      UserSessionUtils.setUserDetails(user);
    } catch (error) {
      console.error("Session refresh failed:", error);
      UserSessionUtils.logout();
    }
  };

  // Initial refresh
  refreshSession();
  
  // Periodic refresh
  const interval = setInterval(refreshSession, REFRESH_INTERVAL);
  return () => clearInterval(interval);
};