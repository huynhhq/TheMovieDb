import { ACCOUNT_ID } from '@helpers/config';
import { createContext, useEffect, useState } from 'react';
import { useGetAccountDetailsQuery } from '@services/account-service';

export interface IAuthContext {
  user?: User;
  isLoading?: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider(
  props: React.PropsWithChildren,
): React.JSX.Element {
  const [user, setUser] = useState<User | undefined>();

  const { isLoading, data } = useGetAccountDetailsQuery(ACCOUNT_ID, {
    skip: !ACCOUNT_ID,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
