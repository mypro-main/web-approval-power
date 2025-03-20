import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../../components/iconify';
import { ApprovalQuickApproveForm } from './approval-quick-approve-form';
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
  const { identityCardNumber, name, phoneNumber, outletId, outlet, status, requestOwnerStatus } =
    row;

  const popover = usePopover();

  const quickApprove = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{outletId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{outlet?.name ?? '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber || '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name ? capitalize(name) : '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{identityCardNumber || '-'}</TableCell>
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>*/}
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateISOString(birthDate)}</TableCell>*/}
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>{outlet.territory.name}</TableCell>*/}
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>MOCK</TableCell>*/}
        <TableCell sx={{ textAlign: 'center' }}>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status || '-'}
          </Label>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          <Label
            variant="soft"
            color={
              (requestOwnerStatus === 'requested' && 'warning') ||
              (requestOwnerStatus === 'verified' && 'info') ||
              (requestOwnerStatus === 'approved' && 'success') ||
              (requestOwnerStatus === 'rejected' && 'error') ||
              'default'
            }
          >
            {requestOwnerStatus || '-'}
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

      <ApprovalQuickApproveForm
        currentItem={row}
        open={quickApprove.value}
        onClose={quickApprove.onFalse}
      />
    </>
  );
}
