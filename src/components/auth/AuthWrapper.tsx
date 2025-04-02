import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSessionUtils } from '../../utils/UserSessionUtils';
import { LoadingSpinner } from '../LoadingSpinner';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = UserSessionUtils.getBearerToken();
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      // Optionally, validate the token (e.g., decode or verify with the server)
      const isValid = await validateToken(token);
      if (!isValid) {
        UserSessionUtils.clearLocalStorageAndLogout();
        navigate('/login', { replace: true });
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) return <LoadingSpinner />;

  return <>{children}</>;
};

// Example function to validate the token (replace with your implementation)
const validateToken = async (token: string): Promise<boolean> => {
  try {
    // Example: Send a request to the server to validate the token
    const response = await fetch('/api/auth/validate-token', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};