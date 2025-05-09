import { LoadingScreen } from '../../../components/loading-screen';
import { useRouter } from '../../../hooks/use-router';
import { useAuthContext } from '../../../auth/hooks';
import { useCallback, useEffect, useState } from 'react';

export function IdamanIdle() {
  const router = useRouter();

  const { user } = useAuthContext();

  const check = useCallback(() => {
    if (user) {
      router.replace('/');
    } else {
    }
  }, [user]);

  useEffect(() => {
    check();
  }, [user]);

  return <LoadingScreen sx={{ minHeight: '100vh' }} />;
}
