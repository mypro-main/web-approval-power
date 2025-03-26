import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../components/iconify';
import { RoleQuickEditForm } from './role-quick-edit-form';
import { useBoolean } from '../../../hooks/use-boolean';
import { Button } from '@mui/material';
import { ConfirmDialog } from '../../../components/custom-dialog';
import { useCallback } from 'react';
import CustomPopover, { usePopover } from '../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import { IRoleItem } from '../../../types/role';
import Label from '../../../components/label';
import Stack from '@mui/material/Stack';

type Props = {
  selected: boolean;
  row: IRoleItem;
};

export default function RoleTableRow({ row, selected }: Props) {
  const { id, name, status } = row;

  const popover = usePopover();

  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const onDeleteRow = useCallback(() => {
    console.log('deleted');
  }, []);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(id)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(name)}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') || (status === 'inactive' && 'error') || 'default'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Stack alignItems="center" justifyContent="center">
              <Iconify icon="eva:more-vertical-fill" />
            </Stack>
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify sx={{ color: 'error' }} icon="solar:trash-bin-minimalistic-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <RoleQuickEditForm currentItem={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
