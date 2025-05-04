import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN, IDAMAN } from 'src/config-global';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Button, Typography } from '@mui/material';
import { LogoBlueWhite } from 'src/components/logo/logo-dynamic';
import Oidc from 'oidc-client';
import { isValidToken, jwtDecode } from 'src/auth/context/jwt/utils';
import { LoadingScreen } from 'src/components/loading-screen';

export default function IdamanLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const config = {
    authority: IDAMAN.viteIdamanAuthority,
    client_id: IDAMAN.viteIdamanClientId,
    client_secret: IDAMAN.viteIdamanClientSecret,
    redirect_uri: IDAMAN.viteIdamanRedirectUri,
    response_type: 'code',
    // scope: 'openid profile api.auth user.read user.readAll',
    scope:
      'api.auth user.read user.readAll user.role  position.readAll unit.readAll position.read unit.read',
    // post_logout_redirect_uri: IDAMAN.viteIdamanPostLogoutRedirectUrl,
  };

  const mgr = new Oidc.UserManager(config);

  const authorizationCode = searchParams.get('code');

  const handleIdamanLogin = async (data: { email: string; idp: string }) => {
    try {
      console.log('idaman data', data);
      await login?.(data.email, data.idp);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      // reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  useEffect(() => {
    if (authorizationCode) {
      mgr
        .signinRedirectCallback()
        .then((user) => {
          console.log('user', user);
          console.log('code', authorizationCode);
          if (user && user.access_token) {
            if (isValidToken(user.access_token)) {
              handleIdamanLogin(jwtDecode(user.access_token));
            } else {
              setErrorMsg('Failed to obtain access token due invalid token');
            }
            // setAccessToken(user.access_token);
            // Optionally, you can store the access token securely or use it for API requests.
          } else {
            setErrorMsg('Failed to obtain access token due no access token');
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
          setErrorMsg('Failed to obtain access token');
        });
    }
  }, [authorizationCode, handleIdamanLogin]);

  const idamanLogin = () => {
    mgr.signinRedirect();
  };

  return authorizationCode ? (
    <LoadingScreen />
  ) : (
    <Stack spacing={2.5}>
      {errorMsg && (
        <Typography variant="h3" sx={{ mb: 2 }}>
          {errorMsg}
        </Typography>
      )}
      <Button
        size="large"
        color="info"
        variant="outlined"
        startIcon={<LogoBlueWhite />}
        onClick={async () => idamanLogin()}
      >
        Login with IdaMan
      </Button>
    </Stack>
  );
}
