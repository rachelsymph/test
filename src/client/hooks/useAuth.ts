import { useEffect, useState } from 'react';

import { getCurrentUser } from 'src/client/api/UserApi';
import { User } from 'src/commons/types/User.type';

export default function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error) {
        setError(new Error(error.message));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    error,
    isLoading,
    user,
  };
}
