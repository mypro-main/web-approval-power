import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Container from '@mui/material/Container';
import { useSettingsContext } from '../../../components/settings';
import Grid from '@mui/material/Unstable_Grid2';
import NotificationItem from '../../../layouts/_common/notifications-popover/notification-item';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import { useGetNotificationSummary } from '../../../services/notification/hooks/use-get-notification-summary';
import { useAuthContext } from '../../../auth/hooks';
import Typography from '@mui/material/Typography';
import { LoadingScreen } from '../../../components/loading-screen';
import View500 from '../../error/500';

export function NotificationView() {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const { notification, isFetching, error } = useGetNotificationSummary();

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!notification || error) {
    return <View500 />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Notification Center"
        links={[{ name: 'App' }, { name: 'Notification' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={3}>
        <Grid xs={12}>
          {!notification.highlight.requested.length && !notification.highlight.verified.length ? (
            <Stack justifyContent="center" alignItems="center" sx={{ p: 2 }}>
              <Typography color="text.disabled">No new notification</Typography>
            </Stack>
          ) : (
            <List disablePadding>
              {user?.role === 'SAM' &&
                notification.highlight.requested.map((notif, index) => (
                  <NotificationItem key={index} notification={notif} />
                ))}
              {user?.role === 'ADMIN_CENTRAL' &&
                notification.highlight.verified.map((notif, index) => (
                  <NotificationItem key={index} notification={notif} />
                ))}
              {user?.role === 'SUPER_ADMIN' &&
                notification.highlight.requested
                  .concat(notification.highlight.verified)
                  .map((notif, index) => <NotificationItem key={index} notification={notif} />)}
            </List>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
