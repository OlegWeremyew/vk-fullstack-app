import { useAuth } from '@/hooks/use-auth';
import React, { FC } from 'react';

export const Auth: FC<any> = () => {
  const { user } = useAuth();

  return <div>Auth</div>;
};
