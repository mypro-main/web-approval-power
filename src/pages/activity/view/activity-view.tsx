import { CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import CardHeader from '@mui/material/CardHeader';
import { ActivityTimeline } from '../molecules/activity-timeline';
import Grid from '@mui/material/Unstable_Grid2';
import { _analyticOrderTimeline } from '../../../_mock';

export function ActivityView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Activity"
        links={[{ name: 'Log' }, { name: 'Activity' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <CardContent>
          <CardHeader title="Approval Activity" />
          <CardContent>
            <Grid xs={12} md={6} lg={4}>
              <ActivityTimeline title="Approval Activity" list={_analyticOrderTimeline} />
            </Grid>
          </CardContent>
        </CardContent>
      </Card>
    </Container>
  );
}
