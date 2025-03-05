import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import capitalize from '@mui/utils/capitalize';
import { useMemo } from 'react';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import Label from '../../../components/label';
import { EditTerritorySchema } from '../schemas';
import { RHFAutocompleteAsyncOnSearch } from '../../../components/hook-form/rhf-autocomplete';
import { RegionService } from '../../../services/region/region-service';
import { ITerritoryItem, ITerritoryStatus } from '../../../types/territory';

type Props = {
  open: boolean;
  onClose: () => void;
  currentTerritory?: ITerritoryItem;
};

export function TerritoryQuickEditForm({ currentTerritory, open, onClose }: Props) {
  const regionService = new RegionService();

  const getRegion = (keyword?: string) => regionService.getAll({ name: keyword });

  const territoryStatus = Object.values(ITerritoryStatus);

  const defaultValues = useMemo(
    () => ({
      name: currentTerritory?.name || '',
      description: currentTerritory?.description || '',
      regionId: currentTerritory?.Region.id || '',
      status: currentTerritory?.status || ('inactive' as ITerritoryStatus),
    }),
    [currentTerritory]
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(EditTerritorySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (currentTerritory) {
      const { id } = currentTerritory;
      const payload = {
        name: data.name,
        description: data.description,
        status: data.status,
        regionId: data.regionId,
      };

      console.log(id, payload);

      // await mutateTerritory({ id, payload });
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Update Territory</DialogTitle>

        <DialogContent>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="status" label="Status" required>
                {territoryStatus.map((key, index) => (
                  <MenuItem key={index} value={key}>
                    <Label
                      variant="soft"
                      color={
                        (key === 'active' && 'success') ||
                        (key === 'inactive' && 'error') ||
                        'default'
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      {capitalize(key)}
                    </Label>
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={6}>
              <RHFAutocompleteAsyncOnSearch
                initialValue={currentTerritory?.Region.name}
                name="regionId"
                label="Region"
                asyncFn={getRegion}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="description" label="Description" />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
