import { ChangeEvent, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IApprovalTableFilters } from '../../../../types/approval';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../../components/label';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  filters: IApprovalTableFilters;
  onFilters: (key: string, value: string) => void;
};

export default function ApprovalTableToolbar({ filters, onFilters }: Props) {
  const popover = usePopover();

  const handleFilterRequestStatus = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('requestOwnerStatus', event.target.value);
    },
    [onFilters]
  );

  const handleFilterKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onFilters('keyword', event.target.value);
    },
    [onFilters]
  );

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
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 150 },
          }}
        >
          <InputLabel>Status Approval</InputLabel>
          <Select
            label="requestOwnerStatus"
            value={filters.requestOwnerStatus}
            onChange={handleFilterRequestStatus}
            variant="outlined"
          >
            {['requested', 'verified', 'approved', 'rejected'].map((key) => (
              <MenuItem key={key} value={key} sx={{ textAlign: 'center' }}>
                <Label
                  variant="soft"
                  color={
                    (key === 'requested' && 'warning') ||
                    (key === 'verified' && 'info') ||
                    (key === 'approved' && 'success') ||
                    (key === 'rejected' && 'error') ||
                    'default'
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {capitalize(key)}
                </Label>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={filters.keyword}
          onChange={handleFilterKeyword}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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
