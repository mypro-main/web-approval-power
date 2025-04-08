import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Container from '@mui/material/Container';
import { useSettingsContext } from '../../../components/settings';
import Grid from '@mui/material/Unstable_Grid2';
import NotificationItem from '../../../layouts/_common/notifications-popover/notification-item';
import List from '@mui/material/List';
import { useState } from 'react';
import { _notifications } from '../../../_mock';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import Iconify from '../../../components/iconify';

export function NotificationView() {
  const settings = useSettingsContext();

  const [notifications, setNotifications] = useState(_notifications);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Notification Center"
        links={[{ name: 'App' }, { name: 'Notification' }]}
        action={
          <Stack direction="row" gap={1}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:check-read-line-duotone" />}
              onClick={() => console.log('readall')}
            >
              Read All
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid container spacing={3}>
        <Grid xs={12}>
          <List disablePadding>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
