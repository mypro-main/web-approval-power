import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// assets
import { SeverErrorIllustration } from 'src/assets/illustrations';
// components
import { Helmet } from 'react-helmet-async';
import { MotionContainer, varBounce } from 'src/components/animate';
import { RouterLink } from 'src/components/router-link';

// ----------------------------------------------------------------------

export default function View500() {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error!</title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            500 Internal Server Error
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
