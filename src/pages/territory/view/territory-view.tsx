import { Button, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { RouterLink } from '../../../components/router-link';
import { paths } from '../../paths';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
import CardHeader from '@mui/material/CardHeader';

export function TerritoryView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Territory"
        links={[{ name: 'Master' }, { name: 'Territory' }]}
        action={
          <Stack direction="row" gap={1}>
            <Button
              component={RouterLink}
              href={paths.territory.root}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Button
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <CardContent>
          <CardHeader title="Territory" />
        </CardContent>
      </Card>
    </Container>
  );
}
