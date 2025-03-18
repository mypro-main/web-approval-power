import capitalize from '@mui/utils/capitalize';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IActivityItem } from '../../../types/activity';
import { fDate } from '../../../utils/format-time';

type Props = {
  selected: boolean;
  row: IActivityItem;
};

export default function ActivityTableRow({ row, selected }: Props) {
  const { id, name, date } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(id)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(date)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalize(name)}</TableCell>
    </TableRow>
  );
}
