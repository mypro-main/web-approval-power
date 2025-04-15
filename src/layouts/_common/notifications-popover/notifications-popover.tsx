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
import { CircularProgress } from '@mui/material';
import { useAuthContext } from '../../../auth/hooks';

type CurrentTab = 'requested' | 'verified' | 'approved' | 'rejected' | 'reconfirm';

export default function NotificationsPopover() {
  const { user } = useAuthContext();

  const { notification, isFetching, error } = useGetNotificationSummary();

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: CurrentTab) => {
    setCurrentTab(newValue);
  }, []);

  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');

  const defaultActiveTab = 'requested';

  const [currentTab, setCurrentTab] = useState<CurrentTab>(defaultActiveTab);

  const TABS = useMemo(
    () => [
      {
        value: 'requested',
        label: 'Requested',
        count: notification?.highlight.requested.total,
      },
      {
        value: 'verified',
        label: 'Verified',
        count: notification?.highlight.verified.total,
      },
      {
        value: 'approved',
        label: 'Approved',
        count: notification?.highlight.approved.total,
      },
      {
        value: 'rejected',
        label: 'Rejected',
        count: notification?.highlight.rejected.total,
      },
      {
        value: 'reconfirm',
        label: 'Reconfirm',
        count: notification?.highlight.reconfirm.total,
      },
    ],
    [notification]
  );

  const handleCloseNotification = useCallback(() => {
    drawer.onFalse();
  }, []);

  if (isFetching) {
    return (
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color="default"
      >
        <Badge
          badgeContent={<CircularProgress size={8} sx={{ color: 'common.white' }} />}
          color="error"
        >
          <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
        </Badge>
      </IconButton>
    );
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
        if (!checkNotificationPermission(user?.role, tab.value)) {
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
                  (tab.value === 'approved' && 'success') ||
                  (tab.value === 'rejected' && 'error') ||
                  (tab.value === 'reconfirm' && 'secondary') ||
                  'default'
                }
              >
                {tab.count}
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
      {!notification.highlight[currentTab].data.length ? (
        <Stack justifyContent="center" alignItems="center" sx={{ p: 2 }}>
          <Typography color="text.disabled">No new notification</Typography>
        </Stack>
      ) : (
        <List disablePadding>
          {notification.highlight[currentTab].data.map((notif, index) => (
            <NotificationItem
              key={index}
              notification={notif}
              onCloseNotification={handleCloseNotification}
            />
          ))}
        </List>
      )}
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
        <Badge badgeContent={notification.highlight[currentTab].total} color="error">
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

export const checkNotificationPermission = (role: string, ownerStatus: string) => {
  if (!role) return false;

  if (role === 'SAM') {
    return ownerStatus === 'requested' || ownerStatus === 'reconfirm';
  }

  return true;
};
