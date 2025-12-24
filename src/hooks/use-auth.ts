import * as React from 'react';
import { AuthContext, IAuthContext } from '@contexts';

export function useAuth(): IAuthContext {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
