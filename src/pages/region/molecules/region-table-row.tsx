import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Iconify from '../../../components/iconify';
import { RegionQuickEditForm } from './region-quick-edit-form';
import { useBoolean } from '../../../hooks/use-boolean';
import Label from '../../../components/label';
import { IRegionItem } from '../../../types/region';

type Props = {
  selected: boolean;
  row: IRegionItem;
};

export default function RegionTableRow({ row, selected }: Props) {
  const { id, name, description, status } = row;

  const quickEdit = useBoolean();

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

      <RegionQuickEditForm currentRegion={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}
