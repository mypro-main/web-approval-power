import { m } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import NotificationItem from './notification-item';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/components/router-link';
import { paths } from '../../../pages/paths';
import { useGetNotificationSummary } from '../../../services/notification/hooks/use-get-notification-summary';
import { useAuthContext } from '../../../auth/hooks';

export default function NotificationsPopover() {
  const { user } = useAuthContext();

  const { notification, isFetching, error } = useGetNotificationSummary();

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const defaultActiveTab = user?.role === 'ADMIN_CENTRAL' ? 'verified' : 'requested';

  const [currentTab, setCurrentTab] = useState(defaultActiveTab);

  const TABS = useMemo(
    () => [
      {
        value: 'requested',
        label: 'Requested',
        count: notification?.summary.requested,
      },
      {
        value: 'verified',
        label: 'Verified',
        count: notification?.summary.verified,
      },
    ],
    [notification]
  );

  if (isFetching) {
    return null;
  }

  if (!notification || error) {
    return null;
  }

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {/*{!!totalUnRead && (*/}
      {/*  <Tooltip title="Mark all as read">*/}
      {/*    <IconButton color="primary" onClick={handleMarkAllAsRead}>*/}
      {/*      <Iconify icon="eva:done-all-fill" />*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*)}*/}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => {
        if (user?.role === 'SAM' && tab.value === 'verified') {
          return null;
        }

        if (user?.role === 'ADMIN_CENTRAL' && tab.value === 'requested') {
          return null;
        }

        return (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
                color={
                  (tab.value === 'requested' && 'warning') ||
                  (tab.value === 'verified' && 'info') ||
                  'default'
                }
              >
                {tab.count && tab.count > 10 ? '10+' : tab.count}
              </Label>
            }
            sx={{
              '&:not(:last-of-type)': {
                mr: 3,
              },
            }}
          />
        );
      })}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {currentTab === 'requested' &&
          notification.highlight.requested.map((notif, index) => (
            <NotificationItem key={index} notification={notif} />
          ))}
        {currentTab === 'verified' &&
          notification.highlight.verified.map((notif, index) => (
            <NotificationItem key={index} notification={notif} />
          ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge
          badgeContent={
            user?.role === 'ADMIN_CENTRAL'
              ? notification.summary.verified > 10
                ? '10+'
                : notification.summary.verified
              : notification.summary.requested > 10
                ? '10+'
                : notification.summary.requested
          }
          color="error"
        >
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
        </Stack>

        <Divider />

        {renderList}

        <Box sx={{ p: 1 }}>
          <Button component={RouterLink} href={paths.notification.root} fullWidth size="large">
            View All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
