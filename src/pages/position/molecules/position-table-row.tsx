import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Label from '../../../components/label';
import { IPositionItem } from '../../../types/position';
import Iconify from '../../../components/iconify';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from '../../../hooks/use-boolean';
import UserQuickEditForm from '../../user/molecules/user-quick-edit-form';
import PositionQuickAssignForm from './position-quick-assign-form';

type Props = {
  selected: boolean;
  row: IPositionItem;
};

export default function PositionTableRow({ row, selected }: Props) {
  const { id, name, roles, status } = row;

  const quickAssign = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(id)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(name)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{roles.length ? roles.join(', ') : '-'}</TableCell>
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
          <IconButton onClick={() => quickAssign.onTrue()}>
            <Iconify icon="fa:user-plus" />
          </IconButton>
        </TableCell>
      </TableRow>

      <PositionQuickAssignForm
        currentPosition={row}
        open={quickAssign.value}
        onClose={quickAssign.onFalse}
      />
    </>
  );
}
