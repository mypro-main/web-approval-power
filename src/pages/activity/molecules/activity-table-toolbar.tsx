import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IActivityTableFilters } from '../../../types/activity';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  filters: IActivityTableFilters;
  onFilters: (key: string, value: Date) => void;
};

export default function ActivityTableToolbar({ filters, onFilters }: Props) {
  const popover = usePopover();

  const handleFilterStartDate = useCallback((date: Date | null) => {
    if (date) onFilters('startDate', date);
  }, []);

  const handleFilterEndDate = useCallback((date: Date | null) => {
    if (date) onFilters('endDate', date);
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <DatePicker
            label="Start Date"
            value={filters.startDate}
            onChange={handleFilterStartDate}
            sx={{ width: 1 }}
          />
          <DatePicker
            label="End Date"
            value={filters.endDate}
            onChange={handleFilterEndDate}
            sx={{ width: 1 }}
          />
          {/*<TextField*/}
          {/*  fullWidth*/}
          {/*  value={filters.name}*/}
          {/*  onChange={handleFilterName}*/}
          {/*  placeholder="Search by name..."*/}
          {/*  InputProps={{*/}
          {/*    startAdornment: (*/}
          {/*      <InputAdornment position="start">*/}
          {/*        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />*/}
          {/*      </InputAdornment>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
