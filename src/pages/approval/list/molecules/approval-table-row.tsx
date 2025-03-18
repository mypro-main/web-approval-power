import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';
import { ApprovalQuickEditForm } from './approval-quick-edit-form';
import { useBoolean } from '../../../../hooks/use-boolean';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import Label from '../../../../components/label';
import { IApprovalItem } from '../../../../types/approval';

type Props = {
  selected: boolean;
  row: IApprovalItem;
  onViewRow: VoidFunction;
};

export default function ApprovalTableRow({ row, selected, onViewRow }: Props) {
  const { id, name, status } = row;

  const popover = usePopover();

  const quickApprove = useBoolean();

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
            quickApprove.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="mingcute:check-2-fill" />
          Approval
        </MenuItem>

        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="mingcute:eye-2-fill" />
          View
        </MenuItem>
      </CustomPopover>

      <ApprovalQuickEditForm
        currentItem={row}
        open={quickApprove.value}
        onClose={quickApprove.onFalse}
      />
    </>
  );
}
