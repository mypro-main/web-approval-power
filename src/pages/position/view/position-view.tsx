import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Container from '@mui/material/Container';
import { useSettingsContext } from '../../../components/settings';

export function PositionView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Position"
        links={[{ name: 'Authentication' }, { name: 'Position' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
    </Container>
  );
}
