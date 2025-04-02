import { useEffect, useState } from "react";
import { User } from "../utils/user-session-types"; // Use the updated type
import { UserSessionUtils } from "../utils/UserSessionUtils";

export const useUserSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        // Wait for auth state to initialize
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (!UserSessionUtils.isAuthenticated()) {
          setUser(null);
          setLoading(false);
          return;
        }

        const storedUser = UserSessionUtils.getUserDetails();
        if (storedUser) {
          setUser(storedUser);
          setLoading(false);
          return;
        }

        // If no stored user but authenticated, fetch fresh data
        const response = await fetch("/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${UserSessionUtils.getBearerToken()}`
          }
        });
        
        if (!response.ok) throw new Error("Session expired");
        
        const userData = await response.json();
        UserSessionUtils.setUserDetails(userData);
        setUser(userData);
      } catch (error) {
        UserSessionUtils.logout();
        console.log('UserSessionError', error);
        
      } finally {
        setLoading(false);
      }
    };

    loadUserSession();
  }, []);

  const updateUser = (newUserDetails: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...newUserDetails };
      UserSessionUtils.setUserDetails(updatedUser);
      return updatedUser;
    });
  };

  return { user, loading, updateUser };
};