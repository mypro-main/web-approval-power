import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../components/iconify';
import { TerritoryQuickEditForm } from './territory-quick-edit-form';
import { useBoolean } from '../../../hooks/use-boolean';
import Label from '../../../components/label';
import { ITerritoryItem } from '../../../types/territory';
import CustomPopover, { usePopover } from '../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import { ConfirmDialog } from '../../../components/custom-dialog';
import { Button } from '@mui/material';
import { useCallback } from 'react';

type Props = {
  selected: boolean;
  row: ITerritoryItem;
};

export default function TerritoryTableRow({ row, selected }: Props) {
  const { id, name, description, Region, status } = row;

  const popover = usePopover();
  const quickEdit = useBoolean();
  const confirm = useBoolean();

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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(Region.name)}</TableCell>
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
        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
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

      <TerritoryQuickEditForm
        currentTerritory={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

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
