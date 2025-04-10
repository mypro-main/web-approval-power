import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from 'src/utils/format-time';
import { SxProps, Theme } from '@mui/material/styles';
import RouterLink from '../../../components/router-link/router-link';
import { paths } from '../../../pages/paths';
import { IHighlightItem } from '../../../types/notification';
import Typography from '@mui/material/Typography';

type NotificationItemProps = {
  sx?: SxProps<Theme>;
  notification: IHighlightItem;
};

export default function NotificationItem({ notification, sx }: NotificationItemProps) {
  const renderAvatar = (
    <ListItemAvatar>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        <Box
          component="img"
          src={`/assets/icons/notification/ic_mail.svg`}
          sx={{ width: 24, height: 24 }}
        />
      </Stack>
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={
        <Stack>
          <Typography variant="body2">
            <Box component="span" fontWeight="bold">
              {notification.name}
            </Box>{' '}
            needs your approval.
          </Typography>
        </Stack>
      }
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fToNow(notification.updatedAt)}
          Approval
        </Stack>
      }
    />
  );

  const renderUnReadBadge = (
    <Box
      sx={{
        top: 15,
        left: 15,
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      component={RouterLink}
      href={paths.approval.details(notification.id)}
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
    >
      {renderUnReadBadge}

      {renderAvatar}

      <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
    </ListItemButton>
  );
}

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
