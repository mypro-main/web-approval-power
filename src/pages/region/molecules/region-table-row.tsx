import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../components/iconify';
import { RegionQuickEditForm } from './region-quick-edit-form';
import { useBoolean } from '../../../hooks/use-boolean';
import Label from '../../../components/label';
import { IRegionItem } from '../../../types/region';
import { Button } from '@mui/material';
import { ConfirmDialog } from '../../../components/custom-dialog';
import { useCallback } from 'react';
import CustomPopover, { usePopover } from '../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  selected: boolean;
  row: IRegionItem;
};

export default function RegionTableRow({ row, selected }: Props) {
  const { id, name, description, status } = row;

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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {description ? capitalize(description) : '-'}
        </TableCell>
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
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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

      <RegionQuickEditForm currentRegion={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

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
