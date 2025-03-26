import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import UserQuickEditForm from './user-quick-edit-form';
import { IUserItem } from '../../../types/user';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../components/label';

type Props = {
  row: IUserItem;
  selected: boolean;
};

export default function UserTableRow({ row, selected }: Props) {
  const { name, email, role, status, jobTitle } = row;

  const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{jobTitle ? capitalize(jobTitle) : '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>
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
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Tooltip title="Quick Edit" placement="top" arrow>
              <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={quickEdit.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}
