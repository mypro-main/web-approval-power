import { m } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { Helmet } from 'react-helmet-async';
import { MotionContainer, varBounce } from 'src/components/animate';
import Stack from '@mui/material/Stack';
import Oidc from 'oidc-client';
import { Button } from '@mui/material';
import { IDAMAN_CONFIG } from '../../config-global';

export default function View403() {
  const mgr = new Oidc.UserManager(IDAMAN_CONFIG);

  const handleLogout = async () => {
    try {
      await mgr.signoutRedirect();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      sx={{
        mx: 'auto',
        maxWidth: 400,
        minHeight: '80vh',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Helmet>
        <title>403 No Permission!</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Please contact the admin to set the role
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <m.div variants={varBounce().in}>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </m.div>
      </MotionContainer>
    </Stack>
  );
}
