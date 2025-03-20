import { useCallback, useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetAllRegion } from '../../../services/region/hooks/use-get-all-region';
import FormProvider from '../../../components/hook-form';
import { ITerritoryTableFilters } from '../../../types/territory';
import { FilterTerritoryListSchema } from '../schemas';

type Props = {
  filters: ITerritoryTableFilters;
  onFilters: (key: string, value: string) => void;
};

export default function TerritoryTableToolbar({ filters, onFilters }: Props) {
  const popover = usePopover();

  const { regions } = useGetAllRegion();

  const defaultValues: ITerritoryTableFilters = useMemo(
    () => ({
      id: '',
      name: '',
      status: '',
      regionIds: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FilterTerritoryListSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterRegion = useCallback(
    (event: SelectChangeEvent<string>) => {
      onFilters('regionIds', event.target.value);
    },
    [onFilters]
  );

  useEffect(() => {
    if (!filters.regionIds) {
      reset();
    }
  }, [filters]);

  return (
    <>
      <FormProvider methods={methods}>
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
              width: { xs: 1, md: 200 },
            }}
          >
            <InputLabel>Region</InputLabel>
            <Select
              label="Region"
              value={filters.regionIds}
              onChange={handleFilterRegion}
              variant="outlined"
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id} sx={{ textTransform: 'capitalize' }}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search by name..."
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
        </Stack>
      </FormProvider>

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
