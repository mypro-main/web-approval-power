import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import UserQuickEditForm from './user-quick-edit-form';
import { IUserItem } from '../../../types/user';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../components/label';
import CustomPopover, { usePopover } from '../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import UserQuickChangePasswordForm from './user-quick-change-password';

type Props = {
  row: IUserItem;
  selected: boolean;
};

export default function UserTableRow({ row, selected }: Props) {
  const { name, email, role, status, Position } = row;

  const popover = usePopover();

  const quickEditInformation = useBoolean();
  const quickChangePassword = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {Position ? capitalize(Position.name) : '-'}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{Position.role || '-'}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 200 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            quickEditInformation.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit Information
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            quickChangePassword.onTrue();
          }}
        >
          <Iconify icon="mingcute:key-2-fill" />
          Change Password
        </MenuItem>
      </CustomPopover>

      <UserQuickEditForm
        currentUser={row}
        open={quickEditInformation.value}
        onClose={quickEditInformation.onFalse}
      />

      <UserQuickChangePasswordForm
        currentUser={row}
        open={quickChangePassword.value}
        onClose={quickChangePassword.onFalse}
      />
    </>
  );
}
